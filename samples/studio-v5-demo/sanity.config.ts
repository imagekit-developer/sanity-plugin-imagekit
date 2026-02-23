import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { imagekitAssetSourcePlugin, imagekitSchemaPlugin } from 'sanity-plugin-imagekit'

export default defineConfig({
  name: 'default',
  title: 'Demo',

  projectId: 'wt36ytig',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), imagekitAssetSourcePlugin(), imagekitSchemaPlugin()],

  schema: {
    types: schemaTypes,
  },
})
