import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";

type CacheType = typeof nextCache;

export const cache: CacheType = (cb, keyParts, options = {}) => {
  return nextCache(reactCache(cb), keyParts, options);
};
