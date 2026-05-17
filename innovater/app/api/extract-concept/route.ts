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
            },
            {
              type: 'text',
              text: `Extract the following information from this ConceptR product concept PDF and return ONLY valid JSON with no preamble or markdown.

Extract these fields:
- conceptName: string (the product name)
- tagline: string (the concept tagline or positioning line)
- category: string (e.g. "Sports Nutrition", "Wellness", "Better-for-You Snacks")
- segment: string (e.g. "Protein Supplements", "Recovery", "Cognitive Health")
- targetConsumer: string (who the product is for)
- strategicRationale: string (why this concept exists, what gap it fills)
- keyRTBs: string[] (reasons to believe — list of claims or proof points)
- scienceConfidenceScore: number | null (the science confidence score if present, 0-100)
- conceptStrengthScore: number | null (the concept strength score if present, 0-100)
- format: one of "Powder" | "RTD" | "Bar" | "Capsule" | "Gummy" (infer from ingredients or format mentions)
- priceTier: one of "Budget" | "Mid" | "Premium" | "Super Premium" (infer from positioning)

If a field is not clearly present in the document, make a reasonable inference from context. Return valid JSON only.`,
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
