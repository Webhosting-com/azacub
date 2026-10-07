// The AZACUB Sanity project. This ID is public by design; it is not a password.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'zvx6ymct'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2026-03-01'
export const isConfigured = projectId.length > 0
