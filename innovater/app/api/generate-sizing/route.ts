import { NextRequest, NextResponse } from 'next/server'
import { generateSizing, SizingInput } from '../../../lib/sizer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Log what we received to help debug
    console.log('Sizing request body:', JSON.stringify(body))

    // Be tolerant — fill in defaults for any missing fields
    const input: SizingInput = {
      conceptName: body.conceptName || body.concept_name || 'Unknown Concept',
      tagline: body.tagline || '',
      category: body.category || 'Sports Nutrition',
      segment: body.segment || body.category || 'Protein Supplements',
      format: body.format || 'Powder',
      priceTier: body.priceTier || body.price_tier || 'Premium',
      targetConsumer: body.targetConsumer || body.target_consumer || '',
      distributionAmbition: body.distributionAmbition || 'Specialty Retail',
      geographies: body.geographies || ['United States'],
      launchHorizon: body.launchHorizon || '24 months',
      keyRTBs: body.keyRTBs || body.key_rtbs || [],
      scienceConfidenceScore: body.scienceConfidenceScore || body.science_confidence_score || undefined,
      fromConceptR: body.fromConceptR || false,
      conceptStrengthScore: body.conceptStrengthScore || undefined,
      strategicRationale: body.strategicRationale || body.strategic_rationale || '',
    }

    const result = await generateSizing(input)
    return NextResponse.json(result)
  } catch (err) {
    console.error('Sizing API error:', err)
    return NextResponse.json(
      { error: 'Failed to generate sizing analysis', detail: String(err) },
      { status: 500 }
    )
  }
}
