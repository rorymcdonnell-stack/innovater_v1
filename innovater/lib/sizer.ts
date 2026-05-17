import Anthropic from '@anthropic-ai/sdk'
import { codaData, CategorySegment } from './coda-data'
import { formatCOGS, financialParams, launchInvestment, channelCosts } from './financial-params'

const client = new Anthropic()

export interface SizingInput {
  conceptName: string
  tagline?: string
  category: string
  segment: string
  format: 'Powder' | 'RTD' | 'Bar' | 'Capsule' | 'Gummy'
  priceTier: 'Budget' | 'Mid' | 'Premium' | 'Super Premium'
  targetConsumer: string
  distributionAmbition: 'DTC / Amazon' | 'Specialty Retail' | 'Regional Mass' | 'National Mass' | 'Global'
  geographies: string[]
  launchHorizon: '12 months' | '24 months' | '36 months'
  keyRTBs?: string[]
  scienceConfidenceScore?: number
  // Imported from ConceptR
  fromConceptR?: boolean
  conceptStrengthScore?: number
  strategicRationale?: string
}

export interface SizingOutput {
  tam: number           // $000s total addressable market
  sam: number           // $000s serviceable addressable market
  som: {
    conservative: number
    base: number
    optimistic: number
  }
  revenueProjections: {
    year1: { conservative: number; base: number; optimistic: number }
    year2: { conservative: number; base: number; optimistic: number }
    year3: { conservative: number; base: number; optimistic: number }
  }
  grossMargin: {
    conservative: number
    base: number
    optimistic: number
  }
  launchInvestmentRange: { min: number; max: number; label: string }
  paybackMonths: {
    conservative: number
    base: number
    optimistic: number
  }
  commercialConfidenceScore: number   // 0-100
  recommendation: 'Go' | 'Watch' | 'Hold'
  recommendationRationale: string
  keyOpportunities: string[]
  keyRisks: string[]
  competitivePosition: string
  whiteSpaceAssessment: string
  codaSegmentUsed: string
  methodologyNote: string
  gpnShareInSegment: number
  segmentGrowthRate: number
  categoryInsight: string
}

function findBestSegment(input: SizingInput): CategorySegment | undefined {
  const lower = (s: string) => s.toLowerCase()
  const terms = [input.category, input.segment].map(lower)

  // Direct match on category/segment
  let match = codaData.find(d =>
    terms.some(t =>
      lower(d.category).includes(t) ||
      lower(d.segment).includes(t) ||
      lower(d.subSegment).includes(t) ||
      t.includes(lower(d.segment))
    )
  )

  // Format-based fallback
  if (!match) {
    match = codaData.find(d => {
      const dominantFormat = Object.entries(d.formatSplit).sort((a, b) => b[1] - a[1])[0][0]
      return lower(dominantFormat) === lower(input.format)
    })
  }

  // Default to whey protein powder as the base reference
  return match || codaData[0]
}

function getFormatCOGS(format: string, tier: string) {
  const f = formatCOGS.find(f => f.format === format) || formatCOGS[0]
  const tierKey = tier.toLowerCase().replace(' ', '') as keyof typeof f.cogsPerUnit
  const safeKey = (tierKey === 'superpremium' ? 'superPremium' : tierKey) as keyof typeof f.cogsPerUnit
  return {
    cogs: f.cogsPerUnit[safeKey] || f.cogsPerUnit.mid,
    price: f.typicalRetailPrice[safeKey] || f.typicalRetailPrice.mid,
    unitsPerCase: f.unitsPerCase,
  }
}

function getLaunchInvestment(distribution: string) {
  const map: Record<string, keyof typeof launchInvestment> = {
    'DTC / Amazon': 'dtcOnly',
    'Specialty Retail': 'specialty',
    'Regional Mass': 'regional',
    'National Mass': 'national',
    'Global': 'global',
  }
  return launchInvestment[map[distribution] || 'specialty']
}

