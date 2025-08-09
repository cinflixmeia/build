"use client"

import { account, ensureAppwriteConfigured } from "./appwrite"

export async function signUpWithEmailPassword(params: {
  email: string
  password: string
  name?: string
}): Promise<void> {
  ensureAppwriteConfigured()
  await account.create("unique()", params.email, params.password, params.name)
}

export async function createEmailSession(params: {
  email: string
  password: string
}): Promise<void> {
  ensureAppwriteConfigured()
  await account.createEmailSession(params.email, params.password)
}

export async function logoutCurrentSession(): Promise<void> {
  ensureAppwriteConfigured()
  await account.deleteSession("current")
}

export async function getCurrentUser() {
  ensureAppwriteConfigured()
  try {
    return await account.get()
  } catch {
    return null
  }
}

