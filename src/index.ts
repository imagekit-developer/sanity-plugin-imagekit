import {imagekitAssetSchema} from './schema/imagekitAsset'
import {
  definePlugin,
  AssetSource,
  ArrayOfObjectsInputProps,
  isArrayOfObjectsSchemaType,
} from 'sanity'
import {ImagekitIcon} from './components/ImagekitIcon'
import ImagekitAssetSource from './components/ImagekitAssetSource'
import {AssetListFunctions} from './components/AssetListFunctions'

export {type ImageKitAsset, type ImageKitAssetResponse} from './types'
export {imagekitAssetSchema}

/** @public */
export const imagekitSchemaPlugin = definePlugin({
  name: 'imagekit-schema',
  form: {
    components: {
      input: (props) => {
        const {schemaType} = props
        if (isArrayOfObjectsSchemaType(schemaType)) {
          const arrayProps = props as ArrayOfObjectsInputProps
          const imagekitType = arrayProps.schemaType.of.find(
            (t: {name: string}) => t.name === imagekitAssetSchema.name
          )
          if (imagekitType) {
            return arrayProps.renderDefault({...arrayProps, arrayFunctions: AssetListFunctions})
          }
        }
        return props.renderDefault(props)
      },
    },
  },
  schema: {
    types: [
      imagekitAssetSchema,
    ],
  },
})

/** @public */
export const imagekitImageSource: AssetSource = {
  name: 'imagekit-image',
  title: 'ImageKit',
  icon: ImagekitIcon,
  component: ImagekitAssetSource,
}

/** @public */
export const imagekitAssetSourcePlugin = definePlugin({
  name: 'imagekit-asset-source',
  form: {
    image: {
      assetSources: [imagekitImageSource],
    },
  },
})
