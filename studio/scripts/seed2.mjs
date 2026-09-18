import {createClient} from '@sanity/client'
import * as dotenv from 'dotenv'
import {fileURLToPath} from 'url'
import {dirname, resolve} from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'djdiiitp',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-02-01',
  token: process.env.SANITY_API_TOKEN, // optional if write allowed, or user can publish via studio
  useCdn: false,
})
