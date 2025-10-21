export type { Options as Input } from 'redaxios';

export interface Init<D> extends RequestInit {
   transformData?: (res: D) => D;
}
