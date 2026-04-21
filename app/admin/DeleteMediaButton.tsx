// components/admin/DeleteMediaButton.tsx
"use client";

import { Trash2 } from "lucide-react";
import { deleteImage } from "@/app/actions/media";
import { useTransition } from "react";

export default function DeleteMediaButton({ filename }: { filename: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm("Delete this image forever?")) {
      startTransition(() => {
        deleteImage(filename);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className={`absolute top-2 right-2 p-2 rounded-md bg-white shadow-sm transition-colors ${
        isPending ? "text-slate-400" : "text-red-500 hover:bg-red-50"
      }`}
      title="Delete Image"
    >
      <Trash2 size={16} />
    </button>
  );
}
