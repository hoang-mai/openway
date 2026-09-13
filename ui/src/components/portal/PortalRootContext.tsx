import React, { createContext, useContext } from "react";

export type PortalRoot = HTMLElement | React.RefObject<HTMLElement | null> | null;

export const PortalRootContext = createContext<PortalRoot>(null);

export const usePortalRootContext = () => useContext(PortalRootContext);
