import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '7z759egu',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-08-15', // today's date
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)
