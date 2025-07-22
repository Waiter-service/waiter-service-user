"use client";

import { useDialogContext } from "@/providers/dialog/DialogProvider";
import { Dialog } from "@/providers/dialog/dialog-provider.types";
import { cn } from "@/utils/misc/cn/cn";
import ArticleDialog, {
  articleDialogDataSchema,
} from "./article/ArticleDialog";
import CartDialog from "./cart/CartDialog";
import OrderStatusDialog from "./order-status/OrderStatusDialog";
import AboutDialog, { aboutDialogDataSchema } from "./about/AboutDialog";
import GDPRDialog from "./gdpr/GdprDialog";

const DialogSwitch = () => {
  const { type, data, close } = useDialogContext();

  const renderDialogContent = (
    type: Dialog | null,
    data?: any
  ): React.ReactNode => {
    switch (type) {
      case "article":
        return <ArticleDialog data={articleDialogDataSchema.parse(data)} />;
      case "cart":
        return <CartDialog />;
      case "order-status":
        return <OrderStatusDialog />;
      case "about":
        return <AboutDialog data={aboutDialogDataSchema.parse(data)} />;
      case "gdpr":
        return <GDPRDialog />;
      case null:
        return;
      default:
        throw new Error(`"${type}" dialog type does not exist`);
    }
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).classList.contains("dialog-overlay")) {
      close();
    }
  };

  return (
    <>
      <div
        style={{ width: "100vw !important", height: "100vh !important" }}
        className={cn(
          "pointer-events-none fixed inset-0 left-0 top-0 z-[999] flex h-screen w-screen items-center justify-center transition-[backdrop-filter,background] duration-300 dialog-overlay",
          {
            "pointer-events-auto bg-[rgba(0,0,0,0.1)] backdrop-blur-md": !!type,
          }
        )}
        onClick={handleClickOutside}
      >
        {renderDialogContent(type, data)}
      </div>
    </>
  );
};

export default DialogSwitch;
