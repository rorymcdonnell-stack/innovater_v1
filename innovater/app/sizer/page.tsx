'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import type { SizingInput, SizingOutput } from '../../lib/sizer'

const NAVY = '#172749'
const SUN = '#F18B01'
const GLEAM = '#FFC82D'
const SKY = '#98BAC3'
const SPRING = '#B3D680'

function SizerContent() {
  const searchParams = useSearchParams()

  // Pre-populate from ConceptR if params present
  const fromConceptR = searchParams.get('from') === 'conceptr'
  const initialName = searchParams.get('concept') || ''
  const initialTagline = searchParams.get('tagline') || ''
  const initialScore = searchParams.get('score') || ''

  const [step, setStep] = useState<'brief' | 'sizing' | 'results'>('brief')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<SizingOutput | null>(null)

  const [form, setForm] = useState<SizingInput>({
    conceptName: initialName,
    tagline: initialTagline,
    category: '',
    segment: '',
    format: 'Powder',
    priceTier: 'Premium',
    targetConsumer: '',
    distributionAmbition: 'Specialty Retail',
    geographies: ['United States'],
    launchHorizon: '24 months',
    keyRTBs: [],
    scienceConfidenceScore: initialScore ? parseInt(initialScore) : undefined,
    fromConceptR,
    conceptStrengthScore: undefined,
    strategicRationale: '',
  })

  const [rtbInput, setRtbInput] = useState('')

  function update(key: keyof SizingInput, value: unknown) {
    setForm(f => ({ ...f, [key]: value }))
  }

  function addRtb() {
    if (rtbInput.trim()) {
      update('keyRTBs', [...(form.keyRTBs || []), rtbInput.trim()])
      setRtbInput('')
    }
  }

  function removeRtb(i: number) {
    update('keyRTBs', (form.keyRTBs || []).filter((_, idx) => idx !== i))
  }

  async function runSizing() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/generate-sizing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('API error')
      const data: SizingOutput = await res.json()
      setResult(data)
      setStep('results')
    } catch {
      setError('Failed to generate sizing. Please try again.')
    } finally {
      setLoading(false)
    }
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

      {/* ConceptR import banner */}
      {fromConceptR && (
        <div style={{ background: 'rgba(152,186,195,0.1)', borderBottom: '1px solid rgba(152,186,195,0.2)', padding: '0.75rem 2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: SKY }} />
          <span style={{ fontSize: '12px', color: SKY }}>
            Concept imported from <strong>ConceptR</strong>
            {initialName && <> — <strong>{initialName}</strong></>}
            {initialScore && <> · Science Score: <strong>{initialScore}/100</strong></>}
          </span>
        </div>
      )}

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem 2rem' }}>

        {/* Step indicator */}
        {step !== 'results' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
            {(['brief', 'sizing'] as const).map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: step === s ? GLEAM : 'rgba(255,255,255,0.1)',
                  color: step === s ? NAVY : 'rgba(255,255,255,0.3)',
                  fontSize: '11px', fontWeight: '700'
                }}>{i + 1}</div>
                <span style={{ fontSize: '12px', color: step === s ? '#fff' : 'rgba(255,255,255,0.3)', fontWeight: step === s ? '700' : '400', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
                  {s === 'brief' ? 'Concept Brief' : 'Size Parameters'}
                </span>
                {i < 1 && <span style={{ color: 'rgba(255,255,255,0.15)', margin: '0 0.25rem' }}>→</span>}
              </div>
            ))}
          </div>
        )}

        {/* STEP 1: Brief */}
        {step === 'brief' && (
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#fff', margin: '0 0 0.5rem 0' }}>Commercial Sizing Brief</h1>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', margin: '0 0 2.5rem 0' }}>Tell SizeR about the concept and we&apos;ll size its commercial opportunity using CODA category data.</p>

            <div style={{ display: 'grid', gap: '1.5rem' }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Concept Name *</label>
                  <input style={inputStyle} value={form.conceptName} onChange={e => update('conceptName', e.target.value)} placeholder="e.g. ON ProRecover+ Collagen" />
                </div>
                <div>
                  <label style={labelStyle}>Tagline</label>
                  <input style={inputStyle} value={form.tagline || ''} onChange={e => update('tagline', e.target.value)} placeholder="e.g. Rebuild from the inside out." />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Category *</label>
                  <input style={inputStyle} value={form.category} onChange={e => update('category', e.target.value)} placeholder="e.g. Sports Nutrition, Wellness" />
                </div>
                <div>
                  <label style={labelStyle}>Segment *</label>
                  <input style={inputStyle} value={form.segment} onChange={e => update('segment', e.target.value)} placeholder="e.g. Protein Supplements, Recovery" />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Target Consumer *</label>
                <input style={inputStyle} value={form.targetConsumer} onChange={e => update('targetConsumer', e.target.value)} placeholder="e.g. Active women 25-40 focused on recovery and performance" />
              </div>

              <div>
                <label style={labelStyle}>Strategic Rationale</label>
                <textarea style={{ ...inputStyle, height: '80px', resize: 'vertical' as const }} value={form.strategicRationale || ''} onChange={e => update('strategicRationale', e.target.value)} placeholder="Why does this concept exist? What gap does it fill?" />
              </div>

              <div>
                <label style={labelStyle}>Key RTBs (Reasons to Believe)</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input style={{ ...inputStyle, flex: 1, marginBottom: 0 }} value={rtbInput} onChange={e => setRtbInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addRtb()} placeholder="Add an RTB and press Enter" />
                  <button onClick={addRtb} style={{ ...btnOutline, padding: '0 1rem' }}>Add</button>
                </div>
                {(form.keyRTBs || []).length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px', marginTop: '8px' }}>
                    {(form.keyRTBs || []).map((r, i) => (
                      <span key={i} style={{ fontSize: '12px', padding: '4px 10px', background: 'rgba(255,200,45,0.1)', border: '0.5px solid rgba(255,200,45,0.3)', color: GLEAM, borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {r}
                        <button onClick={() => removeRtb(i)} style={{ background: 'none', border: 'none', color: GLEAM, cursor: 'pointer', padding: 0, fontSize: '14px', lineHeight: 1 }}>×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {initialScore && (
                <div style={{ background: 'rgba(152,186,195,0.08)', border: '1px solid rgba(152,186,195,0.2)', borderRadius: '8px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ textAlign: 'center' as const }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: SKY }}>{initialScore}</div>
                    <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>Science Score</div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                    Science confidence score imported from ConceptR. SizeR will factor this into the commercial confidence assessment.
                  </div>
                </div>
              )}

            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setStep('sizing')}
                disabled={!form.conceptName || !form.category || !form.targetConsumer}
                style={!form.conceptName || !form.category || !form.targetConsumer ? btnDisabled : btnPrimary}
              >
                Continue to Sizing Parameters →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Sizing parameters */}
        {step === 'sizing' && (
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#fff', margin: '0 0 0.5rem 0' }}>Sizing Parameters</h1>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', margin: '0 0 2.5rem 0' }}>Define the commercial parameters. CODA data will be matched to your category and format.</p>

            <div style={{ display: 'grid', gap: '1.5rem' }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Product Format *</label>
                  <select style={selectStyle} value={form.format} onChange={e => update('format', e.target.value)}>
                    {['Powder', 'RTD', 'Bar', 'Capsule', 'Gummy'].map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Price Tier *</label>
                  <select style={selectStyle} value={form.priceTier} onChange={e => update('priceTier', e.target.value)}>
                    {['Budget', 'Mid', 'Premium', 'Super Premium'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Distribution Ambition *</label>
                  <select style={selectStyle} value={form.distributionAmbition} onChange={e => update('distributionAmbition', e.target.value)}>
                    {['DTC / Amazon', 'Specialty Retail', 'Regional Mass', 'National Mass', 'Global'].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Launch Horizon *</label>
                  <select style={selectStyle} value={form.launchHorizon} onChange={e => update('launchHorizon', e.target.value)}>
                    {['12 months', '24 months', '36 months'].map(h => <option key={h}>{h}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Target Geographies</label>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px' }}>
                  {['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'Ireland'].map(geo => (
                    <button
                      key={geo}
                      onClick={() => {
                        const current = form.geographies
                        update('geographies', current.includes(geo) ? current.filter(g => g !== geo) : [...current, geo])
                      }}
                      style={{
                        fontSize: '12px', padding: '6px 14px', borderRadius: '20px', cursor: 'pointer',
                        background: form.geographies.includes(geo) ? 'rgba(255,200,45,0.15)' : 'transparent',
                        border: `1px solid ${form.geographies.includes(geo) ? 'rgba(255,200,45,0.5)' : 'rgba(255,255,255,0.15)'}`,
                        color: form.geographies.includes(geo) ? GLEAM : 'rgba(255,255,255,0.4)',
                        transition: 'all 0.15s',
                      }}
                    >{geo}</button>
                  ))}
                </div>
              </div>

              {/* Data transparency */}
              <div style={{ background: 'rgba(255,200,45,0.05)', border: '1px solid rgba(255,200,45,0.15)', borderRadius: '8px', padding: '1rem 1.25rem' }}>
                <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: GLEAM, marginBottom: '0.5rem' }}>Data Sources — Demo Mode</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  {[
                    { label: 'Category Data', value: 'CODA (Demo Extract)', color: GLEAM },
                    { label: 'Retail Channels', value: 'NIQ + SPINS + Amazon + Costco', color: GLEAM },
                    { label: 'Financial Parameters', value: 'Industry Benchmarks', color: 'rgba(255,255,255,0.4)' },
                    { label: 'Household Panel', value: 'CODA Demo Data', color: GLEAM },
                  ].map(d => (
                    <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                      <span style={{ color: 'rgba(255,255,255,0.4)' }}>{d.label}</span>
                      <span style={{ color: d.color, fontWeight: '600' }}>{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {error && <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '8px', color: '#F87171', fontSize: '13px' }}>{error}</div>}

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={() => setStep('brief')} style={btnOutline}>← Back</button>
              <button onClick={runSizing} disabled={loading} style={loading ? btnDisabled : btnPrimary}>
                {loading ? 'Generating sizing analysis...' : 'Generate Commercial Sizing →'}
              </button>
            </div>

            {loading && (
              <div style={{ marginTop: '2rem', textAlign: 'center' as const }}>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>Matching CODA category data · Running P&L model · Scoring commercial opportunity</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: '8px', height: '8px', borderRadius: '50%', background: GLEAM,
                      animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
                <style>{`@keyframes pulse { 0%,100%{opacity:0.2;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }`}</style>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Results */}
        {step === 'results' && result && (
          <div>
            {/* Results header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: GLEAM, marginBottom: '0.4rem' }}>Commercial Sizing — {form.geographies.join(' · ')}</div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#fff', margin: '0 0 0.25rem 0' }}>{form.conceptName}</h1>
                {form.tagline && <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>{form.tagline}</p>}
              </div>
              <div style={{ textAlign: 'right' as const }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: recColor, lineHeight: 1 }}>{result.recommendation}</div>
                <div style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Recommendation</div>
              </div>
            </div>

            {/* Scores row */}
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

            {/* TAM / SAM / SOM waterfall */}
            <div style={sectionCard}>
              <div style={sectionTitle}>Market Opportunity — TAM / SAM / SOM</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem' }}>
                {[
                  { label: 'TAM', sublabel: 'Total Addressable Market', value: fmt(result.tam), desc: 'Total category retail value' },
                  { label: 'SAM', sublabel: 'Serviceable Addressable Market', value: fmt(result.sam), desc: `Reach via ${form.distributionAmbition}` },
                  { label: 'SOM (Base)', sublabel: 'Realistic Share of Market', value: fmt(result.som.base), desc: 'Base case share capture' },
                ].map(m => (
                  <div key={m.label} style={{ background: '#172749', padding: '1.25rem' }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.14em', color: GLEAM, marginBottom: '0.25rem' }}>{m.label}</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#fff', marginBottom: '0.25rem' }}>{m.value}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{m.desc}</div>
                  </div>
                ))}
              </div>

              {/* SOM scenarios */}
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
              <div style={sectionTitle}>3-Year Revenue Projections ($000s)</div>
              <div style={{ overflowX: 'auto' as const }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' as const, fontSize: '13px' }}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Scenario</th>
                      <th style={thStyle}>Year 1</th>
                      <th style={thStyle}>Year 2</th>
                      <th style={thStyle}>Year 3</th>
                      <th style={thStyle}>Gross Margin</th>
                      <th style={thStyle}>Payback</th>
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
            </div>

            {/* Launch investment */}
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
                <div style={{ fontSize: '2rem', fontWeight: '700', color: recColor, lineHeight: 1 }}>{result.recommendation}</div>
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

            {/* White space + category insight */}
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

            {/* Methodology note */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' as const, marginBottom: '0.4rem' }}>Methodology · Data Transparency</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>{result.methodologyNote} · Financial parameters are calibrated industry benchmarks (demo mode). Replace with Glanbia actuals for production use.</div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={() => { setStep('brief'); setResult(null) }} style={btnOutline}>← New Sizing</button>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => window.print()} style={btnOutline}>Export PDF</button>
                <Link href="/" style={btnPrimary as React.CSSProperties}>← InnovateR Home</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Styles
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em',
  textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '6px'
}
const inputStyle: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '14px',
  outline: 'none', marginBottom: 0, fontFamily: 'Arial, Helvetica, sans-serif'
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
const btnDisabled: React.CSSProperties = {
  ...btnPrimary, opacity: 0.4, cursor: 'not-allowed'
}
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

export default function SizerPage() {
  return (
    <Suspense fallback={<div style={{ background: '#172749', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', fontFamily: 'Arial' }}>Loading SizeR...</div>}>
      <SizerContent />
    </Suspense>
  )
}
