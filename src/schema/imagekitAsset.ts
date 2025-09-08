import ImagekitInput from '../components/ImagekitInput'
import AssetDiff from '../components/AssetDiff'
import AssetPreview from '../components/AssetPreview'
import {defineType} from 'sanity'

/** @public */
export const imagekitAssetSchema = defineType({
  type: 'object',
  name: 'imagekit.asset',
  fields: [
    {
      type: 'string',
      name: 'fileId',
    },
    {
      type: 'string',
      name: 'name',
    },
    {
      type: 'url',
      name: 'url',
    },
    {
      type: 'number',
      name: 'width',
    },
    {
      type: 'number',
      name: 'height',
    },
    {
      type: 'string',
      name: 'fileType',
    },
    {
      type: 'number',
      name: 'size',
    },
    {
      type: 'datetime',
      name: 'createdAt',
    },
    {
      type: 'string',
      name: 'filePath',
    },
    {
      type: 'url',
      name: 'thumbnail',
    },
    {
      type: 'string',
      name: 'mime',
    },
    {
      type: 'array',
      name: 'tags',
      of: [{type: 'string'}],
    },
    {
      type: 'object',
      name: 'customMetadata',
      fields: [
        {
          type: 'string',
          name: 'alt',
        },
      ],
    },
  ],
  ...({
    components: {
      input: ImagekitInput,
      diff: AssetDiff,
      preview: AssetPreview,
    },
  } as {}),
  preview: {
    select: {
      url: 'url',
      name: 'name',
      fileType: 'fileType',
      thumbnail: 'thumbnail',
    },
    prepare({url, name, fileType, thumbnail}) {
      return {
        title: name || url,
        value: {
          title: name || url,
          fileType,
          url: thumbnail || url,
        },
      }
    },
  },
})
