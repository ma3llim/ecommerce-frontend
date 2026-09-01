import { toast } from "react-toastify";

const ToastService = {
    success: (message: string) => {
        toast.success(message);
    },

    error: (message: string) => {
        toast.error(message);
    },

    info: (message: string) => {
        toast.info(message);
    },

    warning: (message: string) => {
        toast.warning(message);
    },

    dismiss: () => {
        toast.dismiss();
    },
};

export default ToastService;
