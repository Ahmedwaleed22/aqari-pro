import React, { useState, useEffect } from 'react';
import { Calculator, Percent, Calendar, Banknote, Wallet } from 'lucide-react';
import { InputGroup } from './ui/InputGroup';
import { ResultBox } from './ui/ResultBox';
import { CalculationResultMode2, formatNumber, parseNumber } from '../types';

export const BulletCalculator: React.FC = () => {
  const [totalPrice, setTotalPrice] = useState<string>('');
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>('');
  const [years, setYears] = useState<string>('');
  const [desiredMonthly, setDesiredMonthly] = useState<string>('');
  const [result, setResult] = useState<CalculationResultMode2 | null>(null);

  // Helper to handle formatting on change
  const handleFormattedChange = (setter: (val: string) => void) => (val: string) => {
    const cleanVal = val.replace(/[^0-9.]/g, '');
    setter(formatNumber(cleanVal));
  };

  useEffect(() => {
    const price = parseNumber(totalPrice);
    const percent = parseFloat(downPaymentPercent);
    const duration = parseFloat(years);
    const monthlyPayment = parseNumber(desiredMonthly);

    if (price && percent && duration && duration > 0 && monthlyPayment) {
      const downPaymentAmount = price * (percent / 100);
      const principalToPay = price - downPaymentAmount;
      
      const totalPaidViaMonthly = monthlyPayment * 12 * duration;
      const remainingDeficit = principalToPay - totalPaidViaMonthly;
      
      // If deficit is positive, we need bullets. If negative, monthly is too high.
      const annualBullet = remainingDeficit > 0 ? remainingDeficit / duration : 0;

      setResult({
        downPaymentAmount,
        totalFromMonthly: totalPaidViaMonthly,
        remainingDeficit: remainingDeficit > 0 ? remainingDeficit : 0,
        annualBullet
      });
    } else {
      setResult(null);
    }
  }, [totalPrice, downPaymentPercent, years, desiredMonthly]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputGroup
          id="total_price_2"
          label="إجمالي سعر الوحدة"
          value={totalPrice}
          onChange={handleFormattedChange(setTotalPrice)}
          icon={Banknote}
          placeholder="مثال: 1,000,000"
          suffix="ج.م"
        />
        <InputGroup
          id="dp_percent_2"
          label="نسبة المقدم"
          value={downPaymentPercent}
          onChange={setDownPaymentPercent}
          icon={Percent}
          placeholder="مثال: 10"
          type="number"
        />
        <InputGroup
          id="years_2"
          label="عدد السنوات"
          value={years}
          onChange={setYears}
          icon={Calendar}
          placeholder="مثال: 5"
          type="number"
        />
        <InputGroup
          id="monthly_payment"
          label="القسط الشهري المطلوب"
          value={desiredMonthly}
          onChange={handleFormattedChange(setDesiredMonthly)}
          icon={Wallet}
          placeholder="كم تريد أن تدفع شهرياً؟"
          suffix="ج.م"
        />
      </div>

      {result && (
        <div className="space-y-4 pt-4">
             <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                هيكل الدفع المقترح
            </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ResultBox 
                label="قيمة المقدم" 
                value={result.downPaymentAmount} 
                subtext={`(${downPaymentPercent}%)`}
            />
            <ResultBox 
                label="إجمالي المدفوع بالأقساط" 
                value={result.totalFromMonthly} 
                subtext="على مدار المدة"
            />
          </div>

           <div className="relative py-2">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-50 px-3 text-base font-semibold text-slate-600">الدفعة السنوية المطلوبة</span>
            </div>
          </div>

          {result.remainingDeficit > 0 ? (
            <div className="grid grid-cols-1">
              <ResultBox 
                label="الدفعة السنوية (كل سنة)" 
                value={result.annualBullet} 
                isPrimary={true}
                subtext="تدفع مرة واحدة في نهاية كل سنة لتغطية الفرق"
              />
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
                <p className="text-green-800 font-medium">القسط الشهري المقترح يغطي ثمن الوحدة بالكامل!</p>
                <p className="text-green-600 text-sm mt-1">لا حاجة لدفعات سنوية.</p>
            </div>
          )}
        </div>
      )}

      {!result && (
         <div className="text-center py-12 text-slate-400 bg-white/50 rounded-2xl border border-dashed border-slate-200">
            <Calculator className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>أدخل البيانات لحساب الدفعات السنوية</p>
         </div>
      )}
    </div>
  );
};