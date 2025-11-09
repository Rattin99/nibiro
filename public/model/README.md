# 3D Models Directory

This directory contains 3D model files for product pages.

## Supported Formats

- **GLTF** (.gltf) - Recommended format
- **GLB** (.glb) - Binary GLTF format, also recommended

## File Naming

Place your 3D model files in this directory. The API route references models using the path `/model/[filename]`.

For example:
- `dummy-model.glb` → accessible at `/model/dummy-model.glb`
- `product-1.gltf` → accessible at `/model/product-1.gltf`

## Adding Models

1. Export your 3D model in GLTF or GLB format
2. Place the file in this directory
3. Update the `modelPath` in the API route (`/api/products/[id]/route.ts`) to match your filename

## Notes

- Models should be optimized for web use (reasonable file size)
- The 3D viewer component (`Product3DViewer.tsx`) handles loading and error states
- If a model fails to load, an error message will be displayed to the user

