export const DIALOGS = ["article", "cart", "order-status"] as const;

export type Dialog = (typeof DIALOGS)[number];
