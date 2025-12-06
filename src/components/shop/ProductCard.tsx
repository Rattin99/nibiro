import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative bg-white border-2 border-black rounded-xl overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 transform hover:-translate-y-1 block"
    >
      {/* Lego-like stud decoration on top */}
      <div className="absolute top-2 left-2 flex gap-1 z-10">
        <div className="w-2 h-2 rounded-full bg-neutral-200 border border-neutral-400"></div>
        <div className="w-2 h-2 rounded-full bg-neutral-200 border border-neutral-400"></div>
      </div>

      <div className="relative aspect-square w-full bg-neutral-100 p-6 flex items-center justify-center overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-110"
        />

        {/* Category Tag */}
        <span className="absolute bottom-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
          {product.category}
        </span>
      </div>

      <div className="p-4  flex flex-col gap-2 border-t-2 border-black">
        <div className="flex justify-between items-start">
          <h3 className="text-gray-800 font-bold text-lg leading-tight line-clamp-2 font-montserrat">
            {product.name}
          </h3>
          <span className="font-bold text-lg text-blue-600">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-neutral-600 line-clamp-2">
          {product.description}
        </p>

        <button className="mt-2 w-full bg-red-500 text-white font-bold py-2 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:shadow-none transition-all duration-150">
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
