import { useDispatch, useSelector } from "react-redux";
import {
  changePaymentStatus,
  createReceiptByUser,
  findReceiptsByUser,
  updateReceipt,
} from "../services/receiptService";
import {
  loadingReceiptsByUser,
  onCloseShowModalReceipt,
  onOpenModalShowReceipt,
  onReceiptShowModalSelected,
  initialReceiptForm,
  addReceipt,
  loadingErrorReceipt,
  onReceiptSelectedForm,
  onOpenModalFormReceipt,
  onCloseModalFormReceipt,
  vehicle,
  updateReceiptSlice,
} from "../store/slices/receipt/receiptSlice";
import Swal from "sweetalert2";
import { useAuth } from "../auth/hooks/useAuth";

export const useReceipts = () => {
  const {
    receiptsByUser,
    visibleFormReceiptModal,
    visibleShowReceiptModal,
    receiptSelected,
    vehicleSelected,
    errorsReceipt,
  } = useSelector((state) => state.receipts);
  const dispatch = useDispatch();
  const { login, handlerLogout } = useAuth();

  //Alertas
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const getReciptsByUser = async (id) => {
    try {
      const result = await findReceiptsByUser(id);
      dispatch(loadingReceiptsByUser(result.data));
    } catch (error) {
      throw error;
    }
  };

  //crear Receipt by user
  const handlerAddReceiptByUser = async (userId, receipt) => {
    let response;
    try {
      if (receipt.id === 0) {
        response = await createReceiptByUser(userId, receipt);
        dispatch(addReceipt(response.data));
      } else {
        //actualizar receipt
        response = await updateReceipt(receipt.id, receipt);
        dispatch(updateReceiptSlice(response.data));
      }
      Toast.fire({
        icon: "success",
        title: receipt.id === 0 ? "Recibo creado" : "Recibo actualizado",
      });
      handlerCloseModalFormReceipt();
    } catch (error) {
      if (error.response && error.response.status == 400) {
        dispatch(loadingErrorReceipt(error.response.data));
      } else if (error.response?.status == 401) {
        //manejamos el cierre de sesion cuando tengamos autenticacion
        handlerLogout();
      } else {
        throw error;
      }
    }
  };

  //Cambiar estado de pago
  const handlerChangePaymentStatus = (receiptId) => {
    Swal.fire({
      title: "¿ Desea cambiar el estado de pago ?",
      text: "¡ El estado de pago sera cambiado !  ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1E293C",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cambiar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await changePaymentStatus(receiptId);

          Toast.fire({
            icon: "success",
            title: "Estado de pago actualizado",
          });
        } catch (error) {
          if (error.response?.status == 401) {
            handlerLogout();
          } else {
            throw error;
          }
        }
      }
    });
  };

  //Form
  const handlerReceiptSelectedModalForm = (receipt) => {
    dispatch(onReceiptSelectedForm({ ...receipt }));
  };

  const handlerOpenModalFormReceipt = (vehicle) => {
    dispatch(onOpenModalFormReceipt({ ...vehicle }));
  };

  const handlerCloseModalFormReceipt = () => {
    dispatch(onCloseModalFormReceipt());
    dispatch(loadingErrorReceipt({}));
  };

  //Show
  const handlerReceiptSelectedModalShow = (receipt) => {
    dispatch(onReceiptShowModalSelected({ ...receipt }));
  };

  const handlerOpenModalShowReceipt = () => {
    dispatch(onOpenModalShowReceipt());
  };

  const handlerCloseModalShowReceipt = () => {
    dispatch(onCloseShowModalReceipt());
  };

  return {
    getReciptsByUser,
    receiptsByUser,
    handlerAddReceiptByUser,
    handlerChangePaymentStatus,
    handlerReceiptSelectedModalForm,
    handlerOpenModalFormReceipt,
    handlerCloseModalFormReceipt,
    visibleFormReceiptModal,
    vehicle,

    handlerOpenModalShowReceipt,
    handlerReceiptSelectedModalShow,
    handlerCloseModalShowReceipt,
    visibleShowReceiptModal,
    receiptSelected,
    vehicleSelected,
    initialReceiptForm,

    errorsReceipt,
  };
};
