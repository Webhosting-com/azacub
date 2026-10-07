const card = `_id, title, "slug": slug.current, category, standfirst, publishedAt, mainImage`

export const homeQuery = `{
  "posts": *[_type == "post" && defined(slug.current)] | order(lead desc, publishedAt desc)[0...7]{ ${card} },
  "spotlight": *[_type == "spotlight"] | order(_updatedAt desc)[0]{ name, role, location, blurb, photo, link }
}`

export const postQuery = `*[_type == "post" && slug.current == $slug][0]{
  ${card}, body, trackTitle, links[]{ label, url }
}`

export const slugsQuery = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`

export type PostCard = {
  _id: string
  title: string
  slug: string
  category?: string
  standfirst?: string
  publishedAt?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainImage?: any
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Post = PostCard & { body?: any[]; trackTitle?: string; links?: { label: string; url: string }[] }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Spotlight = { name: string; role?: string; location?: string; blurb?: string; photo?: any; link?: string }
