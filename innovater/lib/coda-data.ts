// Dummy CODA category data — simulates a structured export from Nielsen IQ / SPINS / Amazon
// Shape matches what the I&A team would export from Tableau / CODA
// Replace with live CODA extract when Route 1 data access is confirmed

export interface CategorySegment {
  category: string
  segment: string
  subSegment: string
  annualRetailValueUSD: number // $000s
  annualVolumeUnits: number // 000s units
  yoyGrowthValue: number // %
  yoyGrowthVolume: number // %
  channels: {
    food: number // % share
    drug: number
    mass: number
    amazon: number
    costco: number
    naturalSpins: number
  }
  pricePerUnit: number // avg retail $
  topCompetitors: {
    brand: string
    shareOfSegment: number // %
    pricePosition: 'Budget' | 'Mid' | 'Premium' | 'Super Premium'
  }[]
  gpnBrands: {
    brand: string
    shareOfSegment: number // %
  }[]
  formatSplit: {
    powder: number
    rtd: number
    bar: number
    capsule: number
    gummy: number
    other: number
  }
  householdPenetration: number // % US HH buying category annually
  buyerRecruitmentIndex: number // 100 = avg; >100 = easier to recruit new buyers
  priceTierSplit: {
    budget: number // % of segment value
    mid: number
    premium: number
    superPremium: number
  }
}

