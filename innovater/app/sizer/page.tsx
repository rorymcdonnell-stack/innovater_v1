'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { SizingOutput } from '../../lib/sizer'

const NAVY = '#172749'
const SUN = '#F18B01'
const GLEAM = '#FFC82D'
const SKY = '#98BAC3'
const SPRING = '#B3D680'

interface ExtractedConcept {
  conceptName: string
  tagline: string
  category: string
  segment: string
  targetConsumer: string
  strategicRationale: string
  keyRTBs: string[]
  scienceConfidenceScore?: number
  conceptStrengthScore?: number
  format: 'Powder' | 'RTD' | 'Bar' | 'Capsule' | 'Gummy'
  priceTier: 'Budget' | 'Mid' | 'Premium' | 'Super Premium'
}

export default function SizerPage() {
  const [step, setStep] = useState<'upload' | 'confirm' | 'results'>('upload')
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [thinking, setThinking] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [concept, setConcept] = useState<ExtractedConcept | null>(null)
  const [result, setResult] = useState<SizingOutput | null>(null)
  const [fileName, setFileName] = useState('')

  // Sizing parameters (confirmed by user)
  const [distributionAmbition, setDistributionAmbition] = useState<string>('Specialty Retail')
  const [geographies, setGeographies] = useState<string[]>(['United States'])
  const [launchHorizon, setLaunchHorizon] = useState<string>('24 months')

  async function handleFile(file: File) {
    if (!file || file.type !== 'application/pdf') {
      setUploadError('Please upload a PDF file exported from ConceptR.')
      return
    }
    setFileName(file.name)
    setUploading(true)
    setUploadError('')

    try {
      // Convert PDF to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          const result = reader.result as string
          resolve(result.split(',')[1])
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      // Send to extraction API
      const res = await fetch('/api/extract-concept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdfBase64: base64 }),
      })

      if (!res.ok) throw new Error('Extraction failed')
      const extracted: ExtractedConcept = await res.json()
      setConcept(extracted)
      setStep('confirm')
    } catch {
      setUploadError('Failed to read the PDF. Please ensure it is a ConceptR export and try again.')
    } finally {
      setUploading(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  async function runSizing() {
    if (!concept) return
    setThinking(true)
    setUploadError('')
    try {
      const res = await fetch('/api/generate-sizing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...concept,
          distributionAmbition,
          geographies,
          launchHorizon,
          fromConceptR: true,
        }),
      })
      if (!res.ok) throw new Error('Sizing failed')
      const data: SizingOutput = await res.json()
      setResult(data)
      setStep('results')
    } catch {
      setUploadError('SizeR encountered an error. Please try again.')
    } finally {
      setThinking(false)
    }
  }

  function toggleGeo(geo: string) {
    setGeographies(g => g.includes(geo) ? g.filter(x => x !== geo) : [...g, geo])
  }

  const recColor = result?.recommendation === 'Go' ? SPRING : result?.recommendation === 'Watch' ? GLEAM : '#F87171'

  function fmt(n: number) {
    if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}B`
    if (n >= 1000) return `$${(n / 1000).toFixed(1)}M`
    return `$${n.toFixed(0)}K`
  }

  return (
    <div style={{ minHeight: '100vh', background: NAVY, fontFamily: 'Arial, Helvetica, sans-serif' }}>

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>
              Innovate<span style={{ color: SUN }}>R</span>
            </span>
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
          <span style={{ fontSize: '1rem', fontWeight: '700', color: GLEAM }}>
            Size<span style={{ color: SUN }}>R</span>
          </span>
          <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.3)', background: 'rgba(255,200,45,0.1)', padding: '3px 8px', borderRadius: '20px', border: '0.5px solid rgba(255,200,45,0.2)' }}>
            Commercial Intelligence
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>CODA · Demo Data</span>
          <Link href="/" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>← InnovateR</Link>
        </div>
      </nav>

      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '3rem 2rem' }}>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
          {(['upload', 'confirm', 'results'] as const).map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: step === s ? GLEAM : (i < ['upload', 'confirm', 'results'].indexOf(step) ? 'rgba(179,214,128,0.3)' : 'rgba(255,255,255,0.08)'),
                color: step === s ? NAVY : 'rgba(255,255,255,0.3)',
                fontSize: '11px', fontWeight: '700', flexShrink: 0,
              }}>{i + 1}</div>
              <span style={{ fontSize: '11px', color: step === s ? '#fff' : 'rgba(255,255,255,0.3)', fontWeight: step === s ? '700' : '400', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
                {s === 'upload' ? 'Upload Concept' : s === 'confirm' ? 'Confirm Parameters' : 'Sizing Results'}
              </span>
              {i < 2 && <span style={{ color: 'rgba(255,255,255,0.15)', margin: '0 0.25rem' }}>→</span>}
            </div>
          ))}
        </div>

        {/* STEP 1: Upload */}
        {step === 'upload' && (
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#fff', margin: '0 0 0.75rem 0' }}>Upload ConceptR Export</h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', margin: '0 0 2.5rem 0', lineHeight: 1.7 }}>
              Export an approved concept from ConceptR as a PDF and upload it here. SizeR will read the concept and size its commercial opportunity against CODA category data.
            </p>

            {/* Drop zone */}
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${dragging ? GLEAM : 'rgba(255,255,255,0.15)'}`,
                borderRadius: '16px',
                padding: '4rem 2rem',
                textAlign: 'center' as const,
                background: dragging ? 'rgba(255,200,45,0.05)' : 'rgba(255,255,255,0.02)',
                transition: 'all 0.2s',
                cursor: 'pointer',
                marginBottom: '1.5rem',
              }}
              onClick={() => document.getElementById('pdf-input')?.click()}
            >
              {uploading ? (
                <div>
                  <div style={{ fontSize: '1rem', color: GLEAM, fontWeight: '600', marginBottom: '1rem' }}>SizeR is reading your concept...</div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{
                        width: '8px', height: '8px', borderRadius: '50%', background: GLEAM,
                        animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }} />
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.4 }}>↑</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem' }}>
                    Drop your ConceptR PDF here
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem' }}>
                    or click to browse
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: GLEAM, padding: '8px 16px', border: `1px solid ${GLEAM}40`, borderRadius: '8px', background: 'rgba(255,200,45,0.08)' }}>
                    Select PDF file
                  </div>
                </div>
              )}
              <input id="pdf-input" type="file" accept="application/pdf" style={{ display: 'none' }} onChange={handleFileInput} />
            </div>

            {uploadError && (
              <div style={{ padding: '0.75rem 1rem', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '8px', color: '#F87171', fontSize: '13px', marginBottom: '1rem' }}>
                {uploadError}
              </div>
            )}

            {/* What SizeR reads */}
            <div style={{ background: 'rgba(255,200,45,0.04)', border: '1px solid rgba(255,200,45,0.12)', borderRadius: '10px', padding: '1.25rem 1.5rem' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: GLEAM, marginBottom: '0.75rem' }}>What SizeR reads from your PDF</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {['Concept name & tagline', 'Category & segment', 'Target consumer', 'Strategic rationale', 'Ingredients & format', 'RTBs & claims', 'Science confidence score', 'Risk flags'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: GLEAM, flexShrink: 0 }} />
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Confirm parameters */}
        {step === 'confirm' && concept && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: SPRING }} />
              <span style={{ fontSize: '12px', color: SPRING, fontWeight: '600' }}>Concept read from {fileName}</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#fff', margin: '0 0 0.25rem 0' }}>{concept.conceptName}</h1>
            {concept.tagline && <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.45)', margin: '0 0 2rem 0' }}>{concept.tagline}</p>}

            {/* Concept summary extracted from PDF */}
            <div style={{ background: 'rgba(152,186,195,0.06)', border: '1px solid rgba(152,186,195,0.15)', borderRadius: '10px', padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: SKY, marginBottom: '1rem' }}>Extracted from ConceptR PDF</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[
                  { label: 'Category', value: concept.category },
                  { label: 'Segment', value: concept.segment },
                  { label: 'Format', value: concept.format },
                  { label: 'Price Tier', value: concept.priceTier },
                  { label: 'Target Consumer', value: concept.targetConsumer },
                  { label: 'Science Score', value: concept.scienceConfidenceScore ? `${concept.scienceConfidenceScore}/100` : '—' },
                ].map(f => (
                  <div key={f.label}>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: '2px' }}>{f.label}</div>
                    <div style={{ fontSize: '13px', color: '#fff', fontWeight: '500' }}>{f.value}</div>
                  </div>
                ))}
              </div>
              {concept.keyRTBs.length > 0 && (
                <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: '6px' }}>Key RTBs</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px' }}>
                    {concept.keyRTBs.map((r, i) => (
                      <span key={i} style={{ fontSize: '11px', padding: '3px 10px', background: 'rgba(152,186,195,0.1)', border: '0.5px solid rgba(152,186,195,0.25)', color: SKY, borderRadius: '20px' }}>{r}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Commercial parameters to confirm */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: GLEAM, marginBottom: '1.25rem' }}>Confirm Sizing Parameters</div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={labelStyle}>Distribution Ambition</label>
                  <select style={selectStyle} value={distributionAmbition} onChange={e => setDistributionAmbition(e.target.value)}>
                    {['DTC / Amazon', 'Specialty Retail', 'Regional Mass', 'National Mass', 'Global'].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Launch Horizon</label>
                  <select style={selectStyle} value={launchHorizon} onChange={e => setLaunchHorizon(e.target.value)}>
                    {['12 months', '24 months', '36 months'].map(h => <option key={h}>{h}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Target Geographies</label>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px' }}>
                  {['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'Ireland'].map(geo => (
                    <button key={geo} onClick={() => toggleGeo(geo)} style={{
                      fontSize: '13px', padding: '7px 16px', borderRadius: '20px', cursor: 'pointer',
                      background: geographies.includes(geo) ? 'rgba(255,200,45,0.15)' : 'transparent',
                      border: `1px solid ${geographies.includes(geo) ? 'rgba(255,200,45,0.5)' : 'rgba(255,255,255,0.15)'}`,
                      color: geographies.includes(geo) ? GLEAM : 'rgba(255,255,255,0.4)',
                      transition: 'all 0.15s',
                    }}>{geo}</button>
                  ))}
                </div>
              </div>
            </div>

            {uploadError && (
              <div style={{ padding: '0.75rem 1rem', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '8px', color: '#F87171', fontSize: '13px', marginBottom: '1rem' }}>
                {uploadError}
              </div>
            )}

            {thinking && (
              <div style={{ textAlign: 'center' as const, marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem' }}>SizeR is thinking — matching CODA data · running P&L model · scoring opportunity</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: GLEAM, animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep('upload')} style={btnOutline}>← Upload Different PDF</button>
              <button onClick={runSizing} disabled={thinking} style={thinking ? btnDisabled : btnPrimary}>
                {thinking ? 'SizeR is thinking...' : 'Run Commercial Sizing →'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Results */}
        {step === 'results' && result && concept && (
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: GLEAM, marginBottom: '0.4rem' }}>Commercial Sizing — {geographies.join(' · ')}</div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#fff', margin: '0 0 0.25rem 0' }}>{concept.conceptName}</h1>
                {concept.tagline && <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>{concept.tagline}</p>}
              </div>
              <div style={{ textAlign: 'right' as const, flexShrink: 0 }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: recColor, lineHeight: 1 }}>{result.recommendation}</div>
                <div style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Recommendation</div>
              </div>
            </div>

            {/* Scores */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Commercial Confidence', value: `${result.commercialConfidenceScore}/100`, color: result.commercialConfidenceScore >= 65 ? SPRING : result.commercialConfidenceScore >= 40 ? GLEAM : '#F87171' },
                { label: 'Segment Growth', value: `+${result.segmentGrowthRate?.toFixed(1) || '--'}% YoY`, color: GLEAM },
                { label: 'GPN Segment Share', value: result.gpnShareInSegment > 0 ? `${result.gpnShareInSegment.toFixed(1)}%` : 'New entry', color: SKY },
                { label: 'CODA Segment', value: result.codaSegmentUsed, color: 'rgba(255,255,255,0.55)' },
              ].map(s => (
                <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '1rem' }}>
                  <div style={{ fontSize: '10px', fontWeight: '600', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '0.4rem' }}>{s.label}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '700', color: s.color, lineHeight: 1.2 }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* TAM/SAM/SOM */}
            <div style={sectionCard}>
              <div style={sectionTitle}>Market Opportunity — TAM / SAM / SOM</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem' }}>
                {[
                  { label: 'TAM', value: fmt(result.tam), desc: 'Total category retail value' },
                  { label: 'SAM', value: fmt(result.sam), desc: `Reach via ${distributionAmbition}` },
                  { label: 'SOM (Base)', value: fmt(result.som.base), desc: 'Base case share capture' },
                ].map(m => (
                  <div key={m.label} style={{ background: '#172749', padding: '1.25rem' }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.14em', color: GLEAM, marginBottom: '0.25rem' }}>{m.label}</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#fff', marginBottom: '0.25rem' }}>{m.value}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{m.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {[
                  { scenario: 'Conservative', value: result.som.conservative, color: '#F87171' },
                  { scenario: 'Base', value: result.som.base, color: GLEAM },
                  { scenario: 'Optimistic', value: result.som.optimistic, color: SPRING },
                ].map(s => (
                  <div key={s.scenario} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${s.color}30`, borderRadius: '8px', padding: '0.875rem 1rem' }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: s.color, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '0.4rem' }}>{s.scenario}</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>{fmt(s.value)}</div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>Realisable SOM</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue projections */}
            <div style={sectionCard}>
              <div style={sectionTitle}>3-Year Revenue Projections</div>
              <table style={{ width: '100%', borderCollapse: 'collapse' as const, fontSize: '13px' }}>
                <thead>
                  <tr>
                    {['Scenario', 'Year 1', 'Year 2', 'Year 3', 'Gross Margin', 'Payback'].map(h => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(['conservative', 'base', 'optimistic'] as const).map((s, i) => {
                    const colors = ['#F87171', GLEAM, SPRING]
                    return (
                      <tr key={s} style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: colors[i], textTransform: 'capitalize' as const }}>{s}</td>
                        <td style={tdStyle}>{fmt(result.revenueProjections.year1[s])}</td>
                        <td style={tdStyle}>{fmt(result.revenueProjections.year2[s])}</td>
                        <td style={tdStyle}>{fmt(result.revenueProjections.year3[s])}</td>
                        <td style={tdStyle}>{result.grossMargin[s]}%</td>
                        <td style={tdStyle}>{result.paybackMonths[s]} mo.</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Launch + Competitive */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div style={sectionCard}>
                <div style={sectionTitle}>Launch Investment Required</div>
                <div style={{ fontSize: '1.4rem', fontWeight: '700', color: SUN, marginBottom: '0.25rem' }}>
                  {fmt(result.launchInvestmentRange.min)} – {fmt(result.launchInvestmentRange.max)}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{result.launchInvestmentRange.label}</div>
              </div>
              <div style={sectionCard}>
                <div style={sectionTitle}>Competitive Position</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{result.competitivePosition}</div>
              </div>
            </div>

            {/* Recommendation */}
            <div style={{ ...sectionCard, borderColor: `${recColor}40`, background: `${recColor}08` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: recColor }}>{result.recommendation}</div>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: '700', color: recColor, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Commercial Recommendation</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>Commercial Confidence: {result.commercialConfidenceScore}/100</div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, margin: '0 0 1rem 0' }}>{result.recommendationRationale}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: '700', color: SPRING, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '0.5rem' }}>Key Opportunities</div>
                  {result.keyOpportunities.map((o, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px', alignItems: 'flex-start' }}>
                      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: SPRING, marginTop: '5px', flexShrink: 0 }} />
                      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{o}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: '700', color: '#F87171', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '0.5rem' }}>Key Risks</div>
                  {result.keyRisks.map((r, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px', alignItems: 'flex-start' }}>
                      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#F87171', marginTop: '5px', flexShrink: 0 }} />
                      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* White space + insight */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div style={sectionCard}>
                <div style={sectionTitle}>White Space Assessment</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{result.whiteSpaceAssessment}</div>
              </div>
              <div style={sectionCard}>
                <div style={sectionTitle}>Category Insight</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{result.categoryInsight}</div>
              </div>
            </div>

            {/* Methodology */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' as const, marginBottom: '0.4rem' }}>Methodology · Data Transparency</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>{result.methodologyNote} · Financial parameters are calibrated industry benchmarks (demo mode). Replace with Glanbia actuals for production use.</div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
              <button onClick={() => { setStep('upload'); setResult(null); setConcept(null); setFileName('') }} style={btnOutline}>← Size Another Concept</button>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => window.print()} style={btnOutline}>Export PDF</button>
                <Link href="/" style={btnPrimary as React.CSSProperties}>← InnovateR Home</Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:0.2;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }`}</style>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em',
  textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '6px'
}
const inputStyle: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '14px',
  outline: 'none', fontFamily: 'Arial, Helvetica, sans-serif'
}
const selectStyle: React.CSSProperties = {
  ...inputStyle, cursor: 'pointer', appearance: 'none' as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(255,255,255,0.4)' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center'
}
const btnPrimary: React.CSSProperties = {
  background: 'linear-gradient(135deg, #F18B01, #FFC82D)', color: '#172749',
  fontWeight: '700', fontSize: '14px', padding: '11px 24px', borderRadius: '8px',
  border: 'none', cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center'
}
const btnOutline: React.CSSProperties = {
  background: 'transparent', color: 'rgba(255,255,255,0.5)', fontWeight: '400',
  fontSize: '13px', padding: '10px 20px', borderRadius: '8px',
  border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', textDecoration: 'none'
}
const btnDisabled: React.CSSProperties = { ...btnPrimary, opacity: 0.4, cursor: 'not-allowed' }
const sectionCard: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px', padding: '1.25rem 1.5rem', marginBottom: '1rem'
}
const sectionTitle: React.CSSProperties = {
  fontSize: '10px', fontWeight: '700', letterSpacing: '0.12em',
  textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem'
}
const thStyle: React.CSSProperties = {
  padding: '0.5rem 1rem', textAlign: 'left', fontSize: '10px', fontWeight: '700',
  letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)'
}
const tdStyle: React.CSSProperties = { padding: '0.75rem 1rem', color: 'rgba(255,255,255,0.7)' }
