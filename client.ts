import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'
import { apiVersion, dataset, isConfigured, projectId } from './env'

export const client = createClient({
  projectId: projectId || 'missing',
  dataset,
  apiVersion,
  useCdn: true,
})

// Returns the fallback instead of crashing when Sanity is not set up yet or is unreachable.
export async function safeFetch<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
  if (!isConfigured) return fallback
  try {
    const result = await client.fetch<T>(query, params)
    return result ?? fallback
  } catch (err) {
    console.error('Sanity fetch failed', err)
    return fallback
  }
}

const builder = createImageUrlBuilder({ projectId: projectId || 'missing', dataset })
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlFor = (source: any) => builder.image(source).auto('format').fit('max')