export async function generateSizing(input: SizingInput): Promise<SizingOutput> {
  const segment = findBestSegment(input)
  const formatData = getFormatCOGS(input.format, input.priceTier)
  const launch = getLaunchInvestment(input.distributionAmbition)

  const gpnShare = segment?.gpnBrands.reduce((sum, b) => sum + b.shareOfSegment, 0) || 0

  const systemPrompt = `You are SizeR, the commercial intelligence engine within InnovateR — Glanbia Performance Nutrition's AI-powered innovation platform.

Your role is to produce a rigorous, data-grounded commercial sizing analysis for new product concepts. You have access to real CODA category data (Nielsen IQ, SPINS, Amazon, Costco) and GPN financial benchmarks.

You must return ONLY valid JSON — no preamble, no markdown, no explanation. The JSON must exactly match the SizingOutput interface.

CODA segment data for this concept:
${segment ? JSON.stringify(segment, null, 2) : 'No exact match — use closest category reasoning'}

Format COGS benchmarks:
${JSON.stringify(getFormatCOGS(input.format, input.priceTier), null, 2)}

GPN Financial Parameters (demo):
- Gross margin target: ${financialParams.grossMarginTarget}%
- Trade spend: ${financialParams.tradeSpend}% of gross revenue
- Marketing investment (launch year): ${financialParams.marketingInvestment}% of net revenue
- Overhead allocation: ${financialParams.overheadAllocation}% of net revenue

Launch investment range for ${input.distributionAmbition}: $${launch.minUSD.toLocaleString()} - $${launch.maxUSD.toLocaleString()}

Sizing methodology:
1. TAM = Total category/segment retail value (from CODA) × geo adjustment
2. SAM = TAM × realistic channel reach for this distribution ambition
3. SOM = SAM × realistic share capture (conservative/base/optimistic) based on competitive intensity, GPN existing presence, and concept strength
4. Revenue projections = SOM achieved progressively over 3 years
5. Gross margin = retail price - COGS - trade spend
6. Payback = launch investment / annual gross profit

Scoring:
- Commercial confidence score (0-100): weight segment growth rate (25%), GPN existing presence (20%), competitive white space (20%), format/channel fit (15%), price tier opportunity (20%)
- Go (score 65+), Watch (40-64), Hold (<40)

Be rigorous but realistic. GPN is a large player — reflect realistic share capture, not aspirational. Flag genuine risks.`

  const userPrompt = `Generate a commercial sizing analysis for this concept:

Concept: ${input.conceptName}
${input.tagline ? `Tagline: ${input.tagline}` : ''}
Category: ${input.category}
Segment: ${input.segment}
Format: ${input.format}
Price Tier: ${input.priceTier}
Target Consumer: ${input.targetConsumer}
Distribution: ${input.distributionAmbition}
Geographies: ${input.geographies.join(', ')}
Launch Horizon: ${input.launchHorizon}
${input.keyRTBs ? `Key RTBs: ${input.keyRTBs.join(', ')}` : ''}
${input.scienceConfidenceScore ? `Science Confidence Score (from ConceptR): ${input.scienceConfidenceScore}/100` : ''}
${input.conceptStrengthScore ? `Concept Strength Score (from ConceptR): ${input.conceptStrengthScore}/100` : ''}
${input.strategicRationale ? `Strategic Rationale: ${input.strategicRationale}` : ''}

Return a complete SizingOutput JSON object. All financial values in $000s USD. Be specific and data-grounded.`

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    })

    const text = response.content
      .filter(b => b.type === 'text')
      .map(b => (b as { type: 'text'; text: string }).text)
      .join('')
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()

    const parsed = JSON.parse(text) as SizingOutput
    parsed.codaSegmentUsed = segment?.subSegment || 'General category estimate'
    parsed.gpnShareInSegment = gpnShare
    parsed.segmentGrowthRate = segment?.yoyGrowthValue || 8.0
    return parsed
  } catch (err) {
    console.error('SizeR generation error:', err)
    throw new Error('Failed to generate commercial sizing')
  }
}
