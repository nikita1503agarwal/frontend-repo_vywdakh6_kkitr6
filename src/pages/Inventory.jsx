import React from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Inventory({ dealers }){
  const [items, setItems] = React.useState([])
  const [q, setQ] = React.useState('')

  React.useEffect(()=>{
    if (dealers) return
    fetch(`${baseUrl}/promotions`).then(r=>r.json()).then(setItems).catch(()=>{})
  }, [dealers])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold mb-6">{dealers ? 'Find a Dealer' : 'Offers & Inventory'}</h1>
      {dealers ? (
        <Dealers />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
              <div className="aspect-[16/9] bg-gradient-to-br from-slate-800 to-slate-900" />
              <div className="p-6">
                <div className="text-xs text-fuchsia-300/80 mb-1">Limited Offer</div>
                <div className="font-medium">{p.title}</div>
                {p.description && <div className="text-slate-300 text-sm mt-1">{p.description}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Dealers(){
  const [q, setQ] = React.useState('')
  const [items, setItems] = React.useState([])
  React.useEffect(()=>{ fetchDealers('') },[])
  function fetchDealers(city){
    const url = new URL(`${baseUrl}/dealers`)
    if (city) url.searchParams.set('city', city)
    fetch(url.toString()).then(r=>r.json()).then(setItems).catch(()=>{})
  }
  return (
    <div>
      <div className="mb-6 flex gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="City or ZIP" className="flex-1 rounded-md bg-slate-900 border border-white/10 px-3 py-2" />
        <button onClick={()=>fetchDealers(q)} className="px-3 py-2 rounded-md bg-white text-slate-900">Search</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((d,i)=> (
          <div key={i} className="rounded-xl border border-white/10 bg-slate-900 p-4">
            <div className="font-medium">{d.name}</div>
            <div className="text-sm text-slate-300">{d.address || d.city}</div>
            {d.phone && <div className="text-sm text-slate-300">{d.phone}</div>}
            {d.email && <a href={`mailto:${d.email}`} className="text-sm text-sky-300 hover:underline">{d.email}</a>}
          </div>
        ))}
      </div>
    </div>
  )
}
