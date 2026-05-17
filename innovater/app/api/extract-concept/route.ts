import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  try {
    const { pdfBase64 } = await req.json()

    if (!pdfBase64) {
      return NextResponse.json({ error: 'No PDF provided' }, { status: 400 })
    }

    // Decode base64 and extract readable text
    const pdfBuffer = Buffer.from(pdfBase64, 'base64')
    const pdfText = pdfBuffer.toString('utf-8').replace(/[^\x20-\x7E\n\r\t]/g, ' ').trim()

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: `You are extracting product concept data from a ConceptR PDF export for Glanbia Performance Nutrition.

Here is the raw text content extracted from the PDF:

<pdf_content>
${pdfText.slice(0, 8000)}
</pdf_content>

Read the PDF carefully and extract the following. Pay close attention to what the product ACTUALLY is — do not default to sports nutrition if it is clearly a different category (e.g. kids snacks, wellness, plant-based).

Return ONLY valid JSON with no preamble, no markdown, no backticks:

{
  "conceptName": "the exact product name as it appears in the PDF",
  "tagline": "the tagline or positioning line",
  "category": "the most accurate category — e.g. Better-for-You Snacks, Kids Nutrition, Sports Nutrition, Wellness, Plant-Based — infer carefully from the product description and target consumer",
  "segment": "the specific segment — e.g. Kids Snack Bars, Protein Bars, Recovery, Cognitive Health — infer from the product",
  "targetConsumer": "copy the target consumer description from the PDF",
  "strategicRationale": "summarise the strategic rationale in 1-2 sentences",
  "keyRTBs": ["RTB 1", "RTB 2", "RTB 3"],
  "scienceConfidenceScore": 76,
  "conceptStrengthScore": 82,
  "format": "one of: Powder, RTD, Bar, Capsule, Gummy — read this directly from the PDF header or product description",
  "priceTier": "one of: Budget, Mid, Premium, Super Premium — read this directly from the PDF (Mid-range = Mid)"
}

CRITICAL RULES:
- format: look for explicit labels like 'Bar', 'Powder', 'RTD' in the PDF header — do NOT guess
- priceTier: look for 'Mid-range', 'Premium', 'Budget' labels — Mid-range maps to Mid
- category: if the target consumer is parents/kids, this is Kids Nutrition or Better-for-You Snacks, NOT Sports Nutrition
- scienceConfidenceScore and conceptStrengthScore: look for the numerical scores in the PDF (e.g. 82/100, 76/100)
- Return valid JSON only`,
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
