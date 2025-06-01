// server/api/phones/index.ts
import { phones } from "~/server/data/phones"

export default defineEventHandler(() => {
  return Object.entries(phones).map(([slug, data]) => ({
    slug,
    image: data.image,
    translations: data.translations,
  }))
})
