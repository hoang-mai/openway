# ⚡ Hook `useMutationApp` (`@openway/ui/query`)

A specialized adapter hook wrapping **TanStack Query v5**'s `useMutation`, tailored specifically for applications utilizing the **`@openway/ui`** ecosystem. The hook eliminates boilerplate code during create, update, and delete (CUD) operations by fully automating status Toast notifications and cache refetching (Query Invalidation).

---

## 🌟 Highlights

- **Intelligent Automated Toast**:
  - Automatically displays `toast.loading` when the mutation begins execution.
  - Smoothly transitions to `toast.success` or `toast.error` upon completion without redundant popup flashes.
- **Automatic Error Extraction (`extractErrorMessage`)**:
  - Automatically parses error messages from structures like `error.response?.data?.message`, `error.response?.data?.error`, NestJS/Laravel validation arrays, HTTP status codes, or standard `Error.message`.
  - Eliminates the need to manually write `catch (err) { toast.error(err.response.data.message) }` in every component.
- **Automatic Query Cache Invalidation**:
  - Supports the `invalidateQueries` option accepting one or more `QueryKey`s (e.g., `["teachers"]`, `["classes"]`) or a dynamic function computed from `(data, variables)`.
  - When the mutation succeeds, automatically calls `queryClient.invalidateQueries` so that `<Table />` (`useTableQuery`) or `<Select />` (`useSelectInfiniteQuery`) components immediately reflect the latest data.
- **Added `isLoading` (alias for `isPending`)**:
  - Provides `isLoading: boolean` for backwards compatibility with TanStack Query v4 habits and familiar UI code conventions.
- **Zero `any` & Generic Type Standards**:
  - Fully supports all 4 standard TanStack Query generic type parameters: `<TData, TError, TVariables, TContext>`.
  - Preserves all native options and lifecycle callbacks (`onMutate`, `onSuccess`, `onError`, `onSettled`).

---

## 🚀 Import

```tsx
import { useMutationApp, extractErrorMessage } from "@openway/ui/query";
import type {
  UseMutationAppOptions,
  UseMutationAppReturn,
  UseMutationAppToastOptions,
  InvalidateQueryTarget,
} from "@openway/ui/query";
```

---

## 📖 Usage Guide

### 1. Creating a Record (Create) with Shortcut Messages

The simplest way to create a mutation with success notification and automatic table data refresh:

```tsx
import { Button, Input, Modal } from "@openway/ui";
import { useMutationApp } from "@openway/ui/query";
import { useState } from "react";

interface CreateTeacherDto {
  name: string;
  email: string;
  subjectId: string;
}

export function CreateTeacherModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { mutate, isLoading } = useMutationApp({
    mutationFn: async (dto: CreateTeacherDto) => {
      const res = await fetch("/api/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      });
      if (!res.ok) throw await res.json();
      return res.json();
    },
    // Shows success toast & automatically reports error if server returns error response
    loadingMessage: "Saving teacher information...",
    successMessage: "Teacher created successfully!",
    // Automatically invalidates teacher list table cache
    invalidateQueries: [["teachers"]],
    onSuccess: () => {
      onClose();
      setName("");
      setEmail("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name, email, subjectId: "math" });
  };

  return (
    <Modal open={open} onClose={onClose} title="Thêm mới Giáo viên">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Họ và tên" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Hủy
          </Button>
          <Button type="submit" loading={isLoading}>
            Lưu giáo viên
          </Button>
        </div>
      </form>
    </Modal>
  );
}
```

---

### 2. Updating a Record with Dynamic Toast Messages (`(data, variables)`)

You can pass functions to generate dynamic Toast messages containing names or details from the data:

```tsx
import { useMutationApp } from "@openway/ui/query";

interface UpdateUserDto {
  id: string;
  name: string;
}

export function useUpdateUser() {
  return useMutationApp({
    mutationFn: async ({ id, name }: UpdateUserDto) => {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name }),
      });
      return res.json();
    },
    toast: {
      loading: (vars) => `Updating user #${vars.id}...`,
      success: (data, vars) => `User "${vars.name}" updated successfully!`,
      error: (err) => `Failed to update: ${extractErrorMessage(err)}`,
    },
    // Invalidate both the list and the user detail
    invalidateQueries: (data, vars) => [
      ["users"],
      ["user-detail", vars.id],
    ],
  });
}
```

---

### 3. Deleting Data (Delete) & Invalidating Multiple Queries

```tsx
import { Button } from "@openway/ui";
import { useMutationApp } from "@openway/ui/query";

