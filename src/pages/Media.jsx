import React from 'react'

export default function Media(){
  const [items, setItems] = React.useState(Array.from({length:12}, (_,i)=>({id:i})))
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold mb-6">Media & Gallery</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(i => (
          <div key={i.id} className="aspect-square bg-slate-900 rounded-xl border border-white/10" />
        ))}
      </div>
      <div className="mt-8 text-sm text-slate-400">Videos, press kit, and high-res imagery will appear here. Assets use lazy loading for performance.</div>
    </div>
  )
}
