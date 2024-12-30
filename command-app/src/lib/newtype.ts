declare const __newtype: unique symbol

export type newtype<Constructor, T> = T & { readonly [__newtype]: Constructor }
