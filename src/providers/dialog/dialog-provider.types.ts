export const DIALOGS = [
  "article",
  "cart",
  "order-status",
  "about",
  "gdpr",
] as const;

export type Dialog = (typeof DIALOGS)[number];
