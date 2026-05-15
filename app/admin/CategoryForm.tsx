// components/admin/CategoryForm.tsx (or app/admin/CategoryForm.tsx depending on your structure)
"use client";

import { createCategory } from "@/app/actions/category";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Image as ImageIcon, X } from "lucide-react";

function SubmitButton({ isUploading }: { isUploading: boolean }) {
  const { pending } = useFormStatus();
  const disabled = pending || isUploading;

  return (
    <button
      disabled={disabled}
      type="submit"
      className={`w-full py-3 px-4 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2
        ${disabled ? "bg-slate-400 cursor-not-allowed" : "bg-slate-900 hover:bg-slate-800"}`}
    >
      {pending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" /> Saving...
        </>
      ) : (
        "Save Category"
      )}
    </button>
  );
}

export default function CategoryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  // Client-Side Cloudinary Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadPreset = "rsleather_preset";
    const cloudName = "dloxxalwa";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        if (!imageUrl) {
          alert("Please wait for the image to upload!");
          return;
        }
        await createCategory(formData);
        formRef.current?.reset();
        setImageUrl(""); // Clear image preview
      }}
      className="space-y-5 bg-white p-6 rounded-xl shadow-sm border border-slate-100"
    >
      <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">
        Add New Category
      </h2>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Category Name
        </label>
        <input
          required
          type="text"
          name="name"
          className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:ring-amber-500 text-slate-900"
          placeholder="e.g. Premium Wallets"
        />
      </div>

      {/* NEW: Client-Side Upload Section */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Category Image
        </label>

        {imageUrl ? (
          <div className="relative w-full h-40 rounded-lg overflow-hidden border border-slate-200 group">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="absolute top-2 right-2 p-1 bg-white/90 rounded-md text-red-500 hover:bg-red-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 text-amber-500">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="text-sm font-medium">Uploading...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <ImageIcon className="w-8 h-8 mb-2 text-gray-400" />
                <span className="text-sm font-medium">
                  Click to upload image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            )}
          </div>
        )}

        {/* Hidden input passes the string URL to the server action */}
        <input type="hidden" name="imageUrl" value={imageUrl} />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Description
        </label>
        <textarea
          required
          name="description"
          rows={3}
          className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:ring-amber-500 text-slate-900"
          placeholder="Brief description..."
        ></textarea>
      </div>

      <SubmitButton isUploading={isUploading} />
    </form>
  );
}
