/** @public */
export interface ImageKitAssetResponse {
  AITags: {
    name: string
    confidence: number
    source: 'google-auto-tagging' | 'aws-auto-tagging'
  }[] | null
  createdAt: string
  customCoordinates: string | null
  customMetadata: {
    [key: string]:
    | string
    | number
    | boolean
    | Array<string | number | boolean>
  }
  embeddedMetadata: {
    [key: string]:
    | string
    | number
    | boolean
    | Date
    | Array<string | number | boolean | Date>
  }
  fileId: string
  filePath: string
  fileType: string
  hasAlpha: boolean
  height: number
  isPrivateFile: boolean
  isPublished: boolean
  mime?: string
  name: string
  size: number
  tags: string[] | null
  thumbnail: string
  type: string
  updatedAt: string
  url: string
  width: number
  extensionStatus?: {
    [key: string]: 'success' | 'pending' | 'failed'
  }
  versionInfo: {
    id: string
    name: string
  }
  createdBy?: {
    userId: string
    name: string
    email: string
  }
  permission?: {
    READ: boolean
    CONTRIBUTE: boolean
    MANAGE: boolean
  }
  previewUrl?: string
  description?: string
}

/** @public */
export interface ImageKitAsset extends ImageKitAssetResponse {
  _type: string
  _key?: string
  _version: number
}

export interface InsertHandlerParams {
  assets: ImageKitAssetResponse[]
}

export interface ImageKitMediaLibrary {
  show: (config?: {asset: any; folder: any}) => void
  hide: () => void
  destroy: () => void
}

declare global {
  interface Window {
    ImagekitMediaLibraryWidget: any
  }
}

export interface MLCallbackPayload {
  eventType: string
  data: ImageKitAssetResponse[]
}
