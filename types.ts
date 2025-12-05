export interface CalculationResultMode1 {
  downPaymentAmount: number;
  principalAmount: number;
  monthly: number;
  quarterly: number;
  semiAnnual: number;
}

export interface CalculationResultMode2 {
  downPaymentAmount: number;
  totalFromMonthly: number;
  remainingDeficit: number;
  annualBullet: number;
}

export enum CalculatorMode {
  INSTALLMENTS = 'INSTALLMENTS', // Mode 1: Calculate installments based on total
  BULLETS = 'BULLETS' // Mode 2: Calculate annual bullets based on fixed monthly
}

// Utility to format numbers with commas (e.g. 1000000 -> 1,000,000)
export const formatNumber = (value: string | number): string => {
  if (value === '' || value === undefined || value === null) return '';
  const strVal = value.toString();
  // Remove existing commas to re-format cleanly
  const raw = strVal.replace(/,/g, '');
  const num = parseFloat(raw);
  if (isNaN(num)) return raw; // Return raw if not a number (e.g. typing a dot)
  
  // Split integer and decimal parts
  const parts = raw.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

// Utility to parse string with commas back to number (e.g. 1,000,000 -> 1000000)
export const parseNumber = (value: string): number => {
  if (!value) return 0;
  return parseFloat(value.replace(/,/g, ''));
};