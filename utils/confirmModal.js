import Swal from "sweetalert2";

export const confirmModal = async (message, confirmBtn, cancelBtn) => {
  return await Swal.fire({
    title: message,
    icon: "warning",
    showCancelButton: true,
    background: "#12121c",
    confirmButtonColor: "#10B981",
    cancelButtonColor: "#3085d6",
    confirmButtonText: confirmBtn,
    cancelButtonText: cancelBtn,
  });
};
