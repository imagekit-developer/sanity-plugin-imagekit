import React, {useCallback} from 'react'
import {AssetSourceComponentProps} from 'sanity'
import {InsertHandlerParams} from '../types'
import {openMediaSelector} from '../utils'

const ImagekitAssetSource = (props: AssetSourceComponentProps) => {
  const {onSelect, onClose} = props

  const handleSelect = useCallback(
    (payload: InsertHandlerParams) => {
      const [asset] = payload.assets

      if (!asset) {
        return
      }

      // Transform the asset to match Sanity's expected format
      const sanityAsset = {
        kind: 'url' as const,
        value: asset.url
      }

      onSelect([sanityAsset])
      onClose()
    },
    [onSelect, onClose]
  )

  const handleOpen = useCallback(() => {
    openMediaSelector(false, handleSelect)
  }, [handleSelect])

  // Auto-open the media selector when the component mounts
  React.useEffect(() => {
    handleOpen()
  }, [handleOpen])

  return null // This component doesn't render anything visible
}

export default ImagekitAssetSource
