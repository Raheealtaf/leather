// components/product/ProductGallery.tsx
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  RefreshCcw,
  Check,
  ShoppingBag,
  Zap,
  ArrowRight,
  ChevronDown,
  Share2,
} from "lucide-react";
import { useCart } from "../context/CartContext";

type ProductProps = {
  product: {
    id: number;
    name: string;
    price: string | number;
    description: string;
    images: string[];
    sizes: string[];
    category: string;
  };
  relatedProducts?: {
    id: number;
    name: string;
    price: number;
    images: string;
    category: { name: string };
  }[];
};

const PLACEHOLDER_IMG =
  "https://placehold.co/600x800/e2e8f0/64748b?text=No+Image";

export default function ProductGallery({
  product,
  relatedProducts = [],
}: ProductProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  // State
  const [activeImage, setActiveImage] = useState(
    product.images[0] || PLACEHOLDER_IMG,
  );
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [isAdded, setIsAdded] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  // New States for upgraded functionality
  const [activeAccordion, setActiveAccordion] = useState<string | null>(
    "description",
  );
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const getNumericPrice = () => {
    if (typeof product.price === "number") return product.price;
    return parseFloat(product.price.replace(/,/g, ""));
  };

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0) {
      alert("Please select a size first.");
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: getNumericPrice(),
      image: product.images[0] || PLACEHOLDER_IMG,
      category: product.category,
      quantity: 1,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize && product.sizes.length > 0) {
      alert("Please select a size first.");
      return;
    }
    setIsBuyingNow(true);
    addToCart({
      id: product.id,
      name: product.name,
      price: getNumericPrice(),
      image: product.images[0] || PLACEHOLDER_IMG,
      category: product.category,
      quantity: 1,
    });
    router.push("/checkout");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // --- NEW: Image Zoom Logic ---
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* LEFT SIDE: Upgraded Image Gallery */}
          <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6 lg:sticky lg:top-8 h-fit">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible py-2 lg:py-0 w-full lg:w-24 shrink-0 no-scrollbar">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onMouseEnter={() => setActiveImage(image)} // Changes image on hover for desktop speed
                  onClick={() => setActiveImage(image)}
                  className={`relative aspect-square w-20 lg:w-full rounded-xl overflow-hidden transition-all duration-300 ${
                    activeImage === image
                      ? "ring-2 ring-amber-500 ring-offset-2 opacity-100 scale-105"
                      : "opacity-50 hover:opacity-100 hover:scale-105 border border-slate-200"
                  }`}
                >
                  <img
                    src={image || PLACEHOLDER_IMG}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover" // Automatically crops image perfectly
                  />
                </button>
              ))}
            </div>

            {/* Main Image with Zoom Feature */}
            <div
              ref={imageRef}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
              className="w-full aspect-square sm:aspect-[4/5] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 relative cursor-crosshair group"
            >
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full transition-transform duration-200"
                style={{
                  // Automatically fits the image perfectly without stretching
                  objectFit: "cover",
                  // The Magnifier Magic!
                  transform: isZooming ? "scale(2)" : "scale(1)",
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }}
              />
            </div>
          </div>

          {/* RIGHT SIDE: Product Details */}
          <div className="mt-10 px-4 sm:px-0 lg:mt-0 flex flex-col h-full">
            <div>
              <div className="flex justify-between items-start">
                <h2 className="text-sm font-bold text-amber-600 tracking-widest uppercase mb-2">
                  {product.category}
                </h2>
                <button
                  onClick={handleShare}
                  className="text-slate-400 hover:text-amber-600 transition-colors p-2 rounded-full hover:bg-slate-50"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>
              <div className="mt-4 flex items-baseline gap-2">
                <p className="text-3xl font-extrabold text-slate-900">
                  Rs {getNumericPrice().toLocaleString()}
                </p>
                <span className="text-sm text-slate-500 font-medium">
                  Tax included.
                </span>
              </div>
            </div>

            {/* Upgraded Accordion Section */}
            <div className="mt-8 border-t border-slate-100">
              <div className="border-b border-slate-100">
                <button
                  onClick={() =>
                    setActiveAccordion(
                      activeAccordion === "description" ? null : "description",
                    )
                  }
                  className="flex justify-between items-center w-full py-4 text-left font-bold text-slate-900 hover:text-amber-600 transition-colors"
                >
                  Product Details
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${activeAccordion === "description" ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${activeAccordion === "description" ? "max-h-96 pb-4" : "max-h-0"}`}
                >
                  <p className="text-base text-slate-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="border-b border-slate-100">
                <button
                  onClick={() =>
                    setActiveAccordion(
                      activeAccordion === "shipping" ? null : "shipping",
                    )
                  }
                  className="flex justify-between items-center w-full py-4 text-left font-bold text-slate-900 hover:text-amber-600 transition-colors"
                >
                  Shipping & Returns
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${activeAccordion === "shipping" ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${activeAccordion === "shipping" ? "max-h-96 pb-4" : "max-h-0"}`}
                >
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Free shipping on orders over Rs 10,000. All orders are
                    processed within 1-2 business days. We accept returns within
                    7 days of delivery for a full refund or exchange.
                  </p>
                </div>
              </div>
            </div>

            {/* Size Selector */}
            {product.sizes.length > 0 && product.sizes[0] !== "" && (
              <div className="mt-8 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Select Size
                  </h3>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        flex items-center justify-center py-3 px-4 text-sm font-bold uppercase rounded-xl border-2 transition-all duration-200
                        ${
                          selectedSize === size
                            ? "bg-slate-900 border-slate-900 text-white shadow-md transform scale-105"
                            : "bg-white border-slate-200 text-slate-900 hover:border-slate-400 hover:shadow-sm"
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* THE NEW DUAL BUTTON SYSTEM */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={isAdded || isBuyingNow}
                className={`flex-1 font-bold py-4 px-8 rounded-xl shadow-sm transition-all duration-300 flex items-center justify-center gap-2 border-2
                  ${
                    isAdded
                      ? "bg-green-50 border-green-500 text-green-600"
                      : "bg-white border-slate-900 text-slate-900 hover:bg-slate-50 hover:-translate-y-1 hover:shadow-md"
                  }
                `}
              >
                {isAdded ? (
                  <>
                    <Check className="h-5 w-5" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5" /> Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isBuyingNow}
                className="flex-1 font-extrabold py-4 px-8 rounded-xl shadow-lg shadow-amber-500/30 bg-amber-500 hover:bg-amber-400 text-slate-900 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 relative overflow-hidden"
              >
                {/* Subtle shine effect on the Buy button */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent hover:animate-[shimmer_1.5s_infinite]" />

                {isBuyingNow ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <>
                    <Zap className="h-5 w-5 fill-current" /> Buy It Now
                  </>
                )}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 grid grid-cols-2 gap-y-6 gap-x-4 border-t border-slate-100 pt-8 mt-auto">
              <div className="flex items-center gap-3 text-slate-700">
                <Truck className="h-6 w-6 text-slate-400" />
                <span className="text-sm font-bold">Free Delivery</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <RefreshCcw className="h-6 w-6 text-slate-400" />
                <span className="text-sm font-bold">7-Day Returns</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <ShieldCheck className="h-6 w-6 text-slate-400" />
                <span className="text-sm font-bold">100% Genuine</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <Check className="h-6 w-6 text-slate-400" />
                <span className="text-sm font-bold">Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS SECTION */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-slate-100 bg-slate-50 py-20 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                You May Also Like
              </h2>
              <Link
                href="/shop"
                className="text-amber-600 hover:text-amber-500 font-bold flex items-center hidden sm:flex uppercase tracking-wide text-sm"
              >
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {relatedProducts.map((relatedItem) => {
                const firstImage = relatedItem.images
                  ? relatedItem.images.split(",")[0]
                  : PLACEHOLDER_IMG;

                return (
                  <Link
                    key={relatedItem.id}
                    href={`/product/${relatedItem.id}`}
                    className="group flex flex-col"
                  >
                    <div className="relative aspect-[4/5] mb-4 rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100">
                      <img
                        src={firstImage}
                        alt={relatedItem.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="px-1">
                      <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-1">
                        {relatedItem.category.name}
                      </p>
                      <h3 className="text-base font-bold text-slate-900 leading-tight mb-1 group-hover:text-amber-600 transition-colors line-clamp-1">
                        {relatedItem.name}
                      </h3>
                      <p className="text-amber-600 font-extrabold">
                        Rs {relatedItem.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
