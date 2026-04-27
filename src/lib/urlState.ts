import type { ResultCode } from "./types";

const RESULT_KEY = "result";
const resultCodes = new Set<ResultCode>([
  "COLG",
  "COLW",
  "COPG",
  "COPW",
  "CALG",
  "CALW",
  "CAPG",
  "CAPW",
  "TOLG",
  "TOLW",
  "TOPG",
  "TOPW",
  "TALG",
  "TALW",
  "TAPG",
  "TAPW",
]);

export function getResultCodeFromUrl(search = window.location.search) {
  const value = new URLSearchParams(search).get(RESULT_KEY);
  if (!value || !resultCodes.has(value as ResultCode)) {
    return null;
  }

  return value as ResultCode;
}

export function replaceResultCodeInUrl(code: ResultCode) {
  if (typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  params.set(RESULT_KEY, code);
  const query = params.toString();
  const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  window.history.replaceState({}, "", nextUrl);
}

export function clearResultCodeFromUrl() {
  if (typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  params.delete(RESULT_KEY);
  const query = params.toString();
  const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  window.history.replaceState({}, "", nextUrl);
}
