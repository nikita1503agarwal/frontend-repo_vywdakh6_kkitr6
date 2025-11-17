import React, { useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Menu, Car, MapPin, Wrench, Image as ImageIcon, Phone } from 'lucide-react'
import Home from './pages/Home'
import Models from './pages/Models'
import ModelDetail from './pages/ModelDetail'
import Inventory from './pages/Inventory'
import Media from './pages/Media'
import Contact from './pages/Contact'
import ConfiguratorPage from './pages/ConfiguratorPage'

function useScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
}

function Navbar() {
  const [open, setOpen] = React.useState(false)
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-fuchsia-500 to-sky-500" />
          <span className="text-white font-semibold tracking-tight">Aurora Motors</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-200">
          <Link className="hover:text-white" to="/models">Models</Link>
          <Link className="hover:text-white" to="/inventory">Offers</Link>
          <Link className="hover:text-white" to="/dealers">Dealers</Link>
          <Link className="hover:text-white" to="/media">Media</Link>
          <Link className="hover:text-white" to="/contact">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/models" className="hidden sm:inline-flex px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm">Explore</Link>
          <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="menu"><Menu /></button>
        </div>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-3 space-y-2 bg-slate-900/90 border-t border-white/10">
          <Link onClick={()=>setOpen(false)} className="block py-2 text-slate-200" to="/models">Models</Link>
          <Link onClick={()=>setOpen(false)} className="block py-2 text-slate-200" to="/inventory">Offers</Link>
          <Link onClick={()=>setOpen(false)} className="block py-2 text-slate-200" to="/dealers">Dealers</Link>
          <Link onClick={()=>setOpen(false)} className="block py-2 text-slate-200" to="/media">Media</Link>
          <Link onClick={()=>setOpen(false)} className="block py-2 text-slate-200" to="/contact">Contact</Link>
        </div>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-fuchsia-500 to-sky-500" />
            <span className="text-white font-semibold">Aurora Motors</span>
          </div>
          <p className="text-sm text-slate-400">Future-forward vehicles designed for life in motion.</p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-white" to="/models">Models</Link></li>
            <li><Link className="hover:text-white" to="/inventory">Offers</Link></li>
            <li><Link className="hover:text-white" to="/media">Media</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-white" to="/contact">Contact</Link></li>
            <li><a className="hover:text-white" href="#">Sitemap</a></li>
            <li><a className="hover:text-white" href="#">Privacy & Legal</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-3">Follow</h4>
          <div className="flex gap-3 text-slate-400">
            <a href="#" aria-label="Instagram" className="hover:text-white">IG</a>
            <a href="#" aria-label="X" className="hover:text-white">X</a>
            <a href="#" aria-label="YouTube" className="hover:text-white">YT</a>
          </div>
        </div>
      </div>
      <div className="text-xs text-slate-500 px-4 sm:px-6 lg:px-8 pb-8">© {new Date().getFullYear()} Aurora Motors. Original brand identity and licensed imagery only. Not affiliated with any other automaker.</div>
    </footer>
  )
}

function App() {
  useScrollToTop()
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="pt-16 min-h-[calc(100vh-64px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/models" element={<Models />} />
          <Route path="/models/:slug" element={<ModelDetail />} />
          <Route path="/configurator/:slug" element={<ConfiguratorPage />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/dealers" element={<Inventory dealers />} />
          <Route path="/media" element={<Media />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
