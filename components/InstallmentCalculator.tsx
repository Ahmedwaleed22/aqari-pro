import React, { useState, useEffect } from 'react';
import { Calculator, Percent, Calendar, Banknote } from 'lucide-react';
import { InputGroup } from './ui/InputGroup';
import { ResultBox } from './ui/ResultBox';
import { CalculationResultMode1, formatNumber, parseNumber } from '../types';

export const InstallmentCalculator: React.FC = () => {
  const [totalPrice, setTotalPrice] = useState<string>('');
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>('');
  const [years, setYears] = useState<string>('');
  const [result, setResult] = useState<CalculationResultMode1 | null>(null);

  // Handle formatted input for price
  const handlePriceChange = (val: string) => {
    // Allow digits and single dot
    const cleanVal = val.replace(/[^0-9.]/g, '');
    setTotalPrice(formatNumber(cleanVal));
  };

  useEffect(() => {
    const price = parseNumber(totalPrice);
    const percent = parseFloat(downPaymentPercent);
    const duration = parseFloat(years);

    if (price && percent && duration && duration > 0) {
      const downPaymentAmount = price * (percent / 100);
      const principalAmount = price - downPaymentAmount;
      
      const monthly = principalAmount / (duration * 12);
      const quarterly = principalAmount / (duration * 4);
      const semiAnnual = principalAmount / (duration * 2);

      setResult({
        downPaymentAmount,
        principalAmount,
        monthly,
        quarterly,
        semiAnnual,
      });
    } else {
      setResult(null);
    }
  }, [totalPrice, downPaymentPercent, years]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputGroup
          id="total_price"
          label="إجمالي سعر الوحدة"
          value={totalPrice}
          onChange={handlePriceChange}
          icon={Banknote}
          placeholder="مثال: 1,000,000"
          suffix="ج.م"
        />
        <InputGroup
          id="dp_percent"
          label="نسبة المقدم"
          value={downPaymentPercent}
          onChange={setDownPaymentPercent}
          icon={Percent}
          placeholder="مثال: 10"
          type="number"
        />
        <InputGroup
          id="years"
          label="عدد السنوات"
          value={years}
          onChange={setYears}
          icon={Calendar}
          placeholder="مثال: 5"
          type="number"
        />
      </div>

      {result && (
        <div className="space-y-5 pt-2">
          
          {/* Summary Section */}
          <div className="bg-slate-100/50 p-4 rounded-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-500 mb-3 flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                ملخص الحساب
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100">
                    <span className="text-sm text-slate-500">قيمة المقدم ({downPaymentPercent}%)</span>
                    <span className="text-lg font-bold text-slate-800">{formatNumber(result.downPaymentAmount)} ج.م</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100">
                    <span className="text-sm text-slate-500">المبلغ المتبقي للتقسيط</span>
                    <span className="text-lg font-bold text-slate-800">{formatNumber(result.principalAmount)} ج.م</span>
                </div>
            </div>
          </div>
          
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm font-bold text-blue-600 border border-blue-100 rounded-full py-1">أنظمة السداد المتاحة</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <ResultBox 
                label="القسط الشهري" 
                value={result.monthly} 
                isPrimary={true}
                subtext="قيمة القسط تدفع كل شهر"
            />
            <div className="grid grid-cols-2 gap-4">
              <ResultBox 
                  label="القسط الربع سنوي" 
                  value={result.quarterly} 
                  subtext="تدفع كل 3 شهور"
              />
               <ResultBox 
                  label="القسط النصف سنوي" 
                  value={result.semiAnnual} 
                  subtext="تدفع كل 6 شهور"
              />
            </div>
          </div>
        </div>
      )}
      
      {!result && (
         <div className="text-center py-12 text-slate-400 bg-white/50 rounded-2xl border border-dashed border-slate-200">
            <Calculator className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>أدخل السعر والمقدم والمدة لحساب الأقساط</p>
         </div>
      )}
    </div>
  );
};