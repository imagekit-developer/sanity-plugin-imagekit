import {ImagekitMediaLibraryWidget, MediaLibraryWidgetOptions} from 'imagekit-media-library-widget'
import {ImageKitAssetResponse, InsertHandlerParams} from './types'

// Helper function to pick only the fields that are needed from the ImageKit asset response
const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key]
    return acc
  }, {} as Pick<T, K>)
}

export const openMediaSelector = (
  multiple: boolean,
  insertHandler: (params: InsertHandlerParams) => void,
) => {
  // Create a full-screen modal container
  const modalContainer = document.createElement('div')
  modalContainer.style.position = 'fixed'
  modalContainer.style.top = '0'
  modalContainer.style.left = '0'
  modalContainer.style.width = '100vw'
  modalContainer.style.height = '100vh'
  modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
  modalContainer.style.zIndex = '9999'
  modalContainer.style.display = 'flex'
  modalContainer.style.alignItems = 'center'
  modalContainer.style.justifyContent = 'center'

  // Create the main modal wrapper with rounded corners
  const modalWrapper = document.createElement('div')
  modalWrapper.style.width = '90%'
  modalWrapper.style.height = '90%'
  modalWrapper.style.backgroundColor = 'white'
  modalWrapper.style.borderRadius = '12px'
  modalWrapper.style.overflow = 'hidden'
  modalWrapper.style.display = 'flex'
  modalWrapper.style.flexDirection = 'column'

  // Create theme detection and update function
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  
  const updateTheme = () => {
    const isDarkTheme = mediaQuery.matches
    
    // Update title bar colors
    titleBar.style.backgroundColor = isDarkTheme ? '#1a1a1a' : '#ffffff'
    titleBar.style.color = isDarkTheme ? '#ffffff' : '#000000'
    titleBar.style.borderBottom = '1px solid ' + (isDarkTheme ? '#333333' : '#e5e5e5')
    
    // Update close button colors
    closeButton.style.color = isDarkTheme ? '#ffffff' : '#000000'
    
    // Update media container colors
    mediaContainer.style.backgroundColor = isDarkTheme ? '#1a1a1a' : '#ffffff'
    
    // Update modal wrapper background
    modalWrapper.style.backgroundColor = isDarkTheme ? '#1a1a1a' : '#ffffff'
  }
  
  // Create title bar
  const titleBar = document.createElement('div')
  titleBar.style.display = 'flex'
  titleBar.style.justifyContent = 'space-between'
  titleBar.style.alignItems = 'center'
  titleBar.style.padding = '16px 20px'
  titleBar.style.flexShrink = '0'

  // Add title text
  const titleText = document.createElement('span')
  titleText.textContent = 'Select from ImageKit Media Library'
  titleText.style.fontSize = '16px'
  titleText.style.fontWeight = '500'
  titleText.style.fontFamily = 'system-ui, -apple-system, sans-serif'

  // Create close button
  const closeButton = document.createElement('button')
  closeButton.innerHTML = '×'
  closeButton.style.background = 'none'
  closeButton.style.border = 'none'
  closeButton.style.fontSize = '24px'
  closeButton.style.fontWeight = '300'
  closeButton.style.cursor = 'pointer'
  closeButton.style.padding = '0'
  closeButton.style.width = '32px'
  closeButton.style.height = '32px'
  closeButton.style.display = 'flex'
  closeButton.style.alignItems = 'center'
  closeButton.style.justifyContent = 'center'
  closeButton.style.borderRadius = '4px'
  closeButton.style.transition = 'background-color 0.2s ease'

  // Add hover effect for close button
  closeButton.addEventListener('mouseenter', () => {
    const isDarkTheme = mediaQuery.matches
    closeButton.style.backgroundColor = isDarkTheme ? '#333333' : '#f5f5f5'
  })
  closeButton.addEventListener('mouseleave', () => {
    closeButton.style.backgroundColor = 'transparent'
  })

  // Create the media library container
  const mediaContainer = document.createElement('div')
  mediaContainer.id = 'imagekit-media-container'
  mediaContainer.style.width = '100%'
  mediaContainer.style.height = '100%'
  mediaContainer.style.flex = '1'
  mediaContainer.style.overflow = 'hidden'
  
  // Set initial theme
  updateTheme()

  // Assemble the modal structure
  titleBar.appendChild(titleText)
  titleBar.appendChild(closeButton)
  modalWrapper.appendChild(titleBar)
  modalWrapper.appendChild(mediaContainer)
  modalContainer.appendChild(modalWrapper)
  document.body.appendChild(modalContainer)

  // Configure the media library widget
  const config: MediaLibraryWidgetOptions = {
    container: '#imagekit-media-container',
    className: 'media-library-widget',
    dimensions: {
      width: '100%',
      height: '100%',
    },
    view: 'inline',
    renderOpenButton: false,
    mlSettings: {
      multiple,
      toolbar: {
        showCloseButton: false,
      },
    },
  }

  // Sanitize the payload received from ImageKit to pick only the fields that are needed
  const sanitizedPayload = (payload: {eventType: string; data: ImageKitAssetResponse[]}) => {
    const fieldsToBePicked: (keyof ImageKitAssetResponse)[] = [
      'AITags',
      'createdAt',
      'customCoordinates',
      'customMetadata',
      'embeddedMetadata',
      'fileId',
      'filePath',
      'fileType',
      'hasAlpha',
      'height',
      'isPrivateFile',
      'isPublished',
      'mime',
      'name',
      'url',
      'width',
      'extensionStatus',
      'versionInfo',
      'createdBy',
      'permission',
      'previewUrl',
      'description',
    ]
    
    return {
      eventType: payload.eventType,
      data: payload.data.map((asset) => pick(asset, fieldsToBePicked))
    }
  }

  // Create callback for asset selection
  const callback = (payload: {eventType: string; data: ImageKitAssetResponse[]}) => {
    if (payload.eventType === 'INSERT' && payload.data && payload.data.length > 0) {
      // No asset transformation required
      // Just insert the assets as we receive them from ImageKit
      insertHandler({assets: payload.data})
      closeModal()
    }
  }

  // Create and open the widget
  const widget = new ImagekitMediaLibraryWidget(config, callback)
  widget.open()

  // Add listener to close the modal when the escape key is pressed
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal()
    }
  }
  
  // Add theme change listener
  const handleThemeChange = () => {
    updateTheme()
  }
  
  document.addEventListener('keydown', handleKeydown)
  mediaQuery.addEventListener('change', handleThemeChange)

  // Function to close the modal
  const closeModal = () => {
    widget.destroy()
    document.removeEventListener('keydown', handleKeydown)
    mediaQuery.removeEventListener('change', handleThemeChange)

    if (modalContainer.parentNode === document.body) {
      document.body.removeChild(modalContainer)
    }
  }

  // Add click listener to close button
  closeButton.addEventListener('click', closeModal)
}
