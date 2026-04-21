// components/admin/DeleteCategoryButton.tsx
"use client";

import { Trash2 } from "lucide-react";
import { deleteCategory } from "@/app/actions/category";
import { useTransition } from "react";

export default function DeleteCategoryButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    // Show a browser confirmation popup
    if (
      window.confirm(
        "Are you sure? Make sure no products are currently using this category before deleting it!",
      )
    ) {
      startTransition(() => {
        deleteCategory(id);
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
      title="Delete Category"
    >
      <Trash2 size={18} />
    </button>
  );
}
