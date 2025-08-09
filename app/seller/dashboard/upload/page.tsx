"use client"

import { useState, useEffect, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Upload, 
  FileVideo, 
  Image, 
  FileText, 
  X, 
  CheckCircle,
  AlertCircle,
  Clock
 } from "lucide-react"
 import { toast } from "sonner"
 import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { createContentDocument } from "@/lib/content"

function UploadContentInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const contentId = searchParams.get("id")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isEditMode, setIsEditMode] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    year: "",
    duration: "",
    language: "",
    country: "",
    director: "",
    cast: "",
    tags: "",
    price: "",
    rights: "",
    trailerUrl: ""
  })
  // Size limits (bytes)
  const MAX_VIDEO_SIZE = 500 * 1024 * 1024 // 500 MB
  const MAX_IMAGE_SIZE = 10 * 1024 * 1024  // 10 MB
  const MAX_SUB_SIZE   = 2 * 1024 * 1024   // 2 MB

  const [uploadedFiles, setUploadedFiles] = useState<{
    video?: File
    poster?: File
    subtitles?: File[]
  }>({})
  const [flags, setFlags] = useState<{ enable_uploads?: boolean } | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('admin_flags')
      if (raw) {
        const arr = JSON.parse(raw) as Array<{ key: string; enabled: boolean }>
        const obj: any = {}
        arr.forEach(f => { obj[f.key] = f.enabled })
        setFlags(obj)
      }
    } catch {}
  }, [])

  const [fileMeta, setFileMeta] = useState<{ 
    videoName?: string
    posterName?: string
    subtitleNames?: string[]
    posterDataUrl?: string
  }>({})

  // Load draft (new) or hydrate edit (existing)
  useEffect(() => {
    // Load draft only when not editing
    if (!contentId) {
      const draft = localStorage.getItem("uploadDraft")
      if (draft) {
        try {
          const parsed = JSON.parse(draft)
          if (parsed.formData) setFormData(parsed.formData)
          if (parsed.fileMeta) setFileMeta(parsed.fileMeta)
        } catch (err) {
          console.error("Failed to parse draft", err)
        }
      }
    }

    // Hydrate edit mode
    if (contentId) {
      try {
        const raw = localStorage.getItem("sellerContents")
        const contents: any[] = raw ? JSON.parse(raw) : []
        const existing = contents.find((c) => c.id === contentId)
        if (existing) {
          if (existing.formData) setFormData(existing.formData)
          if (existing.fileMeta) setFileMeta(existing.fileMeta)
          setIsEditMode(true)
        }
      } catch (e) {
        console.error("Failed to load content for edit", e)
      }
    }
  }, [contentId])

  const handleFileUpload = (type: 'video' | 'poster' | 'subtitles', files: FileList | null) => {
    if (!files) return

    const fileArray = Array.from(files)

    const validate = (file: File) => {
      if (type === 'video') {
        if (!file.type.startsWith('video/')) {
          toast.error('Invalid file type. Please upload a video file.')
          return false
        }
        if (file.size > MAX_VIDEO_SIZE) {
          toast.error('Video exceeds 500 MB limit.')
          return false
        }
      }
      if (type === 'poster') {
        if (!file.type.startsWith('image/')) {
          toast.error('Poster must be an image.')
          return false
        }
        if (file.size > MAX_IMAGE_SIZE) {
          toast.error('Image exceeds 10 MB limit.')
          return false
        }
      }
      if (type === 'subtitles') {
        if (!['application/x-subrip', 'text/vtt'].includes(file.type) && !file.name.match(/\.(srt|vtt)$/)) {
          toast.error('Subtitle file must be .srt or .vtt')
          return false
        }
        if (file.size > MAX_SUB_SIZE) {
          toast.error('Subtitle exceeds 2 MB limit.')
          return false
        }
      }
      return true
    }

    if (type === 'subtitles') {
      const validSubs = fileArray.filter(validate)
      if (validSubs.length === 0) return
      setUploadedFiles(prev => ({
        ...prev,
        subtitles: [...(prev.subtitles || []), ...validSubs]
      }))
      setFileMeta(prev => ({
        ...prev,
        subtitleNames: [
          ...(prev.subtitleNames || []),
          ...validSubs.map(f => f.name)
        ]
      }))
    } else {
      const file = fileArray[0]
      if (!validate(file)) return
      setUploadedFiles(prev => ({
        ...prev,
        [type]: file
      }))
      if (type === 'poster') {
        try {
          const reader = new FileReader()
          reader.onload = () => {
            setFileMeta(prev => ({
              ...prev,
              posterName: file.name,
              posterDataUrl: typeof reader.result === 'string' ? reader.result : prev.posterDataUrl
            }))
          }
          reader.readAsDataURL(file)
        } catch {
          setFileMeta(prev => ({ ...prev, posterName: file.name }))
        }
      } else {
        setFileMeta(prev => ({
          ...prev,
          ...(type === 'video' ? { videoName: file.name } : {})
        }))
      }
    }
  }

  const removeFile = (type: 'video' | 'poster' | 'subtitles', index?: number) => {
    if (type === 'subtitles' && index !== undefined) {
      setUploadedFiles(prev => ({
        ...prev,
        subtitles: prev.subtitles?.filter((_, i) => i !== index)
      }))
      setFileMeta(prev => ({
        ...prev,
        subtitleNames: (prev.subtitleNames || []).filter((_, i) => i !== index)
      }))
    } else {
      setUploadedFiles(prev => {
        const newFiles = { ...prev }
        delete newFiles[type]
        return newFiles
      })
      setFileMeta(prev => ({
        ...prev,
        ...(type === 'video' ? { videoName: undefined } : {}),
        ...(type === 'poster' ? { posterName: undefined } : {})
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    setUploadProgress(10)
    try {
      const user = await getCurrentUser()
      if (!user) {
        toast.error('Please login to upload content')
        setIsUploading(false)
        return
      }

      // Create document in Appwrite (files optional)
      const doc = await createContentDocument({
        form: formData,
        ownerId: user.$id,
        posterFile: uploadedFiles.poster,
        videoFile: uploadedFiles.video,
      })
      setUploadProgress(100)
      toast.success(isEditMode ? 'Content updated' : 'Content uploaded')
      localStorage.removeItem('uploadDraft')
      router.push('/seller/dashboard/discover')
    } catch (err: any) {
      const message = err?.message || 'Failed to save content'
      toast.error(message)
    } finally {
      setIsUploading(false)
    }
  }

  const saveDraft = () => {
    localStorage.setItem('uploadDraft', JSON.stringify({ formData, fileMeta }))
    toast.success('Draft saved')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{isEditMode ? 'Edit Content' : 'Upload Content'}</h1>
          <p className="text-muted-foreground">{isEditMode ? 'Update your content details' : 'Add new content to your library'}</p>
        </div>
        <Link href="/seller/dashboard/discover">
          <Button variant="outline">Back to Discover</Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title *</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter content title"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Year *</label>
                <Input
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="2024"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description *</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter a detailed description of your content"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Genre *</label>
                <Input
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  placeholder="Documentary, Drama, etc."
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <Input
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="1h 30m"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <Input
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  placeholder="English"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Content Files</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Video Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Video File *</label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <FileVideo className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {uploadedFiles.video?.name || fileMeta.videoName || "Drop your video file here or click to browse"}
                  </p>
                  <div className="flex gap-2 justify-center">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileUpload('video', e.target.files)}
                      className="hidden"
                      id="video-upload"
                      required={!fileMeta.videoName}
                    />
                    <label htmlFor="video-upload">
                      <Button type="button" variant="outline" className="cursor-pointer" disabled={flags?.enable_uploads === false}>
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Video
                      </Button>
                    </label>
                    {uploadedFiles.video && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeFile('video')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Poster Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Poster Image</label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Image className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {uploadedFiles.poster?.name || fileMeta.posterName || "Upload a poster image for your content"}
                  </p>
                  <div className="flex gap-2 justify-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('poster', e.target.files)}
                      className="hidden"
                      id="poster-upload"
                    />
                    <label htmlFor="poster-upload">
                      <Button type="button" variant="outline" className="cursor-pointer" disabled={flags?.enable_uploads === false}>
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Image
                      </Button>
                    </label>
                    {uploadedFiles.poster && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeFile('poster')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Subtitles Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Subtitles (Optional)</label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Upload subtitle files (.srt, .vtt)
                  </p>
                  <div className="flex gap-2 justify-center">
                    <input
                      type="file"
                      accept=".srt,.vtt"
                      multiple
                      onChange={(e) => handleFileUpload('subtitles', e.target.files)}
                      className="hidden"
                      id="subtitles-upload"
                    />
                    <label htmlFor="subtitles-upload">
                      <Button type="button" variant="outline" className="cursor-pointer" disabled={flags?.enable_uploads === false}>
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Subtitles
                      </Button>
                    </label>
                  </div>
                </div>
                {uploadedFiles.subtitles && uploadedFiles.subtitles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.subtitles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                        <span className="text-sm">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile('subtitles', index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                {(!uploadedFiles.subtitles || uploadedFiles.subtitles.length === 0) && (fileMeta.subtitleNames?.length ? (
                  <div className="mt-4 space-y-2">
                    {fileMeta.subtitleNames.map((name, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                        <span className="text-sm">{name}</span>
                      </div>
                    ))}
                  </div>
                ) : null)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Director</label>
                <Input
                  name="director"
                  value={formData.director}
                  onChange={handleInputChange}
                  placeholder="Director name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Cast</label>
                <Input
                  name="cast"
                  value={formData.cast}
                  onChange={handleInputChange}
                  placeholder="Main cast members"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Country of Origin</label>
                <Input
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="United States"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <Input
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="space, moon, nasa, documentary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Trailer URL</label>
                <Input
                  name="trailerUrl"
                  value={formData.trailerUrl}
                  onChange={handleInputChange}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Rights Information</label>
                <Input
                  name="rights"
                  value={formData.rights}
                  onChange={handleInputChange}
                  placeholder="Worldwide, North America, etc."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Progress */}
        {isUploading && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Uploading content...</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{uploadProgress}% complete</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={saveDraft}
            disabled={isUploading}
          >
            <Clock className="h-4 w-4 mr-2" />
            Save Draft
          </Button>

          <Button
            type="submit"
            disabled={
              isUploading ||
              !formData.title ||
              (!uploadedFiles.video && !fileMeta.videoName)
            }
            className="flex-1"
          >
            {isUploading ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Content
              </>
            )}
          </Button>
          <Link href="/seller/dashboard/discover">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default function UploadContentPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading upload form…</div>}>
      <UploadContentInner />
    </Suspense>
  )
}