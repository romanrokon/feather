'use server';

import { revalidateTag } from 'next/cache';
import type { Tags } from './provideTags.ts';

// eslint-disable-next-line require-await
async function revalidateTags(...tags: Tags) {
   if (!Array.isArray(tags)) {
      throw new Error('Tags must be an array');
   }

   if (tags.length === 0) {
      throw new Error('No tags provided for revalidation');
   }

   if (tags.length > 1) {
      tags.map(tag => {
         revalidateTag(tag);
      });

      return;
   }

   revalidateTag(tags[0]);
}

export default revalidateTags;
