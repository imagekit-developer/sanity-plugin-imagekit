[<img width="250" alt="ImageKit.io" src="https://raw.githubusercontent.com/imagekit-developer/imagekit-javascript/master/assets/imagekit-light-logo.svg"/>](https://imagekit.io)

# Sanity Plugin for ImageKit.io

[![npm version](https://img.shields.io/npm/v/sanity-plugin-imagekit)](https://www.npmjs.com/package/sanity-plugin-imagekit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Twitter Follow](https://img.shields.io/twitter/follow/imagekitio?label=Follow&style=social)](https://twitter.com/ImagekitIo)

A Sanity Studio plugin that provides seamless integration with [ImageKit.io](https://imagekit.io/), enabling you to browse, manage, and deliver optimized media directly from your Sanity Studio.

ImageKit is a complete media storage, optimization, and transformation solution with an image and video CDN. It integrates with your existing infrastructure (AWS S3, web servers, CDN, custom domains) to deliver optimized images in minutes with minimal code changes.

## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Usage](#usage)
6. [How It Works](#how-it-works)
7. [Asset Data Structure](#asset-data-structure)
8. [Advanced Topics](#advanced-topics)
9. [Contributing](#contributing)
10. [License](#license)
11. [Support](#support)

## Features

- **Media Library Integration**: Browse and manage your ImageKit media library directly in Sanity Studio
- **Asset Source Integration**: Integrates seamlessly with Sanity's image fields
- **Custom Schema Support**: Provides `imagekit.asset` schema type for custom configurations
- **Full-Width Dialog**: Opens ImageKit media library in a full-screen modal dialog
- **Rich Asset Data**: Access complete asset metadata including dimensions, file size, and more.
- **TypeScript Support**: Full type safety with proper interfaces
- **No Configuration Required**: Works out of the box without additional configuration
- **Video Support**: Browse and select both images and video content from ImageKit
- **Asset Preview**: View thumbnails and asset information before selection

## Prerequisites

Before you begin, you need:

- A Sanity Studio project (v3 or later)
- Node.js and npm/yarn installed
- An [ImageKit account](https://imagekit.io/registration/) (sign up if you don't have one)
- ImageKit API credentials (Public Key, Private Key, and URL Endpoint)

You can refer to Sanity's [official documentation](https://www.sanity.io/docs) to understand the prerequisites for setting up your Sanity Studio instance.

## Installation

To install the ImageKit plugin in your Sanity Studio, run one of the following commands from your project's root directory:

```bash
# Using npm
npm install sanity-plugin-imagekit

# Using yarn
yarn add sanity-plugin-imagekit

# Using pnpm
pnpm install sanity-plugin-imagekit
```

## Configuration

### Step 1: Add the Plugin to Your Sanity Config

```typescript
// sanity.config.ts
import { defineConfig } from 'sanity'
import { imagekitAssetSourcePlugin } from 'sanity-plugin-imagekit'

export default defineConfig({
  projectId: 'your-project-id',
  dataset: 'production',
  // ... other configuration
  plugins: [
    imagekitAssetSourcePlugin(),
  ],
})
```

The plugin will now be available as an asset source for image fields in your Sanity Studio.

## Usage

### Using ImageKit with Image Fields

ImageKit can be used as an asset source for regular Sanity image fields. When you add an image field to your schema, ImageKit will automatically appear as an option in the asset source dropdown.

#### Option 1: Using Regular Image Fields

For most use cases, simply use the standard Sanity image field:

```typescript
{
  type: "image",
  name: "heroImage",
  title: "Hero Image",
  // ImageKit will appear as an option in the asset source dropdown
}
```

**How to use:**
1. Click on the image field in your document
2. Select "ImageKit" from the asset source dropdown
3. Browse your ImageKit media library
4. Select the image you want to use

#### Option 2: Using Custom ImageKit Asset Type

For more control, use the custom `imagekit.asset` schema type:

```typescript
import { imagekitSchemaPlugin } from 'sanity-plugin-imagekit'

// Add to plugins array
plugins: [imagekitSchemaPlugin()]

// Use in schema
{
  type: "imagekit.asset",
  name: "imagekitImage",
  title: "ImageKit Image",
  description: "Select an image from your ImageKit media library"
}
```

This custom type stores comprehensive asset metadata from ImageKit, allowing you to access detailed information about each asset in your content.

## How It Works

The plugin provides a seamless workflow for selecting and managing ImageKit assets:

1. **Access Asset Source**: Click on an image field in your Sanity document
2. **Select ImageKit**: Choose "ImageKit" from the asset source dropdown menu
3. **Browse Media Library**: A full-screen dialog opens displaying your ImageKit media library
4. **Search and Filter**: Use ImageKit's search functionality to find specific assets
5. **Select Asset**: Click on an image or video to select it
6. **Confirm Selection**: The asset is automatically added to your document with all relevant metadata

The plugin maintains a direct connection to your ImageKit account, ensuring you always have access to your latest media assets without the need for manual syncing or imports.

## Asset Data Structure

When you select an image from ImageKit, it's stored with the following comprehensive metadata:

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
  "mime": "image/jpeg",
  // other fields
}
```

NOTE: Since Sanity Studio expects object keys to be matching the regex `/^\$?[a-zA-Z0-9_-]+$/` and ImageKit's Custom Metadata allows characters outside of this set, this plugin sanitizes the keys to replace non-supported characters with underscore i.e. `_`.

## Advanced Topics

### Working with Asset URLs

The stored `url` field provides a direct link to your asset on the ImageKit CDN. You can use this URL directly in your frontend, or apply ImageKit's real-time transformation URLs for optimization:

```typescript
// Direct URL
const directUrl = asset.url;

// With transformation (example: resize to 300px width)
const transformedUrl = `${asset.url}?tr=w-300`;
```

### Accessing Asset Metadata in Your Frontend

When querying your Sanity documents, the asset data is available for use:

```typescript
// Example query
const query = `*[_type == "article"][0] { heroImage { url, width, height } }`;

// Result
{
  "heroImage": {
    "url": "https://ik.imagekit.io/your_account/image.jpg",
    "width": 1920,
    "height": 1080
  }
}
```

### Custom Metadata

ImageKit's custom metadata feature allows you to store additional information with your assets. This data is accessible through the plugin:

```json
{
  "customMetadata": {
    "alt": "Hero image for homepage",
    "photographer": "John Doe",
    "license": "CC0"
  }
}
```
## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) before submitting pull requests.

## License

MIT - see the [LICENSE](LICENSE) file for details.

## Support

For support, please:
- Open an issue in the [GitHub repository](https://github.com/imagekit-developer/sanity-plugin-imagekit)
- Contact [ImageKit Support](https://imagekit.io/dashboard/support/)
- Visit [ImageKit Documentation](https://imagekit.io/docs/)
