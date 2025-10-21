import type base from './base.ts';
import type { Input, Init } from './types.ts';

interface ErrorShape {
   status: number;
   message: string;
}

type Result<D> =
   | { data: D; error: undefined }
   | { data: undefined; error: ErrorShape };

async function feather<D>(
   input: Input | string,
   options: Init<D>,
   instance: ReturnType<typeof base>,
): Promise<Result<D>> {
   try {
      const res = await instance(input, options);
      const contentType = res.headers.get('content-type');

      if (!contentType?.includes('application/json')) {
         throw {
            status: res.status,
            message: 'Internal Server Error: Invalid JSON response',
         };
      }

      if (res.status === 500) {
         throw {
            status: res.status,
            message: res.statusText || 'Internal Server Error',
         };
      }

      let data = (await res.json()) as D;

      if (!res.ok) {
         throw {
            status: res.status,
            // @ts-ignore an accurate assumption
            message: JSON.stringify(data.error) || res.statusText,
         };
      }

      if (options?.transformData) {
         data = options.transformData(data) as D;
      }

      return { data, error: undefined };
   } catch (error) {
      return { error: error as ErrorShape, data: undefined };
   }
}

export default feather;
