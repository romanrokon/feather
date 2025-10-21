import base from './base.ts';
import feather from './feather.ts';
import type { Input, Init } from './types.ts';

interface FeatherConfig {
   baseUrl: string;
}

function getFeather({ baseUrl }: FeatherConfig) {
   const instance = base(baseUrl);

   return <D>(input: Input | string, options?: Init<D>) => {
      return feather<D>(input, options, instance);
   };
}

export default getFeather;
