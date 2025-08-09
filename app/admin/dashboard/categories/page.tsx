"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Download, Upload } from "lucide-react"

type Category = { id: string; name: string; slug: string; description?: string }

export default function AdminCategoriesPage() {
  const uniqueId = (suffix?: string) => `${Date.now()}-${Math.random().toString(36).slice(2,8)}${suffix ? '-' + suffix : ''}`
  const [categories, setCategories] = useState<Category[]>(() => {
    if (typeof window === 'undefined') return []
    try { return JSON.parse(localStorage.getItem('admin_categories') || '[]') } catch { return [] }
  })
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => { try { localStorage.setItem('admin_categories', JSON.stringify(categories)) } catch {} }, [categories])

  const add = () => {
    if (!name.trim() || !slug.trim()) return
    const c: Category = { id: uniqueId(), name: name.trim(), slug: slug.trim().toLowerCase(), description: description.trim() || undefined }
    setCategories(prev => [c, ...prev])
    setName("")
    setSlug("")
    setDescription("")
    appendAudit({ action: 'category.add', target: c.id, meta: c })
  }

  const remove = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id))
    appendAudit({ action: 'category.remove', target: id })
  }

  const exportCsv = () => {
    const header = "ID,Name,Slug,Description\n"
    const rows = categories.map(c => `${c.id},${c.name},${c.slug},${c.description || ''}`).join("\n")
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `categories_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const importCsv = (file: File) => {
    const r = new FileReader()
    r.onload = () => {
      try {
        const text = String(r.result || '')
        const lines = text.split(/\r?\n/).filter(Boolean)
        const parsed: Category[] = lines.slice(1).map((l, i) => {
          const [id,name,slug,description] = l.split(',')
          return { id: id && id.trim() ? id : uniqueId(String(i)), name, slug, description }
        })
        setCategories(prev => [...parsed, ...prev])
        appendAudit({ action: 'category.import.csv', meta: { count: parsed.length } })
      } catch {}
    }
    r.readAsText(file)
  }

  function appendAudit(entry: { action: string; target?: string; meta?: any }) {
    try {
      const raw = localStorage.getItem('admin_audit')
      const arr = raw ? JSON.parse(raw) : []
      arr.push({ id: String(Date.now()), ts: Date.now(), actor: 'admin', ...entry })
      localStorage.setItem('admin_audit', JSON.stringify(arr))
    } catch {}
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-muted-foreground">Manage categories for discovery and organization</p>
        </div>
        <div className="flex items-center gap-2">
          <input id="cat-import" type="file" accept=".csv" className="hidden" onChange={(e) => { const f=e.target.files?.[0]; if (f) importCsv(f) }} />
          <Button variant="outline" onClick={() => document.getElementById('cat-import')?.click()}><Upload className="h-4 w-4 mr-2"/> Import</Button>
          <Button variant="outline" onClick={exportCsv}><Download className="h-4 w-4 mr-2"/> Export</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Category</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
          <Input placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Button onClick={add} disabled={!name.trim() || !slug.trim()}><Plus className="h-4 w-4 mr-2"/> Add</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Categories ({categories.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((c, i) => (
              <div key={`${c.id}-${i}`} className="flex items-center justify-between p-2 border rounded text-sm">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{c.slug}</Badge>
                  <div className="font-medium">{c.name}</div>
                  {c.description && <div className="text-muted-foreground">— {c.description}</div>}
                </div>
                <Button size="sm" variant="destructive" onClick={() => remove(c.id)}><Trash2 className="h-4 w-4 mr-2"/> Remove</Button>
              </div>
            ))}
            {categories.length === 0 && <div className="text-muted-foreground text-sm">No categories yet</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

