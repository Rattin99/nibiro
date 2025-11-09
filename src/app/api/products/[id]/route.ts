import { NextRequest, NextResponse } from 'next/server';

// Dummy product data - replace with actual API call later
const dummyProducts: Record<string, any> = {
  '1': {
    id: 1,
    title: 'Custom 3D Printed Sculpture',
    subtitle: 'Premium Quality Art Piece',
    description: 'Transform your memories into a stunning 3D printed masterpiece. This custom sculpture is crafted with precision and attention to detail, bringing your vision to life in three dimensions.',
    price: '$149.99',
    modelPath: '/model/dummy-model.glb',
    specifications: {
      material: 'Premium PLA',
      dimensions: '10" x 8" x 6"',
      weight: '500g',
      color: 'Customizable'
    },
    features: [
      'High-resolution 3D printing',
      'Customizable design',
      'Durable material',
      'Ready to display'
    ]
  },
  '2': {
    id: 2,
    title: 'Personalized Memory Keepsake',
    subtitle: 'Cherish Your Moments',
    description: 'A beautiful 3D printed keepsake that captures your most precious memories. Perfect for gifting or displaying in your home.',
    price: '$129.99',
    modelPath: '/model/dummy-model.glb',
    specifications: {
      material: 'Premium PLA',
      dimensions: '8" x 6" x 5"',
      weight: '400g',
      color: 'Customizable'
    },
    features: [
      'Personalized design',
      'High-quality finish',
      'Lightweight and durable',
      'Perfect for gifting'
    ]
  }
};

// Default product for any ID not in the dummy data
const defaultProduct = {
  id: 0,
  title: 'Custom 3D Printed Product',
  subtitle: 'Premium Quality Art Piece',
  description: 'Transform your memories into a stunning 3D printed masterpiece. This custom product is crafted with precision and attention to detail.',
  price: '$99.99',
  modelPath: '/model/dummy-model.glb',
  specifications: {
    material: 'Premium PLA',
    dimensions: '10" x 8" x 6"',
    weight: '500g',
    color: 'Customizable'
  },
  features: [
    'High-resolution 3D printing',
    'Customizable design',
    'Durable material',
    'Ready to display'
  ]
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Return dummy product data or default
    const product = dummyProducts[id] || { ...defaultProduct, id: parseInt(id) || 0 };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

