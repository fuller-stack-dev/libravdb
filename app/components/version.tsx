"use client";

import { useVersion } from "../hooks/use-version";

export function Version({ prefix = "" }: { prefix?: string }) {
  const version = useVersion();
  return <>{prefix}{version}</>;
}
