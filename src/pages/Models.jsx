import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Models(){
  const [params, setParams] = useSearchParams()
  const [models, setModels] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  const body_type = params.get('body_type') || ''
  const fuel_type = params.get('fuel_type') || ''

  React.useEffect(() => {
    const url = new URL(`${baseUrl}/models`)
    if (body_type) url.searchParams.set('body_type', body_type)
    if (fuel_type) url.searchParams.set('fuel_type', fuel_type)
    fetch(url.toString()).then(r=>r.json()).then(d=>{ setModels(d); setLoading(false) }).catch(()=>setLoading(false))
  }, [body_type, fuel_type])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold mb-6">All Models</h1>

      <div className="flex flex-wrap gap-3 mb-8">
        <Select label="Body Type" value={body_type} onChange={v => setParams(prev=>{ const p = new URLSearchParams(prev); if(v) p.set('body_type', v); else p.delete('body_type'); return p })} options={['','Hatchback','Sedan','SUV','Truck','Coupe']} />
        <Select label="Fuel" value={fuel_type} onChange={v => setParams(prev=>{ const p = new URLSearchParams(prev); if(v) p.set('fuel_type', v); else p.delete('fuel_type'); return p })} options={['','Petrol','Diesel','EV','Hybrid']} />
      </div>

      {loading ? (
        <div className="text-slate-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map(m => (
            <div key={m.slug} className="rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-white/20 transition">
              <div className="aspect-[16/9] bg-gradient-to-br from-slate-800 to-slate-900" />
              <div className="p-6">
                <div className="text-xs text-slate-400">{m.body_type} • {m.fuel_type}</div>
                <h3 className="text-xl font-medium mt-1">{m.name}</h3>
                {m.price_range && (
                  <div className="text-slate-300 text-sm mt-1">${m.price_range.min.toLocaleString()} - ${m.price_range.max.toLocaleString()}</div>
                )}
                <div className="mt-4 flex gap-3">
                  <Link to={`/models/${m.slug}`} className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-sm">View Details</Link>
                  <Link to={`/configurator/${m.slug}`} className="px-3 py-1.5 rounded-md bg-white text-slate-900 text-sm">Configure</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Select({ label, value, onChange, options }){
  return (
    <label className="inline-flex items-center gap-2 text-sm text-slate-300">
      <span>{label}</span>
      <select value={value} onChange={e=>onChange(e.target.value)} className="bg-slate-900 border border-white/10 rounded-md px-2 py-1 text-white">
        {options.map(o => <option key={o} value={o}>{o || 'Any'}</option>)}
      </select>
    </label>
  )
}
