"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductInfo from "@/components/ProductInfo";

// Dynamically import Product3DViewer with SSR disabled
const Product3DViewer = dynamic(
  () => import("@/components/Product3DViewer.client"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading 3D Viewer...</p>
        </div>
      </div>
    )
  }
);

interface Product {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  modelPath: string;
  specifications?: {
    material?: string;
    dimensions?: string;
    weight?: string;
    color?: string;
    [key: string]: string | undefined;
  };
  features?: string[];
}

export default function ProductPage() {
  const params = useParams();
  const productId = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/products/${productId}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E22028] mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading product...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <p className="text-red-600 text-xl mb-2">Error loading product</p>
            <p className="text-gray-600">{error || "Product not found"}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Product Layout: 3D Viewer on Left, Info on Right */}
        <div className="flex flex-col lg:flex-row h-screen">
          {/* 3D Viewer - Left Side */}
          <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative">
            <Product3DViewer modelPath={product.modelPath} />
          </div>

          {/* Product Info - Right Side */}
          <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen overflow-y-auto">
            <ProductInfo
              title={product.title}
              subtitle={product.subtitle}
              description={product.description}
              price={product.price}
              specifications={product.specifications}
              features={product.features}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

