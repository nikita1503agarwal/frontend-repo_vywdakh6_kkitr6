import React from 'react'
import { Link, useParams } from 'react-router-dom'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ModelDetail(){
  const { slug } = useParams()
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    fetch(`${baseUrl}/models/${slug}`).then(r=>r.json()).then(setData).catch(()=>{})
  }, [slug])

  if(!data) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-400">Loading...</div>

  return (
    <div>
      <section className="relative">
        <div className="aspect-[16/7] bg-gradient-to-br from-slate-800 to-slate-900" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative">
          <div className="bg-slate-900/70 backdrop-blur border border-white/10 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <div className="text-slate-300 text-sm">{data.body_type} • {data.fuel_type}</div>
                <h1 className="text-3xl md:text-4xl font-semibold mt-1">{data.name}</h1>
                {data.price_range && <div className="text-slate-300 mt-1">${data.price_range.min.toLocaleString()} - ${data.price_range.max.toLocaleString()}</div>}
              </div>
              <div className="flex gap-3">
                <Link to={`/configurator/${data.slug}`} className="px-4 py-2 rounded-md bg-white text-slate-900 font-medium">Configure</Link>
                <a href={data.brochure_url || '#'} className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20">Download Brochure</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-xl font-medium mb-3">Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(data.gallery || []).slice(0,6).map((g, i) => (
              <div key={i} className="aspect-video bg-slate-800 rounded-lg" />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-medium mb-3">Highlights</h2>
          <ul className="space-y-2 text-slate-300 text-sm">
            {(data.specs?.features || ["Panoramic roof","Wireless CarPlay","ADAS Level 2"]).map((f, i)=>(
              <li key={i} className="flex gap-2"><span className="text-slate-500">•</span><span>{f}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-xl font-medium mb-4">Specifications</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SpecCard title="Dimensions" items={Object.entries(data.specs?.dimensions || {Length: '4800 mm', Width: '1870 mm', Height: '1440 mm'})} />
          <SpecCard title="Engine" items={Object.entries(data.specs?.engine || {'Power': '250 kW', 'Torque': '500 Nm', 'Battery': '82 kWh'})} />
          <SpecCard title="Performance" items={Object.entries(data.specs?.performance || {'0-60 mph': '3.9 s', 'Top Speed': '155 mph', 'Range': '320 mi'})} />
        </div>
      </section>

      {(data.related_slugs || []).length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-xl font-medium mb-4">Related Models</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.related_slugs.map(sl => (
              <Link key={sl} to={`/models/${sl}`} className="rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
                <div className="aspect-[16/9] bg-gradient-to-br from-slate-800 to-slate-900" />
                <div className="p-4">{sl}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function SpecCard({ title, items }){
  return (
    <div className="bg-slate-900/70 backdrop-blur border border-white/10 rounded-xl p-4">
      <h3 className="text-slate-200 mb-2">{title}</h3>
      <ul className="text-sm text-slate-300 space-y-1">
        {items.map(([k, v]) => (
          <li key={k} className="flex justify-between gap-3"><span className="text-slate-400">{k}</span><span className="font-medium">{String(v)}</span></li>
        ))}
      </ul>
    </div>
  )
}
