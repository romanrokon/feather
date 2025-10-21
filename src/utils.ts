/**
 * Use this instead of
 * Object.keys(o).length === 0
 * Object.entries(o).length === 0
 * @param o Object
 */

export function isEmptyObject(o: any) {
   for (const i in o) {
      // deno-lint-ignore no-prototype-builtins
      if (o.hasOwnProperty(i)) {
         return false;
      }
   }

   return true;
}
