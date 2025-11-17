import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function useQueryState(defaults){
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const [state, setState] = React.useState(() => ({...defaults, ...Object.fromEntries(params)}))
  React.useEffect(()=>{
    const s = new URLSearchParams()
    Object.entries(state).forEach(([k,v])=>{ if(v) s.set(k, v) })
    navigate({ search: `?${s.toString()}` }, { replace: true })
    localStorage.setItem('config:'+state.model_slug, JSON.stringify(state))
  }, [state])
  return [state, setState]
}

export default function ConfiguratorPage(){
  const { slug } = useParams()
  const [model, setModel] = React.useState(null)
  const [state, setState] = useQueryState({ model_slug: slug })
  const [price, setPrice] = React.useState({ base: 0, extras: 0, total: 0 })

  React.useEffect(()=>{ fetch(`${baseUrl}/models/${slug}`).then(r=>r.json()).then(setModel) },[slug])
  React.useEffect(()=>{
    if(!state.model_slug) return
    fetch(`${baseUrl}/config/price`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(state) })
      .then(r=>r.json()).then(setPrice).catch(()=>{})
  }, [state])

  if(!model) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-400">Loading...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Step title="Variant">
          <div className="flex flex-wrap gap-3">
            {model.variants.map(v => (
              <Option key={v.name} active={state.variant===v.name} onClick={()=>setState(s=>({...s, variant: v.name}))}>
                <div className="font-medium">{v.name}</div>
                <div className="text-xs text-slate-300">${v.price.toLocaleString()}</div>
              </Option>
            ))}
          </div>
        </Step>

        <Step title="Color">
          <div className="flex flex-wrap gap-3">
            {model.colors.map(c => (
              <Option key={c} active={state.color===c} onClick={()=>setState(s=>({...s, color: c}))}>{c}</Option>
            ))}
          </div>
        </Step>

        <Step title="Wheels">
          <div className="flex flex-wrap gap-3">
            {model.wheels.map(w => (
              <Option key={w} active={state.wheels===w} onClick={()=>setState(s=>({...s, wheels: w}))}>{w}</Option>
            ))}
          </div>
        </Step>

        <Step title="Interior">
          <div className="flex flex-wrap gap-3">
            {model.interiors.map(i => (
              <Option key={i} active={state.interior===i} onClick={()=>setState(s=>({...s, interior: i}))}>{i}</Option>
            ))}
          </div>
        </Step>

        <Step title="Packages">
          <div className="flex flex-wrap gap-3">
            {model.packages.map(p => {
              const active = (state.packages||[]).includes(p)
              return (
                <Option key={p} active={active} onClick={()=>setState(s=>{
                  const set = new Set(s.packages||[])
                  if(set.has(p)) set.delete(p); else set.add(p)
                  return {...s, packages: Array.from(set)}
                })}>{p}</Option>
              )
            })}
          </div>
        </Step>

        <Step title="Accessories">
          <div className="flex flex-wrap gap-3">
            {model.accessories.map(a => {
              const active = (state.accessories||[]).includes(a)
              return (
                <Option key={a} active={active} onClick={()=>setState(s=>{
                  const set = new Set(s.accessories||[])
                  if(set.has(a)) set.delete(a); else set.add(a)
                  return {...s, accessories: Array.from(set)}
                })}>{a}</Option>
              )
            })}
          </div>
        </Step>
      </div>

      <aside className="space-y-4">
        <div className="bg-slate-900 border border-white/10 rounded-xl p-4">
          <h3 className="font-medium mb-2">Summary</h3>
          <ul className="text-sm text-slate-300 space-y-1">
            {state.variant && <li>Variant: <span className="font-medium text-white">{state.variant}</span></li>}
            {state.color && <li>Color: <span className="font-medium text-white">{state.color}</span></li>}
            {state.wheels && <li>Wheels: <span className="font-medium text-white">{state.wheels}</span></li>}
            {state.interior && <li>Interior: <span className="font-medium text-white">{state.interior}</span></li>}
            {state.packages?.length>0 && <li>Packages: <span className="font-medium text-white">{state.packages.join(', ')}</span></li>}
            {state.accessories?.length>0 && <li>Accessories: <span className="font-medium text-white">{state.accessories.join(', ')}</span></li>}
          </ul>
          <div className="mt-4 text-sm text-slate-300">Base: ${price.base.toLocaleString()}</div>
          <div className="text-sm text-slate-300">Extras: ${price.extras.toLocaleString()}</div>
          <div className="text-lg font-semibold mt-1">Total: ${price.total.toLocaleString()}</div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a href={`/contact?type=quote&model=${slug}`} className="px-3 py-2 rounded-md bg-white text-slate-900 text-center">Request Quote</a>
            <a href="/dealers" className="px-3 py-2 rounded-md bg-white/10 text-center">Find Dealer</a>
          </div>
        </div>
      </aside>
    </div>
  )
}

function Step({ title, children }){
  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-4">
      <h3 className="font-medium mb-3">{title}</h3>
      {children}
    </div>
  )
}

function Option({ active, onClick, children }){
  return (
    <button onClick={onClick} className={`px-3 py-2 rounded-md border text-sm ${active? 'bg-white text-slate-900 border-white':'bg-white/10 hover:bg-white/20 border-white/20'}`}>{children}</button>
  )
}
