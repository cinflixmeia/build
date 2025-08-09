import { Client, Databases, Storage } from 'appwrite'

function getenv(name, required = true, def) {
  const v = process.env[name] ?? def
  if (required && (!v || String(v).length === 0)) {
    throw new Error(`Missing required env: ${name}`)
  }
  return v
}

async function ensureDatabase(databases, databaseId, name = 'cinflix') {
  try {
    await databases.get(databaseId)
    return { id: databaseId, created: false }
  } catch {
    const res = await databases.create(databaseId, name)
    return { id: res.$id, created: true }
  }
}

async function ensureCollection(databases, databaseId, collectionId, name = 'contents') {
  try {
    await databases.getCollection(databaseId, collectionId)
    return { id: collectionId, created: false }
  } catch {
    const res = await databases.createCollection(databaseId, collectionId, name, [
      // public read; write will be per-owner in app at document level
      'read("any")'
    ])
    return { id: res.$id, created: true }
  }
}

async function ensureAttribute(databases, databaseId, collectionId, attr) {
  const { key, type, size = 255, required = false } = attr
  try {
    const list = await databases.listAttributes(databaseId, collectionId)
    if (list.attributes.find(a => a.key === key)) return false
  } catch {}
  if (type === 'string') {
    await databases.createStringAttribute(databaseId, collectionId, key, size, required)
  }
  return true
}

async function ensureBucket(storage, bucketId, name) {
  try {
    await storage.getBucket(bucketId)
    return { id: bucketId, created: false }
  } catch {
    const res = await storage.createBucket(bucketId, name, [
      'read("any")'
    ])
    return { id: res.$id, created: true }
  }
}

async function main() {
  const endpoint = getenv('APPWRITE_ENDPOINT')
  const projectId = getenv('APPWRITE_PROJECT_ID')
  const apiKey = getenv('APPWRITE_API_KEY')

  const databaseId = getenv('APPWRITE_DATABASE_ID', false, 'cinflix')
  const contentsCollectionId = getenv('APPWRITE_CONTENTS_COLLECTION_ID', false, 'contents')
  const postersBucketId = getenv('APPWRITE_BUCKET_POSTERS_ID', false, 'posters')
  const videosBucketId = getenv('APPWRITE_BUCKET_VIDEOS_ID', false, 'videos')

  const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey)
  const databases = new Databases(client)
  const storage = new Storage(client)

  const db = await ensureDatabase(databases, databaseId, 'Cinflix')
  const coll = await ensureCollection(databases, db.id, contentsCollectionId, 'Contents')

  // minimal attributes used by the app
  const attributes = [
    { key: 'title', type: 'string', size: 255, required: true },
    { key: 'description', type: 'string', size: 8192, required: true },
    { key: 'genre', type: 'string', size: 128, required: true },
    { key: 'year', type: 'string', size: 8, required: true },
    { key: 'duration', type: 'string', size: 32, required: false },
    { key: 'language', type: 'string', size: 64, required: false },
    { key: 'country', type: 'string', size: 64, required: false },
    { key: 'director', type: 'string', size: 128, required: false },
    { key: 'cast', type: 'string', size: 1024, required: false },
    { key: 'tags', type: 'string', size: 1024, required: false },
    { key: 'price', type: 'string', size: 32, required: false },
    { key: 'rights', type: 'string', size: 128, required: false },
    { key: 'trailerUrl', type: 'string', size: 1024, required: false },
    { key: 'ownerId', type: 'string', size: 64, required: true },
    { key: 'posterFileId', type: 'string', size: 64, required: false },
    { key: 'posterUrl', type: 'string', size: 2048, required: false },
    { key: 'videoFileId', type: 'string', size: 64, required: false },
    { key: 'videoUrl', type: 'string', size: 2048, required: false },
  ]
  for (const attr of attributes) {
    await ensureAttribute(databases, db.id, coll.id, attr)
  }

  const posters = await ensureBucket(storage, postersBucketId, 'Posters')
  const videos = await ensureBucket(storage, videosBucketId, 'Videos')

  console.log(JSON.stringify({
    databaseId: db.id,
    contentsCollectionId: coll.id,
    postersBucketId: posters.id,
    videosBucketId: videos.id,
  }, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

