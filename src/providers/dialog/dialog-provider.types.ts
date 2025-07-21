export const DIALOGS = ["article", "cart", "order-status", "about"] as const;

export type Dialog = (typeof DIALOGS)[number];
