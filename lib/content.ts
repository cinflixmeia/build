"use client"

import { ID, databases, storage } from "./appwrite"
import { Models } from "appwrite"
import { Permission, Role, Query } from "appwrite"

export interface ContentFormData {
  title: string
  description: string
  genre: string
  year: string
  duration?: string
  language?: string
  country?: string
  director?: string
  cast?: string
  tags?: string
  price?: string
  rights?: string
  trailerUrl?: string
}

export interface CreatedContentDoc extends Models.Document {
  title: string
  description: string
  genre: string
  year: string
  duration?: string
  language?: string
  country?: string
  director?: string
  cast?: string
  tags?: string
  price?: string
  rights?: string
  trailerUrl?: string
  ownerId: string
  posterFileId?: string
  posterUrl?: string
  videoFileId?: string
  videoUrl?: string
}

function getEnv(name: string): string | undefined {
  const value = process.env[name]
  return value && value.length > 0 ? value : undefined
}

function getRequiredEnv(name: string): string {
  const value = getEnv(name)
  if (!value) throw new Error(`${name} is not set`)
  return value
}

export async function uploadFilePublic(
  bucketId: string,
  file: File
): Promise<{ fileId: string; url: string }> {
  const res = await storage.createFile(bucketId, ID.unique(), file, [
    Permission.read(Role.any()),
  ])
  const fileId = res.$id
  // For images, preview is ideal. For videos, fallback to view URL.
  let url: string
  const mime = file.type
  if (mime.startsWith("image/")) {
    url = storage.getFilePreview(bucketId, fileId, 800, 0, "center").toString()
  } else {
    url = storage.getFileView(bucketId, fileId).toString()
  }
  return { fileId, url }
}

export async function createContentDocument(params: {
  form: ContentFormData
  ownerId: string
  posterFile?: File
  videoFile?: File
}): Promise<CreatedContentDoc> {
  const databaseId = getRequiredEnv("NEXT_PUBLIC_APPWRITE_DATABASE_ID")
  const collectionId = getRequiredEnv("NEXT_PUBLIC_APPWRITE_CONTENTS_COLLECTION_ID")

  let posterUrl: string | undefined
  let posterFileId: string | undefined
  let videoUrl: string | undefined
  let videoFileId: string | undefined

  if (params.posterFile) {
    const bucketId = getRequiredEnv("NEXT_PUBLIC_APPWRITE_BUCKET_POSTERS_ID")
    const up = await uploadFilePublic(bucketId, params.posterFile)
    posterUrl = up.url
    posterFileId = up.fileId
  }
  if (params.videoFile) {
    const bucketId = getRequiredEnv("NEXT_PUBLIC_APPWRITE_BUCKET_VIDEOS_ID")
    const up = await uploadFilePublic(bucketId, params.videoFile)
    videoUrl = up.url
    videoFileId = up.fileId
  }

  const doc = await databases.createDocument<CreatedContentDoc>(
    databaseId,
    collectionId,
    ID.unique(),
    {
      ...params.form,
      ownerId: params.ownerId,
      posterFileId,
      posterUrl,
      videoFileId,
      videoUrl,
    },
    [
      Permission.read(Role.any()), // public browse
      Permission.update(Role.user(params.ownerId)),
      Permission.delete(Role.user(params.ownerId)),
    ]
  )
  return doc
}

export async function listMyContents(ownerId: string) {
  const databaseId = getRequiredEnv("NEXT_PUBLIC_APPWRITE_DATABASE_ID")
  const collectionId = getRequiredEnv("NEXT_PUBLIC_APPWRITE_CONTENTS_COLLECTION_ID")
  const res = await databases.listDocuments<CreatedContentDoc>(databaseId, collectionId, [
    Query.equal("ownerId", ownerId),
    Query.orderDesc("$createdAt"),
    Query.limit(50),
  ])
  return res.documents
}

export async function listPublicContents(limit = 24) {
  const databaseId = getRequiredEnv("NEXT_PUBLIC_APPWRITE_DATABASE_ID")
  const collectionId = getRequiredEnv("NEXT_PUBLIC_APPWRITE_CONTENTS_COLLECTION_ID")
  const res = await databases.listDocuments<CreatedContentDoc>(databaseId, collectionId, [
    Query.orderDesc("$createdAt"),
    Query.limit(limit),
  ])
  return res.documents
}

