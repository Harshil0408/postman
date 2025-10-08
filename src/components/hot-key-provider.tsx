"use client";

import { HotkeysProvider } from "react-hotkeys-hook";

export function HotKeysProviders({
  children,
  ...props
}: React.ComponentProps<typeof HotkeysProvider>) {
  return <HotkeysProvider {...props}>{children}</HotkeysProvider>;
}
