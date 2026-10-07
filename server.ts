import 'server-only'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

// A client that can write. The token stays on the server and is never sent to browsers.
export const writeToken = process.env.SANITY_WRITE_TOKEN || ''
export const writeClient = createClient({
  projectId: projectId || 'missing',
  dataset,
  apiVersion,
  token: writeToken,
  useCdn: false,
})
