"use client";

export default function DeleteButton({ action, label = "Delete" }: { action: () => Promise<void>; label?: string }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Delete this permanently? This can't be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <button type="submit" className="text-red-500 hover:underline text-sm font-medium">
        {label}
      </button>
    </form>
  );
}
