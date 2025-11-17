import React from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Contact(){
  const [status, setStatus] = React.useState(null)
  const [type, setType] = React.useState(new URLSearchParams(location.search).get('type') || 'contact')
  const [model, setModel] = React.useState(new URLSearchParams(location.search).get('model') || '')

  function onSubmit(e){
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())
    payload.lead_type = type
    if(model) payload.model_slug = model
    fetch(`${baseUrl}/leads`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
      .then(r=>r.json()).then(()=> setStatus('Thanks! We\'ll be in touch soon.')).catch(()=> setStatus('Something went wrong'))
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold mb-6">Get in touch</h1>
      <form onSubmit={onSubmit} className="space-y-4 bg-slate-900 border border-white/10 rounded-xl p-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Name" name="name" required />
          <Field label="Email" name="email" type="email" required />
        </div>
        <Field label="Phone" name="phone" />
        <Field label="City" name="city" />
        <Field label="Message" name="message" multiline />
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-md bg-white text-slate-900">Submit</button>
          {status && <div className="text-slate-300 text-sm">{status}</div>}
        </div>
      </form>
    </div>
  )
}

function Field({ label, name, type='text', multiline, required }){
  return (
    <label className="block text-sm">
      <div className="text-slate-300 mb-1">{label}{required && <span className="text-pink-400">*</span>}</div>
      {multiline ? (
        <textarea name={name} required={required} rows={4} className="w-full rounded-md bg-slate-950 border border-white/10 px-3 py-2" />
      ) : (
        <input name={name} required={required} type={type} className="w-full rounded-md bg-slate-950 border border-white/10 px-3 py-2" />
      )}
    </label>
  )
}
