import React, {useCallback} from 'react'
import {ObjectInputProps, PatchEvent, unset} from 'sanity'
import {Button, Flex, Grid, Stack} from '@sanity/ui'
import AssetPreview from './AssetPreview'
import {ImageKitAsset} from '../types'

type WidgetInputProps = ObjectInputProps & {openMediaSelector: () => void}

const WidgetInput = (props: WidgetInputProps) => {
  const {onChange, readOnly, value, openMediaSelector} = props

  const removeValue = useCallback(() => {
    onChange(PatchEvent.from([unset()]))
  }, [onChange])

  return (
    <Stack>
      <Flex style={{textAlign: 'center', width: '100%'}} marginBottom={2}>
        <AssetPreview value={value as ImageKitAsset} />
      </Flex>

      <Grid gap={1} style={{gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))'}}>
        <Button
          disabled={readOnly}
          mode="ghost"
          title="Select an asset"
          tone="default"
          onClick={openMediaSelector}
          text="Select…"
        />
        <Button
          disabled={readOnly || !value}
          tone="critical"
          mode="ghost"
          title="Remove asset"
          text="Remove"
          onClick={removeValue}
        />
      </Grid>
    </Stack>
  )
}

export default WidgetInput
