"use client";

import { useEffect, useState } from "react";

const FALLBACK = "v1.4.6";
const API_URL =
  "https://api.github.com/repos/xDarkicex/openclaw-memory-libravdb/releases/latest";

let cached: string | null = null;

export function useVersion() {
  const [version, setVersion] = useState(cached ?? FALLBACK);

  useEffect(() => {
    if (cached) {
      setVersion(cached);
      return;
    }
    fetch(API_URL)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.tag_name) {
          cached = data.tag_name;
          setVersion(data.tag_name);
        }
      })
      .catch(() => {});
  }, []);

  return version;
}
