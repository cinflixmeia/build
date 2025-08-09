import { Client, Account, Databases, Storage, ID } from "appwrite"

// Read client-safe env vars. Do NOT put API keys or JWT secrets in the client.
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1"
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID

export const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId || "")

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export { ID }

export function ensureAppwriteConfigured(): void {
  if (!projectId) {
    throw new Error("Appwrite not configured: NEXT_PUBLIC_APPWRITE_PROJECT_ID is missing")
  }
}

