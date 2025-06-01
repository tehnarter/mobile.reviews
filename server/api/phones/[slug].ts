import { phones } from "~/server/data/phones"

export default defineEventHandler((event) => {
  const slug = event.context.params?.slug as keyof typeof phones

  if (!slug || !phones[slug]) {
    return null
  }

  return phones[slug]
})
