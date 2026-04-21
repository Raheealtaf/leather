// components/admin/MediaUploader.tsx
"use client";

import { uploadImage } from "@/app/actions/media";
import { UploadCloud, CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function MediaUploader() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const router = useRouter(); // Allows us to force-refresh the page

  const handleUpload = async (formData: FormData) => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    setIsUploading(true);

    // Send to server
    const result = await uploadImage(formData);

    if (result?.error) {
      alert(result.error);
    } else {
      // Success! Clear the form
      formRef.current?.reset();
      setSelectedFile(null);

      // Force Next.js to refresh the page and show the new image instantly
      router.refresh();
    }

    setIsUploading(false);
  };

  return (
    <form
      ref={formRef}
      action={handleUpload}
      className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
    >
      <h2 className="text-xl font-bold text-slate-900 mb-4">
        Upload New Image
      </h2>

      <div className="flex items-center justify-center w-full mb-4">
        <label
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors
          ${selectedFile ? "border-green-500 bg-green-50" : "border-slate-300 bg-slate-50 hover:bg-slate-100"}
        `}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-500 text-center px-4">
            {/* Show a green checkmark if a file is selected, otherwise show the cloud */}
            {selectedFile ? (
              <>
                <CheckCircle2 className="w-12 h-12 mb-3 text-green-500" />
                <p className="mb-2 text-sm font-bold text-green-700">
                  File Ready to Upload:
                </p>
                <p className="text-xs text-green-600 break-all">
                  {selectedFile}
                </p>
              </>
            ) : (
              <>
                <UploadCloud className="w-10 h-10 mb-3 text-amber-500" />
                <p className="mb-2 text-sm font-semibold">
                  Click to browse files
                </p>
                <p className="text-xs">PNG, JPG or WEBP (MAX. 5MB)</p>
              </>
            )}
          </div>

          {/* The hidden file input */}
          <input
            required
            type="file"
            name="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              // Get the name of the file the user just selected
              if (e.target.files && e.target.files[0]) {
                setSelectedFile(e.target.files[0].name);
              }
            }}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isUploading || !selectedFile}
        className={`w-full py-3 px-4 font-bold rounded-lg text-white transition-colors ${
          isUploading || !selectedFile
            ? "bg-slate-400 cursor-not-allowed"
            : "bg-slate-900 hover:bg-slate-800"
        }`}
      >
        {isUploading ? "Uploading to Server..." : "Upload Image"}
      </button>
    </form>
  );
}