export const codaData: CategorySegment[] = [
  {
    category: 'Sports Nutrition',
    segment: 'Protein Supplements',
    subSegment: 'Whey Protein Powder',
    annualRetailValueUSD: 2840000,
    annualVolumeUnits: 38200,
    yoyGrowthValue: 6.2,
    yoyGrowthVolume: 3.8,
    channels: { food: 12, drug: 8, mass: 31, amazon: 28, costco: 11, naturalSpins: 10 },
    pricePerUnit: 74.35,
    topCompetitors: [
      { brand: 'Optimum Nutrition', shareOfSegment: 22.4, pricePosition: 'Premium' },
      { brand: 'Dymatize', shareOfSegment: 9.1, pricePosition: 'Mid' },
      { brand: 'Muscle Milk', shareOfSegment: 7.8, pricePosition: 'Mid' },
      { brand: 'BSN', shareOfSegment: 6.3, pricePosition: 'Mid' },
      { brand: 'Myprotein', shareOfSegment: 5.9, pricePosition: 'Budget' },
    ],
    gpnBrands: [
      { brand: 'Optimum Nutrition', shareOfSegment: 22.4 },
      { brand: 'Isopure', shareOfSegment: 4.2 },
    ],
    formatSplit: { powder: 78, rtd: 0, bar: 0, capsule: 0, gummy: 0, other: 22 },
    householdPenetration: 8.4,
    buyerRecruitmentIndex: 94,
    priceTierSplit: { budget: 18, mid: 41, premium: 29, superPremium: 12 },
  },
  {
    category: 'Sports Nutrition',
    segment: 'Protein Supplements',
    subSegment: 'Whey Protein RTD',
    annualRetailValueUSD: 1120000,
    annualVolumeUnits: 124000,
    yoyGrowthValue: 14.7,
    yoyGrowthVolume: 11.2,
    channels: { food: 24, drug: 14, mass: 28, amazon: 18, costco: 9, naturalSpins: 7 },
    pricePerUnit: 9.03,
    topCompetitors: [
      { brand: 'Premier Protein', shareOfSegment: 31.2, pricePosition: 'Mid' },
      { brand: 'Fairlife Core Power', shareOfSegment: 18.4, pricePosition: 'Premium' },
      { brand: 'Muscle Milk', shareOfSegment: 12.1, pricePosition: 'Mid' },
      { brand: 'Pure Protein', shareOfSegment: 7.3, pricePosition: 'Budget' },
    ],
    gpnBrands: [
      { brand: 'Isopure', shareOfSegment: 3.1 },
    ],
    formatSplit: { powder: 0, rtd: 100, bar: 0, capsule: 0, gummy: 0, other: 0 },
    householdPenetration: 11.2,
    buyerRecruitmentIndex: 112,
    priceTierSplit: { budget: 14, mid: 52, premium: 28, superPremium: 6 },
  },
  {
    category: 'Sports Nutrition',
    segment: 'Recovery',
    subSegment: 'Post-Workout Recovery',
    annualRetailValueUSD: 620000,
    annualVolumeUnits: 8400,
    yoyGrowthValue: 18.3,
    yoyGrowthVolume: 14.1,
    channels: { food: 8, drug: 6, mass: 22, amazon: 38, costco: 6, naturalSpins: 20 },
    pricePerUnit: 73.81,
    topCompetitors: [
      { brand: 'Optimum Nutrition', shareOfSegment: 16.2, pricePosition: 'Premium' },
      { brand: 'Momentous', shareOfSegment: 11.4, pricePosition: 'Super Premium' },
      { brand: 'Thorne', shareOfSegment: 9.8, pricePosition: 'Super Premium' },
      { brand: 'Garden of Life Sport', shareOfSegment: 7.2, pricePosition: 'Premium' },
    ],
    gpnBrands: [
      { brand: 'Optimum Nutrition', shareOfSegment: 16.2 },
    ],
    formatSplit: { powder: 62, rtd: 8, bar: 0, capsule: 18, gummy: 4, other: 8 },
    householdPenetration: 3.8,
    buyerRecruitmentIndex: 86,
    priceTierSplit: { budget: 8, mid: 24, premium: 41, superPremium: 27 },
  },
  {
    category: 'Sports Nutrition',
    segment: 'Energy & Performance',
    subSegment: 'Pre-Workout',
    annualRetailValueUSD: 1840000,
    annualVolumeUnits: 22100,
    yoyGrowthValue: 11.4,
    yoyGrowthVolume: 8.7,
    channels: { food: 6, drug: 9, mass: 24, amazon: 34, costco: 4, naturalSpins: 23 },
    pricePerUnit: 83.26,
    topCompetitors: [
      { brand: 'C4 (Cellucor)', shareOfSegment: 28.1, pricePosition: 'Mid' },
      { brand: 'Ghost', shareOfSegment: 12.4, pricePosition: 'Premium' },
      { brand: 'Legion', shareOfSegment: 9.2, pricePosition: 'Premium' },
      { brand: 'Bucked Up', shareOfSegment: 7.8, pricePosition: 'Mid' },
    ],
    gpnBrands: [],
    formatSplit: { powder: 71, rtd: 12, bar: 0, capsule: 6, gummy: 2, other: 9 },
    householdPenetration: 5.6,
    buyerRecruitmentIndex: 103,
    priceTierSplit: { budget: 12, mid: 38, premium: 35, superPremium: 15 },
  },
  {
    category: 'Better-for-You Snacks',
    segment: 'Protein Bars',
    subSegment: 'High Protein Bar',
    annualRetailValueUSD: 3240000,
    annualVolumeUnits: 312000,
    yoyGrowthValue: 9.8,
    yoyGrowthVolume: 7.1,
    channels: { food: 28, drug: 16, mass: 24, amazon: 16, costco: 10, naturalSpins: 6 },
    pricePerUnit: 10.38,
    topCompetitors: [
      { brand: 'Quest', shareOfSegment: 24.8, pricePosition: 'Premium' },
      { brand: 'ONE Bar', shareOfSegment: 16.2, pricePosition: 'Mid' },
      { brand: 'RXBar', shareOfSegment: 12.4, pricePosition: 'Premium' },
      { brand: 'think!', shareOfSegment: 8.9, pricePosition: 'Mid' },
      { brand: 'Clif Builder', shareOfSegment: 7.3, pricePosition: 'Mid' },
    ],
    gpnBrands: [
      { brand: 'think!', shareOfSegment: 8.9 },
    ],
    formatSplit: { powder: 0, rtd: 0, bar: 100, capsule: 0, gummy: 0, other: 0 },
    householdPenetration: 18.4,
    buyerRecruitmentIndex: 128,
    priceTierSplit: { budget: 9, mid: 44, premium: 38, superPremium: 9 },
  },
  {
    category: 'Wellness & Supplements',
    segment: 'Cognitive Health',
    subSegment: 'Nootropics & Brain Health',
    annualRetailValueUSD: 480000,
    annualVolumeUnits: 5200,
    yoyGrowthValue: 31.2,
    yoyGrowthVolume: 24.8,
    channels: { food: 4, drug: 11, mass: 14, amazon: 44, costco: 2, naturalSpins: 25 },
    pricePerUnit: 92.31,
    topCompetitors: [
      { brand: 'Onnit Alpha Brain', shareOfSegment: 18.4, pricePosition: 'Super Premium' },
      { brand: 'Neuriva', shareOfSegment: 14.2, pricePosition: 'Premium' },
      { brand: 'Prevagen', shareOfSegment: 12.8, pricePosition: 'Premium' },
      { brand: 'Qualia Mind', shareOfSegment: 9.1, pricePosition: 'Super Premium' },
    ],
    gpnBrands: [],
    formatSplit: { powder: 18, rtd: 4, bar: 0, capsule: 54, gummy: 14, other: 10 },
    householdPenetration: 2.4,
    buyerRecruitmentIndex: 78,
    priceTierSplit: { budget: 6, mid: 19, premium: 38, superPremium: 37 },
  },
  {
    category: 'Wellness & Supplements',
    segment: 'Plant-Based Nutrition',
    subSegment: 'Plant Protein',
    annualRetailValueUSD: 920000,
    annualVolumeUnits: 11800,
    yoyGrowthValue: 7.4,
    yoyGrowthVolume: 4.2,
    channels: { food: 16, drug: 6, mass: 18, amazon: 24, costco: 4, naturalSpins: 32 },
    pricePerUnit: 77.97,
    topCompetitors: [
      { brand: 'Garden of Life', shareOfSegment: 22.1, pricePosition: 'Premium' },
      { brand: 'Vega', shareOfSegment: 18.4, pricePosition: 'Premium' },
      { brand: 'Orgain', shareOfSegment: 14.8, pricePosition: 'Mid' },
      { brand: 'Sunwarrior', shareOfSegment: 8.2, pricePosition: 'Super Premium' },
    ],
    gpnBrands: [
      { brand: 'Amazing Grass', shareOfSegment: 6.4 },
    ],
    formatSplit: { powder: 68, rtd: 14, bar: 6, capsule: 4, gummy: 2, other: 6 },
    householdPenetration: 4.8,
    buyerRecruitmentIndex: 91,
    priceTierSplit: { budget: 11, mid: 32, premium: 42, superPremium: 15 },
  },
]

// Helper: find best matching segment for a concept
export function findSegment(category: string, format: string, segment?: string): CategorySegment | undefined {
  const lower = (s: string) => s.toLowerCase()
  return codaData.find(d =>
    lower(d.category).includes(lower(category)) ||
    lower(d.segment).includes(lower(category)) ||
    lower(d.subSegment).includes(lower(category)) ||
    (segment && lower(d.segment).includes(lower(segment)))
  ) || codaData.find(d =>
    lower(d.formatSplit.powder > 50 ? 'powder' : d.formatSplit.rtd > 50 ? 'rtd' : 'bar').includes(lower(format))
  )
}
