import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  try {
    const { pdfBase64 } = await req.json()

    if (!pdfBase64) {
      return NextResponse.json({ error: 'No PDF provided' }, { status: 400 })
    }

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'document',
              source: {
                type: 'base64',
                media_type: 'application/pdf',
                data: pdfBase64,
              },
            } as any,
            {
              type: 'text',
              text: `You are extracting product concept data from a ConceptR PDF export for Glanbia Performance Nutrition.

Read the PDF carefully and extract the following fields. Return ONLY valid JSON — no preamble, no markdown, no backticks.

{
  "conceptName": "the exact product name from the PDF",
  "tagline": "the tagline or positioning line",
  "category": "accurate category — e.g. Better-for-You Snacks, Kids Nutrition, Sports Nutrition, Wellness, Plant-Based",
  "segment": "specific segment — e.g. Kids Snack Bars, High Protein Bars, Recovery, Cognitive Health",
  "targetConsumer": "copy the target consumer description from the PDF",
  "strategicRationale": "1-2 sentence summary of the strategic rationale",
  "keyRTBs": ["RTB 1", "RTB 2", "RTB 3"],
  "scienceConfidenceScore": 76,
  "conceptStrengthScore": 82,
  "format": "Bar",
  "priceTier": "Mid"
}

CRITICAL RULES:
- format: must be exactly one of: Powder, RTD, Bar, Capsule, Gummy — read directly from the PDF header
- priceTier: must be exactly one of: Budget, Mid, Premium, Super Premium — Mid-range maps to Mid
- category: if the target consumer is parents or children, use Kids Nutrition or Better-for-You Snacks — NOT Sports Nutrition
- scienceConfidenceScore and conceptStrengthScore: read the actual numbers from the PDF scores section (e.g. 82/100 → 82)
- Return valid JSON only — nothing else`,
            },
          ],
        },
      ],
    })

    const text = response.content
      .filter(b => b.type === 'text')
      .map(b => (b as { type: 'text'; text: string }).text)
      .join('')
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()

    const extracted = JSON.parse(text)
    return NextResponse.json(extracted)
  } catch (err) {
    console.error('PDF extraction error:', err)
    return NextResponse.json({ error: 'Failed to extract concept from PDF' }, { status: 500 })
  }
}
