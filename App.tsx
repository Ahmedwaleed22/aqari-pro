import React, { useState } from 'react';
import { CalculatorMode } from './types';
import { InstallmentCalculator } from './components/InstallmentCalculator';
import { BulletCalculator } from './components/BulletCalculator';
import { Calculator, CalendarRange, Building2 } from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState<CalculatorMode>(CalculatorMode.INSTALLMENTS);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 safe-area-top">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-blue-200 shadow-md">
                <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Aqari Pro</h1>
                <p className="text-xs text-slate-500 font-medium">حاسبة الاستثمار العقاري</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-3xl w-full mx-auto px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Tab Switcher */}
        <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 mb-6 flex">
          <button
            onClick={() => setMode(CalculatorMode.INSTALLMENTS)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
              mode === CalculatorMode.INSTALLMENTS
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Calculator className="w-4 h-4" />
            حساب الأقساط
          </button>
          <button
            onClick={() => setMode(CalculatorMode.BULLETS)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
              mode === CalculatorMode.BULLETS
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <CalendarRange className="w-4 h-4" />
            حساب الدفعات السنوية
          </button>
        </div>

        {/* Dynamic Content */}
        <div className="relative">
             {mode === CalculatorMode.INSTALLMENTS ? (
                <InstallmentCalculator />
             ) : (
                <BulletCalculator />
             )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-slate-200 bg-white safe-area-bottom mt-auto">
        <p className="text-sm font-bold text-slate-400">
           By Ahmed Zahran
        </p>
      </footer>
    </div>
  );
}