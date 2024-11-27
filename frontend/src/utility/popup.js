import toast, { Toaster } from "react-hot-toast";

export const generatePopup = (type, msg) => {
    const duration = 10000;
    if (type === "success") {
        return toast.success((t) => (
            <div className="d-flex align-items-center gap-2">
                <div>{msg}</div>
            </div>
        ));
    } else {
        return toast.error((t) => (
            <div className="d-flex align-items-center gap-2">
                <div>{msg}</div>
            </div>
        ));
    }
};
