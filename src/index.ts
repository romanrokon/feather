import base from './base.ts';
import feather from './feather.ts';
import type { Input, Init } from './types.ts';

interface FeatherConfig {
   baseUrl: string;
}

function getFeather({ baseUrl }: FeatherConfig) {
   const instance = base(baseUrl);

   function fetcher<D>(input: Input | string, options?: Init<D>) {
      return feather<D>(input, options, instance);
   }

   return fetcher;
}

export default getFeather;
