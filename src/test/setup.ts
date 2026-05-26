import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Some Node/jsdom combinations (e.g. Node 26) don't expose window.localStorage.
// Provide a minimal in-memory shim so the app's persistence code is testable.
if (typeof window !== "undefined" && !window.localStorage) {
  const store = new Map<string, string>();
  const shim: Storage = {
    get length() {
      return store.size;
    },
    clear: () => store.clear(),
    getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
    key: (index: number) => Array.from(store.keys())[index] ?? null,
    removeItem: (key: string) => {
      store.delete(key);
    },
    setItem: (key: string, value: string) => {
      store.set(key, String(value));
    },
  };

  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: shim,
  });
}

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});
