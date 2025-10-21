type TagTypes =
   | 'property-list'
   | 'property'
   | 'profile'
   | 'user-listings'
   | 'favorites'
   // deno-lint-ignore ban-types
   | (string & {});

export type Tags = Array<TagTypes>;

/**
 * Provides an array of tags for cache revalidation.
 * @param tags - An array of tag strings.
 * @returns An array of tags.
 * fetch
 * @example
 * ```ts
 * {
 *    next: {
 *       tags: provideTags(slug, 'property-list')
 *    },
 * }
 *
 * ```
 */
export default function provideTags(...tags: Tags): string[] {
   return tags;
}
