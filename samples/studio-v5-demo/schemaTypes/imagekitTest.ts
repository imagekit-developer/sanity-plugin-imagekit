import {defineType, defineField} from 'sanity'

export const imagekitTest = defineType({
  name: 'imagekitTest',
  title: 'ImageKit Demo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'imagekitImage',
      title: 'ImageKit Image',
      type: 'image',
    }),
    defineField({
      name: 'imagekitImageArray',
      title: 'ImageKit Image Array',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'imagekitImageAssetArray',
      title: 'ImageKit Image Asset Array',
      type: 'array',
      of: [{type: 'imagekit.asset'}],
    }),
    defineField({
      name: 'imagekitImageAsset',
      title: 'ImageKit Image Asset',
      type: 'imagekit.asset',
    }),
    defineField({
      name: 'imagekitVideoAsset',
      title: 'ImageKit Video Asset',
      type: 'imagekit.asset',
    }),
    defineField({
      name: 'imagekitRawAsset',
      title: 'ImageKit Raw Asset',
      type: 'imagekit.asset',
    }),
    defineField({
      name: 'imagekitAssetEmptyState',
      title: 'ImageKit Asset Empty State',
      type: 'imagekit.asset',
    }),
  ],
})