export function DeleteClassButton({ classId, className }: { classId: string; className: string }) {
  const { mutate, isLoading } = useMutationApp({
    mutationFn: async (id: string) => {
      await fetch(`/api/classes/${id}`, { method: "DELETE" });
    },
    successMessage: `Class ${className} has been deleted!`,
    // Invalidate both the classes table and dashboard statistics
    invalidateQueries: [
      ["classes"],
      ["dashboard-stats"],
    ],
  });

  return (
    <Button
      variant="soft"
      color="error"
      loading={isLoading}
      onClick={() => {
        if (confirm(`Are you sure you want to delete class ${className}?`)) {
          mutate(classId);
        }
      }}
    >
      Xóa lớp
    </Button>
  );
}
```

---

### 4. Disabling Toasts or Customizing Toast Appearance

```tsx
// Disable toasts entirely (if custom UI handling is preferred)
const mutation1 = useMutationApp({
  mutationFn: trackUserActivity,
  toast: false,
});

// Customize Toast position and variant styling
const mutation2 = useMutationApp({
  mutationFn: updateSettings,
  toast: {
    variant: "solid",
    success: "Settings saved!",
    options: {
      position: "bottom-center",
      duration: 3000,
    },
  },
});
```

---

## 🎛️ Options Table (`UseMutationAppOptions`)

Inherits all standard options from TanStack Query v5's `UseMutationOptions`, with the following additions:

| Option Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `mutationFn` | `(variables: TVariables) => Promise<TData>` | `undefined` | Asynchronous API function executing the mutation operation. |
| `invalidateQueries` | `QueryKey \| QueryKey[] \| InvalidateQueryFilters \| InvalidateQueryFilters[] \| ((data, vars) => ...)` | `undefined` | Query key or list of query keys to automatically invalidate upon mutation success. |
| `invalidateOptions` | `InvalidateOptions` | `undefined` | Advanced options for cache invalidation (e.g., `throwOnError`, `cancelRefetch`). |
| `toast` | `boolean \| UseMutationAppToastOptions` | `true` | Toast notification configuration. Pass `false` to disable all toasts. |
| `loadingMessage` | `ReactNode \| ((vars) => ReactNode)` | `undefined` | Shortcut for displaying a loading notification during execution. |
| `successMessage` | `ReactNode \| ((data, vars) => ReactNode)` | `undefined` | Shortcut for displaying a notification upon success. |
| `errorMessage` | `ReactNode \| ((err, vars) => ReactNode)` | `undefined` | Shortcut for a custom error title (detailed API error messages are still extracted via `extractErrorMessage`). |
| `onSuccess` | `(data, variables, context) => Promise<unknown> \| unknown` | `undefined` | Callback executed after mutation succeeds and after cache invalidation has completed. |
| `onError` | `(error, variables, context) => Promise<unknown> \| unknown` | `undefined` | Callback executed when the mutation encounters an error. |
| `onSettled` | `(data, error, variables, context) => Promise<unknown> \| unknown` | `undefined` | Callback executed when the mutation finishes (either successfully or with an error). |

---

## 📦 Return Value (`UseMutationAppReturn`)

Inherits all return properties from TanStack Query v5's `UseMutationResult`:

| Property | Type | Description |
| :--- | :--- | :--- |
| `mutate` | `(variables: TVariables, options?) => void` | Triggers the mutation via fire-and-forget execution. |
| `mutateAsync` | `(variables: TVariables, options?) => Promise<TData>` | Triggers the mutation and returns a Promise that can be `await`ed. |
| `isLoading` | `boolean` | **Convenience alias for `isPending`**, `true` while the mutation is running. |
| `isPending` | `boolean` | TanStack Query v5 active running state. |
| `isSuccess` | `boolean` | `true` when the mutation has completed successfully. |
| `isError` | `boolean` | `true` when the mutation has failed. |
| `data` | `TData \| undefined` | Data returned from `mutationFn` on success. |
| `error` | `TError \| null` | Error object returned from `mutationFn` on failure. |
| `reset` | `() => void` | Resets the mutation state back to its initial (`idle`) state. |
