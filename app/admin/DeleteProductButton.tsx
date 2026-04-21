// components/admin/DeleteProductButton.tsx
"use client";

import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/app/actions/product";
import { useTransition } from "react";

export default function DeleteProductButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    // Show a browser confirmation popup
    if (
      window.confirm(
        "Are you sure you want to delete this product? This cannot be undone.",
      )
    ) {
      startTransition(() => {
        deleteProduct(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className={`p-2 rounded-md transition-colors ${
        isPending
          ? "text-slate-400 cursor-not-allowed"
          : "text-red-500 hover:bg-red-50 hover:text-red-700"
      }`}
      title="Delete Product"
    >
      <Trash2 size={18} />
    </button>
  );
}
