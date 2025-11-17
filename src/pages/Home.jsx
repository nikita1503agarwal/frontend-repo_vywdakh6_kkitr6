import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Home() {
  return (
    <div>
      <section className="relative h-[80vh] md:h-[90vh] overflow-hidden">
        <div className="absolute inset-0"> 
          <Spline scene="https://prod.spline.design/m8wpIQzXWhEh9Yek/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-12">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl font-bold tracking-tight">
              Meet the Future of Motion
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="mt-4 text-lg md:text-xl text-slate-300 max-w-xl">
              Aurora Motors crafts electric and hybrid vehicles with precision engineering and soulful design.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="mt-8 flex gap-3">
              <Link to="/models" className="px-5 py-3 rounded-md bg-white text-slate-900 font-medium hover:bg-slate-100">Explore Models</Link>
              <a href="#promos" className="px-5 py-3 rounded-md bg-white/10 hover:bg-white/20">Current Offers</a>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="promos" className="py-16 md:py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold">Featured Offers</h2>
            <Link to="/inventory" className="text-sm text-slate-300 hover:text-white">View all</Link>
          </div>
          <Promotions />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuickCard title="Sedans" to="/models?body_type=Sedan" />
            <QuickCard title="SUVs" to="/models?body_type=SUV" />
            <QuickCard title="Electric" to="/models?fuel_type=EV" />
          </div>
        </div>
      </section>
    </div>
  )
}

function QuickCard({ title, to }) {
  return (
    <Link to={to} className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-white/20 transition">
      <div className="aspect-[16/9] bg-gradient-to-br from-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
      <div className="absolute bottom-0 p-6">
        <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs text-slate-300 mb-3">Explore</div>
        <h3 className="text-xl font-medium group-hover:underline">{title}</h3>
      </div>
    </Link>
  )
}

function Promotions() {
  const [items, setItems] = React.useState([])
  React.useEffect(() => {
    fetch(`${baseUrl}/promotions`).then(r => r.json()).then(setItems).catch(()=>{})
  }, [])
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((p, idx) => (
        <div key={idx} className="rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
          <div className="aspect-[16/9] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_60%)]" />
          <div className="p-6">
            <div className="text-xs text-fuchsia-300/80 mb-2">Limited Offer</div>
            <h3 className="text-lg font-medium">{p.title}</h3>
            {p.description && <p className="text-slate-300 text-sm mt-2">{p.description}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
