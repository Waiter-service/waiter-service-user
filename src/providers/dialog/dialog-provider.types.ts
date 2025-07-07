export const DIALOGS = [
  'article',
  'cart'
] as const;

export type Dialog = (typeof DIALOGS)[number];
