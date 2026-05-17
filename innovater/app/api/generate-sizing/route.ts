import { NextRequest, NextResponse } from 'next/server'
import { generateSizing, SizingInput } from '../../../lib/sizer'

export async function POST(req: NextRequest) {
  try {
    const input: SizingInput = await req.json()

    if (!input.conceptName || !input.category || !input.format) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const result = await generateSizing(input)
    return NextResponse.json(result)
  } catch (err) {
    console.error('Sizing API error:', err)
    return NextResponse.json({ error: 'Failed to generate sizing analysis' }, { status: 500 })
  }
}
