# Merge Layers NFT Generation Script
### This script generates NFT images by compositing multiple layers from separate image files.

⚠️ **Warning: This Version Supports Single Image Output Only** ⚠️

This script currently only supports generating a single image. We are actively working on an update to enable processing multiple images/layers simultaneously.

## Installation
1. Clone this repository.
2. Install dependencies with `npm install`.

## Usage
1. In the `layers` directory, create subdirectories for your layers in the order you want them to be composed. 
2. For example, `layers/layer0` should hold the background images or the first layer to be composited.
3. Then `layers/layer1` should hold the second layer to be composited, and so on.
4. Finally, run the script with `npm start` and the generated NFTs will be saved in the `output` directory.
