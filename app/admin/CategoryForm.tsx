// components/admin/CategoryForm.tsx
"use client";

import { createCategory } from "@/app/actions/category";
import { useRef } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="w-full py-2 px-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
    >
      {pending ? "Uploading & Saving..." : "Save Category"}
    </button>
  );
}

export default function CategoryForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await createCategory(formData);
        formRef.current?.reset(); // Instantly clears the form after saving
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

      {/* NEW: FILE UPLOAD INPUT */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Category Image (Upload)
        </label>
        <input
          required
          type="file"
          name="image"
          accept="image/*"
          className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:ring-amber-500 text-slate-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
        />
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

      <SubmitButton />
    </form>
  );
}
