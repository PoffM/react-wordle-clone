import { clamp, fromPairs, keys, toPairs } from "lodash";

/**
 * Shifts the values in a shaded color palette.
 * e.g. calling skewColor(gray, 2) returns a darkened palette.
 * e.g. calling skewColor(gray, -2) returns a lightened palette.
 */
export function shadeColor(
  color: Record<string, string>,
  skewVal: number
): Record<string, string> {
  const pairs = toPairs(color);

  const newPairs = keys(color).map((key, index) => [
    key,
    pairs[clamp(index + skewVal, 0, pairs.length - 1)]?.[1],
  ]);

  return fromPairs(newPairs);
}
