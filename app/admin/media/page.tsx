// app/admin/media/page.tsx
import { readdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { Image as ImageIcon } from "lucide-react";
import MediaUploader from "../MediaUploader";
import DeleteMediaButton from "../DeleteMediaButton";

export const dynamic = "force-dynamic";

export default async function MediaLibraryPage() {
  const uploadDir = join(process.cwd(), "public", "uploads");
  let images: string[] = [];

  // Check if the uploads folder exists, and read the files inside it
  if (existsSync(uploadDir)) {
    const files = await readdir(uploadDir);
    // Filter out hidden files (like .DS_Store on Mac)
    images = files.filter((file) => !file.startsWith("."));
    // Sort so newest images appear first
    images.reverse();
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-amber-100 rounded-lg">
          <ImageIcon className="h-6 w-6 text-amber-600" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Media Library
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your product images and assets.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: The Uploader */}
        <div className="lg:col-span-1">
          <MediaUploader />
        </div>

        {/* Right Column: The Image Grid */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 min-h-[500px]">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Asset Gallery
            </h2>

            {images.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                <ImageIcon size={48} className="mb-4 opacity-50" />
                <p>No images found. Upload your first image!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map((filename) => (
                  <div
                    key={filename}
                    className="group relative aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-50"
                  >
                    {/* The Image */}
                    {/* Note: We use a standard <img> tag here for simplicity with local files */}
                    <img
                      src={`/uploads/${filename}`}
                      alt={filename}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Hover Overlay with Image URL */}
                    <div className="absolute inset-x-0 bottom-0 p-2 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p
                        className="text-xs text-white truncate text-center"
                        title={`/uploads/${filename}`}
                      >
                        /uploads/{filename}
                      </p>
                    </div>

                    {/* Delete Button */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <DeleteMediaButton filename={filename} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
