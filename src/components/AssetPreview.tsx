import React from 'react'
import {Box, Card, Flex, Text} from '@sanity/ui'
import {DocumentIcon} from '@sanity/icons'
import {ImageKitAsset} from '../types'
import VideoPlayer from './VideoPlayer'

interface AssetPreviewProps {
  value?: ImageKitAsset
}

const AssetPreview = ({value}: AssetPreviewProps) => {
  if (!value) {
    return (
      <Card padding={4} radius={2} shadow={1} tone="default">
        <Text align="center" size={1} muted>
          No asset selected
        </Text>
      </Card>
    )
  }

  let assetType: 'image' | 'video' | 'raw' = 'raw'
  if (value.fileType === 'image') {
    assetType = 'image'
  } else if (value.mime?.startsWith('video')) {
    assetType = 'video'
  }

  switch (assetType) {
    case 'video':
      return (
        <Flex
          align="center"
          style={{
            maxWidth: '100%',
          }}
        >
          <VideoPlayer src={value.url} kind="player" thumbnail={value.thumbnail} />
        </Flex>
      )
    case 'raw':
      return (
        <Flex align="center">
          <DocumentIcon />
          <Text size={1} style={{marginLeft: '0.5em'}}>
            {value.name}
          </Text>
        </Flex>
      )
    default:
      // All other assets are considered images
      return (
        <Flex align="center">
          <img
            alt="preview"
            src={value.thumbnail || value.url}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Flex>
      )
  }

  // return (
  //   <Card padding={3} radius={2} shadow={1} tone="default">
  //     <Box style={{textAlign: 'center'}}>
  //       <Icon style={{fontSize: '2rem', marginBottom: '0.5rem'}} />
  //       <Text size={1} weight="semibold">
  //         {value.name}
  //       </Text>
  //       <Text size={0} muted>
  //         {value.width} × {value.height} • {value.fileType}
  //       </Text>
  //     </Box>
  //   </Card>
  // )
}

export default AssetPreview
