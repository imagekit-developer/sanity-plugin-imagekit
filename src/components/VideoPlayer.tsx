import React, {CSSProperties} from 'react'

type PlayerKind = 'player' | 'diff'

export type VideoPlayerProps = {
  src: string
  // eslint-disable-next-line react/no-unused-prop-types
  kind: PlayerKind
  thumbnail?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
}

export default function VideoPlayer(props: VideoPlayerProps) {
  const {src, thumbnail, autoPlay = false, loop = false, muted = false, controls = true} = props

  const style: CSSProperties = {
    width: '100%',
    height: 'auto',
  }

  return (
    <video style={style} poster={thumbnail} autoPlay={autoPlay} loop={loop} muted={muted} controls={controls}>
      <source src={src} type="video/mp4" />
    </video>
  )
}
