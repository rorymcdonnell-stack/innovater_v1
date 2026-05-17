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

Extract the following information and return ONLY valid JSON with no preamble, no markdown, no backticks:

{
  "conceptName": "the product name",
  "tagline": "the concept tagline or positioning line",
  "category": "e.g. Sports Nutrition, Wellness, Better-for-You Snacks",
  "segment": "e.g. Protein Supplements, Recovery, Cognitive Health",
  "targetConsumer": "who the product is for",
  "strategicRationale": "why this concept exists and what gap it fills",
  "keyRTBs": ["reason to believe 1", "reason to believe 2"],
  "scienceConfidenceScore": 82,
  "conceptStrengthScore": null,
  "format": "Powder",
  "priceTier": "Premium"
}

Rules:
- format must be one of: Powder, RTD, Bar, Capsule, Gummy — infer from context
- priceTier must be one of: Budget, Mid, Premium, Super Premium — infer from positioning
- scienceConfidenceScore and conceptStrengthScore are numbers 0-100 or null if not found
- keyRTBs should be an array of 3-6 short strings
- If a field is not present, make a reasonable inference from context
- Return valid JSON only — no other text`,
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
