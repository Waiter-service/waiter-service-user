'use client';

import { useDialogContext } from '@/providers/dialog/DialogProvider';
import { Dialog } from '@/providers/dialog/dialog-provider.types';
import { cn } from '@/utils/misc/cn/cn';
import ArticleDialog, { articleDialogDataSchema } from './article/ArticleDialog';

const DialogSwitch = () => {
  const { type, data, close } = useDialogContext(); // Add closeDialog from context

  const renderDialogContent = (type: Dialog | null, data?: any): React.ReactNode => {
    switch (type) {
      case 'article':
        return <ArticleDialog data={articleDialogDataSchema.parse(data)} />;
      case null:
        return;
      default:
        throw new Error(`"${type}" dialog type does not exist`);
    }
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).classList.contains('dialog-overlay')) {
      close();
    }
  };

  return (
    <>
      <div
        style={{ width: '100vw !important', height: '100vh !important' }}
        className={cn(
          'pointer-events-none fixed inset-0 left-0 top-0 z-[999] flex h-screen w-screen items-center justify-center transition-[backdrop-filter,background] duration-300 md:px-[40px] dialog-overlay',
          {
            'pointer-events-auto bg-[rgba(0,0,0,0.1)] backdrop-blur-md': !!type,
          },
        )}
        onClick={handleClickOutside}
      >
        {renderDialogContent(type, data)}
      </div>
    </>
  );
};

export default DialogSwitch;