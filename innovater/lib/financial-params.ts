// Dummy financial parameters — calibrated industry benchmarks for demo mode
// These simulate what a finance team member would input from Glanbia actuals
// Clearly labelled as demo parameters throughout the UI

export interface FinancialParameters {
  label: string
  description: string
  grossMarginTarget: number       // % gross margin target
  cogsBreakdown: {
    rawMaterials: number          // % of COGS
    packaging: number
    manufacturing: number
    freight: number
    other: number
  }
  tradeSpend: number              // % of gross revenue
  marketingInvestment: number     // % of net revenue (launch year)
  overheadAllocation: number      // % of net revenue
  slotting: number                // one-time cost per SKU per retailer ($000s)
  minViableRevenue: number        // $000s — min to justify continued investment
}

export interface FormatCOGS {
  format: 'Powder' | 'RTD' | 'Bar' | 'Capsule' | 'Gummy'
  cogsPerUnit: {
    budget: number
    mid: number
    premium: number
    superPremium: number
  }
  typicalRetailPrice: {
    budget: number
    mid: number
    premium: number
    superPremium: number
  }
  unitsPerCase: number
  moq: number // minimum order quantity (cases)
}

// Format-level COGS benchmarks by price tier
export const formatCOGS: FormatCOGS[] = [
  {
    format: 'Powder',
    cogsPerUnit: { budget: 8.50, mid: 14.20, premium: 21.80, superPremium: 32.40 },
    typicalRetailPrice: { budget: 24.99, mid: 49.99, premium: 74.99, superPremium: 99.99 },
    unitsPerCase: 6,
    moq: 500,
  },
  {
    format: 'RTD',
    cogsPerUnit: { budget: 1.20, mid: 2.10, premium: 3.40, superPremium: 5.20 },
    typicalRetailPrice: { budget: 2.99, mid: 4.99, premium: 6.99, superPremium: 9.99 },
    unitsPerCase: 12,
    moq: 2000,
  },
  {
    format: 'Bar',
    cogsPerUnit: { budget: 0.85, mid: 1.40, premium: 2.20, superPremium: 3.40 },
    typicalRetailPrice: { budget: 1.99, mid: 2.99, premium: 3.99, superPremium: 5.49 },
    unitsPerCase: 12,
    moq: 5000,
  },
  {
    format: 'Capsule',
    cogsPerUnit: { budget: 6.20, mid: 11.40, premium: 18.60, superPremium: 28.80 },
    typicalRetailPrice: { budget: 19.99, mid: 34.99, premium: 54.99, superPremium: 79.99 },
    unitsPerCase: 12,
    moq: 1000,
  },
  {
    format: 'Gummy',
    cogsPerUnit: { budget: 4.80, mid: 8.60, premium: 14.20, superPremium: 22.40 },
    typicalRetailPrice: { budget: 14.99, mid: 24.99, premium: 39.99, superPremium: 59.99 },
    unitsPerCase: 12,
    moq: 2000,
  },
]

// Channel distribution cost benchmarks
export const channelCosts = {
  amazon: { referralFee: 0.15, fulfillmentCost: 0.12, advertisingSpend: 0.18 },
  mass: { tradeSpend: 0.22, slottingPerSku: 15000, coopAdvertising: 0.06 },
  food: { tradeSpend: 0.19, slottingPerSku: 8000, coopAdvertising: 0.05 },
  drug: { tradeSpend: 0.17, slottingPerSku: 6000, coopAdvertising: 0.04 },
  naturalSpins: { tradeSpend: 0.14, slottingPerSku: 2000, coopAdvertising: 0.03 },
  costco: { tradeSpend: 0.12, slottingPerSku: 0, coopAdvertising: 0.02 },
}

// Standard GPN-style financial parameters (demo)
export const financialParams: FinancialParameters = {
  label: 'GPN Standard — Demo Parameters',
  description: 'Calibrated industry benchmarks representing typical GPN P&L structure. For demo purposes only — replace with Glanbia actuals for production use.',
  grossMarginTarget: 42,
  cogsBreakdown: {
    rawMaterials: 48,
    packaging: 18,
    manufacturing: 22,
    freight: 8,
    other: 4,
  },
  tradeSpend: 20,
  marketingInvestment: 15,
  overheadAllocation: 8,
  slotting: 10,
  minViableRevenue: 3000,
}

// Launch investment benchmarks by scale
export const launchInvestment = {
  dtcOnly: { minUSD: 150000, maxUSD: 400000, label: 'DTC / Amazon launch' },
  specialty: { minUSD: 400000, maxUSD: 1200000, label: 'Specialty retail (SPINS channels)' },
  regional: { minUSD: 1200000, maxUSD: 3500000, label: 'Regional mass market' },
  national: { minUSD: 3500000, maxUSD: 12000000, label: 'National mass market' },
  global: { minUSD: 8000000, maxUSD: 30000000, label: 'Multi-market global launch' },
}
