import type { Options as Input } from 'redaxios';
import { isEmptyObject } from './utils.ts';

interface Options extends RequestInit {
   next?: {
      revalidate?: number;
      tags?: string[];
   };
}

function base(baseUrl?: string) {
   return (input: Input | string, options?: Options) => {
      // when input(.url) has a leading http://, new URL treats it as the full url and ignores the base
      // and it can be used for one-off external api calls
      let url;

      if (typeof input === 'string') {
         url = new URL(input, baseUrl);
      } else {
         url = new URL(input.url as string, baseUrl);
      }

      const tags = [];

      if (options?.next?.tags) {
         if (!Array.isArray(options.next.tags)) {
            throw new Error('Tags must be an array');
         }

         if (options.next.tags.length) {
            tags.push(...options.next.tags);
         }
      }

      let config: RequestInit = {
         ...options,
      };

      if (typeof input !== 'string') {
         const searchParams = input.params;

         if (searchParams && !isEmptyObject(searchParams)) {
            Object.entries(searchParams).forEach(([key, value]) => {
               url.searchParams.append(key, value as string);
            });
         }

         config = {
            mode: 'cors',
            ...input,
            ...options,
            method: input.method || 'GET',
            headers: {
               ...input.headers,
               ...options?.headers,
            },
            body: input.data ? JSON.stringify(input.data) : undefined,
            cache:
               input.method === 'GET' ? options?.cache || 'default' : undefined,
            next: {
               ...options?.next,
               tags,
            },
         };
      }

      return fetch(url.href, config);
   };
}

export default base;
