import { useMemo } from "react";
import { usePortalRootContext, PortalRoot } from "@/components/portal/PortalRootContext";

export interface UseFloatingPortalRootOptions {
  portalRoot?: PortalRoot;
  reference?: unknown;
}

export function useFloatingPortalRoot({
  portalRoot,
  reference,
}: UseFloatingPortalRootOptions = {}): PortalRoot | undefined {
  const contextRoot = usePortalRootContext();

  const res = useMemo(() => {
    // 1. Ưu tiên cao nhất: root được truyền trực tiếp qua props (khi khác undefined)
    if (portalRoot !== undefined) {
      if (portalRoot && typeof portalRoot === "object" && "current" in portalRoot && portalRoot.current) {
        return portalRoot.current;
      }
      return portalRoot;
    }

    // 2. Tự động nhận diện nếu trigger element nằm trong một thẻ <dialog>
    if (reference && typeof reference === "object" && "closest" in reference) {
      const enclosingDialog = (reference as HTMLElement).closest("dialog");
      if (enclosingDialog) return enclosingDialog;
    }

    // 3. Context từ container gần nhất (Modal, Confirm, v.v.)
    if (contextRoot) {
      if (typeof contextRoot === "object" && "current" in contextRoot) {
        return contextRoot.current ?? contextRoot;
      }
      return contextRoot;
    }

    // 4. Mặc định: undefined để FloatingPortal tự render ra document.body
    return undefined;
  }, [portalRoot, contextRoot, reference]);

  return res;
}

