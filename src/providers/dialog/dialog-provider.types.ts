export const DIALOGS = [
  'article'
] as const;

export type Dialog = (typeof DIALOGS)[number];
