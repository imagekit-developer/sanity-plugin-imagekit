import React, {useCallback} from 'react'
import WidgetInput from './WidgetInput'
import {nanoid} from 'nanoid'
import {ObjectInputProps, PatchEvent, set} from 'sanity'
import {ImageKitAsset} from '../types'
import {InsertHandlerParams} from '../types'
import {openMediaSelector} from '../utils'

const ImagekitInput = (props: ObjectInputProps) => {
  const {onChange, schemaType: type} = props
  const value = (props.value as ImageKitAsset) || undefined

  const handleSelect = useCallback(
    (payload: InsertHandlerParams) => {
      const [asset] = payload.assets

      if (!asset) {
        return
      }

      onChange(
        PatchEvent.from([
          set(
            Object.assign(
              {
                _type: type.name,
                _version: 1,
                ...(value?._key ? {_key: value._key} : {_key: nanoid()}),
              },
              asset
            )
          ),
        ])
      )
    },
    [onChange, type, value?._key]
  )

  const action = () =>
    openMediaSelector(
      false, // single selection
      handleSelect,
    )

  return (
    <WidgetInput openMediaSelector={action} {...props} />
  )
}

export default ImagekitInput
