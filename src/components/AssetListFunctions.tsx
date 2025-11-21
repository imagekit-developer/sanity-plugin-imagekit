import React, {useCallback} from 'react'
import {Box, Button, Flex} from '@sanity/ui'
import {
  ArrayInputFunctionsProps,
  ArrayOfObjectsFunctions,
  ArraySchemaType,
  insert,
  ObjectSchemaType,
  PatchEvent,
  setIfMissing,
} from 'sanity'
import {openMediaSelector} from '../utils'
import {InsertHandlerParams} from '../types'
import {imagekitAssetSchema} from '../schema/imagekitAsset'

export const AssetListFunctions = (
  props: ArrayInputFunctionsProps<{_key: string}, ArraySchemaType>
) => {
  const {onValueCreate, onChange} = props

  const imagekitType = props.schemaType.of.find(
    (t: {name: string}) => t.name === imagekitAssetSchema.name
  ) as ObjectSchemaType | undefined

  if (!imagekitType) {
    throw new Error(`AssetListFunctions can only be used in array.of ${
      imagekitAssetSchema.name
    }, but it was array.of
    ${props.schemaType.of.map((t) => t.name)}`)
  }

  const handleSelect = useCallback(
    (selected: InsertHandlerParams) => {
      const items = selected.assets.map((asset) =>
        Object.assign(
          {},
          asset,
          {
            // Schema version. In case we ever change our schema.
            _version: 1,
          },
          onValueCreate(imagekitType as any) // onValueCreate is mistyped
        )
      )
      onChange(PatchEvent.from([setIfMissing([]), insert(items, 'after', [-1])]))
    },
    [onValueCreate, onChange, imagekitType]
  )

  const handleOpenSelector = useCallback(
    () =>
      openMediaSelector(
        true, // multi-selection
        handleSelect
      ),
    [handleSelect]
  )

  return (
    <Flex gap={2} flex={1}>
      <Box flex={1}>
        <ArrayOfObjectsFunctions {...props} />
      </Box>
      {imagekitType && (
        <Box flex={1}>
          <Button
            style={{width: '100%'}}
            disabled={props.readOnly}
            mode="bleed"
            text="Add multiple"
            onClick={handleOpenSelector}
          />
        </Box>
      )}
    </Flex>
  )
}
