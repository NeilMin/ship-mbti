import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const DUPLICATE_WINDOW_MS = 1000;

type AnalyticsValue = string | number | boolean;
type EventParams = Record<string, AnalyticsValue | null | undefined>;

let isInitialized = false;
let removeExternalLinkListener: (() => void) | null = null;

const recentEventTimestamps = new Map<string, number>();

function sanitizeParams(params: EventParams = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null)
  );
}

function shouldSkipDuplicate(eventName: string, dedupeKey?: string) {
  if (!dedupeKey) {
    return false;
  }

  const now = Date.now();
  const cacheKey = `${eventName}:${dedupeKey}`;
  const lastTimestamp = recentEventTimestamps.get(cacheKey);

  recentEventTimestamps.set(cacheKey, now);

  return lastTimestamp !== undefined && now - lastTimestamp < DUPLICATE_WINDOW_MS;
}

function handleDocumentClick(event: MouseEvent) {
  if (!(event.target instanceof Element)) {
    return;
  }

  const link = event.target.closest("a[href]");
  if (!(link instanceof HTMLAnchorElement)) {
    return;
  }

  const url = new URL(link.href, window.location.href);

  if (url.origin === window.location.origin) {
    return;
  }

  trackEvent(
    "click_external_link",
    {
      link_domain: url.hostname,
      link_text: link.textContent?.trim() || undefined,
      link_url: url.href,
      page_path: window.location.pathname,
    },
    url.href
  );
}

export function initializeAnalytics() {
  if (
    typeof window === "undefined" ||
    !import.meta.env.PROD ||
    !GA_MEASUREMENT_ID ||
    isInitialized
  ) {
    return;
  }

  ReactGA.initialize(GA_MEASUREMENT_ID, {
    gtagOptions: {
      send_page_view: false,
    },
  });

  isInitialized = true;

  if (!removeExternalLinkListener) {
    document.addEventListener("click", handleDocumentClick, true);
    removeExternalLinkListener = () => {
      document.removeEventListener("click", handleDocumentClick, true);
      removeExternalLinkListener = null;
    };
  }
}

export function cleanupAnalytics() {
  removeExternalLinkListener?.();
  recentEventTimestamps.clear();
  isInitialized = false;
}

export function trackEvent(
  eventName: string,
  params: EventParams = {},
  dedupeKey?: string
) {
  if (!isInitialized || shouldSkipDuplicate(eventName, dedupeKey)) {
    return;
  }

  ReactGA.event(eventName, sanitizeParams(params));
}

export function trackPageView(
  pagePath: string,
  params: EventParams = {},
  dedupeKey = pagePath
) {
  const pageLocation = new URL(pagePath, window.location.origin).toString();

  trackEvent(
    "page_view",
    {
      page_location: pageLocation,
      page_path: pagePath,
      ...params,
    },
    dedupeKey
  );
}
