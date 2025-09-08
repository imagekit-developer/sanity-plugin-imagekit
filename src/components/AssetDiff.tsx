import React from 'react'
import {DiffFromTo} from 'sanity'
import {ImageKitAsset} from '../types'

type Props = {
  value: ImageKitAsset | undefined
}

const ImagekitDiffPreview = ({value}: Props) => {
  if (!value) {
    return null
  }

  const url = value.url

  if (value.fileType === 'video' && url) {
    return (
      <section
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <video controls style={{maxWidth: '100%', height: 'auto'}}>
          <source src={url} type={value.mime} />
          Your browser does not support the video tag.
        </video>
      </section>
    )
  }

  return <img alt="preview" src={url} style={{maxWidth: '100%', height: 'auto'}} />
}

type DiffProps = {
  diff: any
  schemaType: any
}

const AssetDiff = ({diff, schemaType}: DiffProps) => {
  return <DiffFromTo diff={diff} schemaType={schemaType} previewComponent={ImagekitDiffPreview} />
}

export default AssetDiff
