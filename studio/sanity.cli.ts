import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'djdiiitp',
    dataset: 'production',
  },
  typegen: {
    enabled: true,
    path: '../{app,sanity,lib,components}/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../sanity/types.generated.ts',
    overloadClientMethods: true,
  },
})
