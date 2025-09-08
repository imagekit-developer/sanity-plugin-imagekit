# Sanity Plugin ImageKit

A Sanity Studio plugin that integrates ImageKit's media library for seamless asset management.

## Features

- **Full-Width Dialog**: Opens ImageKit media library in a full-screen modal dialog
- **No Configuration Required**: Works out of the box without any additional configuration
- **TypeScript Support**: Full type safety with proper interfaces
- **Asset Source Integration**: Integrates with Sanity's image fields
- **Custom Schema Support**: Provides `imagekit.asset` schema type

## Installation

```bash
npm install sanity-plugin-imagekit
```

## Usage

### 1. Add to Sanity Config

```typescript
// sanity.config.ts
import {defineConfig} from 'sanity'
import {imagekitAssetSourcePlugin} from 'sanity-plugin-imagekit'

export default defineConfig({
  // ... other config
  plugins: [
    imagekitAssetSourcePlugin(),
  ],
})
```

### 2. Use in Schemas

For custom asset types:
```typescript
import {imagekitSchemaPlugin} from 'sanity-plugin-imagekit'

// Add to plugins array
plugins: [imagekitSchemaPlugin()]

// Use in schema
{
  type: "imagekit.asset",
  name: "imagekitImage",
  title: "ImageKit Image"
}
```

For regular image fields:
```typescript
{
  type: "image",
  name: "regularImage",
  title: "Image"
  // ImageKit will appear as an option in the asset source dropdown
}
```

## How It Works

1. **Click Image Field**: In any image field in your Sanity document
2. **Select ImageKit**: Choose "ImageKit" from the asset source dropdown
3. **Browse Media**: A full-screen dialog opens with the ImageKit media library
4. **Select Image**: Choose your image and it gets added to your document

## Asset Data Structure

ImageKit assets are stored with this structure:

```json
{
  "_type": "imagekit.asset",
  "fileId": "unique_file_id",
  "name": "image_name.jpg",
  "url": "https://ik.imagekit.io/your_account/image.jpg",
  "width": 1920,
  "height": 1080,
  "fileType": "image",
  "size": 245760,
  "createdAt": "2024-01-01T00:00:00Z",
  "filePath": "/folder/image.jpg",
  "thumbnail": "https://ik.imagekit.io/your_account/tr:w-300/image.jpg",
  "mime": "image/jpeg",
  "tags": ["tag1", "tag2"],
  "customMetadata": {
    "alt": "Alternative text"
  }
}
```

## Dependencies

- `imagekit-media-library-widget`: ^2.1.1
- `@imagekit/react`: ^5.0.1

## License

MIT
