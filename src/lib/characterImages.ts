import type { ResultCode } from "./types";

export function getCharacterImageSrc(code: ResultCode) {
  return `/characters/${code.toLowerCase()}.png`;
}

export function getCharacterImageAlt(code: ResultCode) {
  return `${code} character illustration`;
}
