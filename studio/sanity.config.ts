import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'oryenna-studio',
  title: 'Oryenna Atelier Studio',

  projectId: 'djdiiitp',
  dataset: 'production',

  plugins: [
    structureTool({
      title: 'Atelier Content',
    }),
    visionTool({
      defaultApiVersion: '2026-02-01',
      defaultDataset: 'production',
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
