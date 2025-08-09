"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AdminSettingsPage() {
  const [platformName, setPlatformName] = useState("Cinflix")
  const [supportEmail, setSupportEmail] = useState("support@cinflix.com")
  const [tosUrl, setTosUrl] = useState("/legal")
  const [privacyUrl, setPrivacyUrl] = useState("/privacy")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Platform Settings</h1>
        <p className="text-muted-foreground">Global configuration for the marketplace</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Platform Name</label>
            <Input value={platformName} onChange={(e) => setPlatformName(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium">Support Email</label>
            <Input value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Terms of Service URL</label>
              <Input value={tosUrl} onChange={(e) => setTosUrl(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Privacy Policy URL</label>
              <Input value={privacyUrl} onChange={(e) => setPrivacyUrl(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

