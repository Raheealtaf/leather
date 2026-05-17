// components/admin/ProductForm.tsx
"use client";

import { useState } from "react";
import { createProduct, updateProduct } from "@/app/actions/product";
import { useFormStatus } from "react-dom";
import {
  Package,
  DollarSign,
  Image as ImageIcon,
  Tag,
  CheckCircle2,
  UploadCloud,
  Loader2,
  X,
} from "lucide-react";

// Upgraded Submit Button
function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full flex justify-center py-4 border border-transparent rounded-xl shadow-sm text-base font-bold text-white transition-all
        ${pending ? "bg-slate-400 cursor-not-allowed" : "bg-slate-900 hover:bg-slate-800 transform hover:-translate-y-1"}
      `}
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <Loader2 className="animate-spin h-5 w-5 text-white" />
          Saving to Database...
        </span>
      ) : isEditing ? (
        "Update Product"
      ) : (
        "Publish Product"
      )}
    </button>
  );
}

export default function ProductForm({
  categories,
  initialData,
}: {
  categories: { id: number; name: string }[];
  initialData?: any;
}) {
  const isEditing = !!initialData;

  // 1. Image Upload States
  const [imageUrls, setImageUrls] = useState<string[]>(
    initialData?.images ? initialData.images.split(",") : [],
  );
  const [isUploading, setIsUploading] = useState(false);

  // 2. NEW: Dynamic Category States
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    initialData?.categoryId?.toString() || "",
  );

  const [attributes, setAttributes] = useState<Record<string, string>>(() => {
    if (initialData?.attributes) {
      return typeof initialData.attributes === "string"
        ? JSON.parse(initialData.attributes)
        : initialData.attributes;
    }
    return {};
  });

  const formAction = isEditing
    ? updateProduct.bind(null, initialData.id)
    : createProduct;

  // 3. Helper Functions
  const selectedCategoryName =
    categories
      .find((c) => c.id.toString() === selectedCategoryId)
      ?.name.toLowerCase() || "";

  const handleAttributeChange = (key: string, value: string) => {
    setAttributes((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (imageUrls.length + files.length > 5) {
      alert("You can only upload a maximum of 5 images.");
      return;
    }

    setIsUploading(true);
    const uploadPreset = "rsleather_preset";
    const cloudName = "dloxxalwa";

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: formData },
        );

        if (!response.ok) {
          const rawErrorText = await response.text();
          throw new Error(`Cloudinary Rejection: ${rawErrorText}`);
        }

        const data = await response.json();
        if (data.secure_url) return data.secure_url;
        throw new Error("Upload failed: No URL returned from Cloudinary");
      });

      const newlyUploadedUrls = await Promise.all(uploadPromises);
      setImageUrls((prev) => [...prev, ...newlyUploadedUrls].slice(0, 5));
    } catch (error: any) {
      console.error("Upload process caught an error:", error);
      alert(`${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImageUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <form action={formAction} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT COLUMN */}
      <div className="lg:col-span-2 space-y-8">
        {/* General Info Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
            <Package className="h-5 w-5 text-amber-500" /> General Information
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Product Title
              </label>
              <input
                required
                type="text"
                name="name"
                defaultValue={initialData?.name}
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-slate-900 focus:border-amber-500 focus:ring-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Description
              </label>
              <textarea
                required
                name="description"
                defaultValue={initialData?.description}
                rows={5}
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-slate-900 focus:border-amber-500 focus:ring-amber-500 outline-none resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Images Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-amber-500" /> Product Images
            </h2>
            <span className="text-sm font-bold text-slate-500">
              {imageUrls.length} / 5
            </span>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {imageUrls.map((url, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-xl border border-slate-200 overflow-hidden group"
                >
                  <img
                    src={url}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-white/90 text-red-500 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold text-center py-1 uppercase tracking-wider">
                      Main Image
                    </div>
                  )}
                </div>
              ))}

              {imageUrls.length < 5 && (
                <div className="relative aspect-square rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:border-amber-500 hover:bg-amber-50 transition-colors flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    title="Upload Images"
                    disabled={isUploading}
                  />
                  <div className="text-slate-400 flex flex-col items-center pointer-events-none">
                    {isUploading ? (
                      <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                    ) : (
                      <>
                        <UploadCloud className="w-6 h-6 mb-1" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          Add Image
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <input type="hidden" name="images" value={imageUrls.join(",")} />

            <div className="pt-4 border-t border-slate-100">
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Available Sizes (Comma separated)
              </label>
              <input
                required
                type="text"
                name="sizes"
                placeholder="e.g. S, M, L, XL"
                defaultValue={initialData?.sizes}
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-slate-900 focus:border-amber-500 focus:ring-amber-500 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-8">
        {/* Pricing Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
            <DollarSign className="h-5 w-5 text-amber-500" /> Pricing
          </h2>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Price (Rs)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-slate-500 sm:text-sm font-bold">Rs</span>
              </div>
              <input
                required
                type="number"
                name="price"
                defaultValue={initialData?.price}
                className="block w-full rounded-lg border border-gray-300 pl-10 pr-4 py-3 text-slate-900 focus:border-amber-500 focus:ring-amber-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Organization Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
            <Tag className="h-5 w-5 text-amber-500" /> Organization
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Category
              </label>
              <select
                required
                name="categoryId"
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-slate-900 focus:border-amber-500 focus:ring-amber-500 bg-white outline-none"
              >
                <option value="">Select a category...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* DYNAMIC FORM FIELDS INJECTION */}
            {selectedCategoryName.includes("hide") ||
            selectedCategoryName.includes("skin") ? (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg space-y-4">
                <h3 className="font-bold text-amber-800 text-sm">
                  Leather Hide Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Square Footage (SqFt)
                    </label>
                    <input
                      type="text"
                      value={attributes.sqft || ""}
                      onChange={(e) =>
                        handleAttributeChange("sqft", e.target.value)
                      }
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-slate-900"
                      placeholder="e.g. 24"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Thickness
                    </label>
                    <input
                      type="text"
                      value={attributes.thickness || ""}
                      onChange={(e) =>
                        handleAttributeChange("thickness", e.target.value)
                      }
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-slate-900"
                      placeholder="e.g. 1.2mm"
                    />
                  </div>
                </div>
              </div>
            ) : selectedCategoryName.includes("wallet") ? (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-4">
                <h3 className="font-bold text-blue-800 text-sm">
                  Wallet Details
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Number of Card Slots
                  </label>
                  <input
                    type="number"
                    value={attributes.cardSlots || ""}
                    onChange={(e) =>
                      handleAttributeChange("cardSlots", e.target.value)
                    }
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900"
                    placeholder="e.g. 6"
                  />
                </div>
              </div>
            ) : selectedCategoryName.includes("bag") ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg space-y-4">
                <h3 className="font-bold text-green-800 text-sm">
                  Bag Dimensions
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Length (cm)
                    </label>
                    <input
                      type="text"
                      value={attributes.length || ""}
                      onChange={(e) =>
                        handleAttributeChange("length", e.target.value)
                      }
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Width (cm)
                    </label>
                    <input
                      type="text"
                      value={attributes.width || ""}
                      onChange={(e) =>
                        handleAttributeChange("width", e.target.value)
                      }
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Height (cm)
                    </label>
                    <input
                      type="text"
                      value={attributes.height || ""}
                      onChange={(e) =>
                        handleAttributeChange("height", e.target.value)
                      }
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-slate-900"
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {/* Hidden Input to send the dynamic fields to the server */}
            <input
              type="hidden"
              name="attributes"
              value={JSON.stringify(attributes)}
            />

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-sm font-semibold text-slate-700">
                  Product in Stock
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="inStock"
                  defaultChecked={isEditing ? initialData.inStock : true}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>
          </div>
        </div>

        <SubmitButton isEditing={isEditing} />
      </div>
    </form>
  );
}
