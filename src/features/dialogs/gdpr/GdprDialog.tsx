import { useDialogContext } from "@/providers/dialog/DialogProvider";
import { useTable } from "@/providers/table-provider";

const GDPRDialog = () => {
  const { close } = useDialogContext();
  const { setGdprAccepted } = useTable();

  const onDecline = () => {
    localStorage.setItem("gdprAccepted", "false");
    setGdprAccepted(false);
    close();
  };

  const onAccept = () => {
    localStorage.setItem("gdprAccepted", "true");
    setGdprAccepted(true);
    close();
  };

  return (
    <div className="w-full max-w-[400px] mx-[30px] bg-neutral-700 rounded-2xl p-[20px] text-white">
      <h1 className="text-xl font-bold mb-[10px]">We Value Your Privacy</h1>
      <p className="text-sm mb-[20px]">
        We use your location to provide a better experience. By clicking
        "Accept", you consent to the collection and use of your location data in
        accordance with our Privacy Policy.
      </p>
      <div className="flex justify-center gap-[10px]">
        <button
          onClick={onDecline}
          className="px-[15px] py-[8px] bg-neutral-300 text-neutral-600 rounded-lg hover:bg-neutral-600 hover:text-neutral-300 transition"
        >
          Decline
        </button>
        <button
          onClick={onAccept}
          className="px-[15px] py-[8px] hover:bg-neutral-300 hover:text-neutral-600 rounded-lg bg-neutral-600 text-neutral-300 transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default GDPRDialog;
