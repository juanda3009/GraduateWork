import {
  changePaymentStatusVisitor,
  createVisitorReceipt,
  deleteVisitorReceipt,
  findAllVisitorReceipts,
  totalCountReceiptsVisitor,
  totalPaidVisitor,
  totalUnpaidVisitor,
  updateVisitorReceipt,
} from "../services/visitorReceiptService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addVisitorReceipt,
  initialVisitorReceipt,
  loadingErrorVisitorReceipt,
  loadingPaidCountVisitor,
  loadingTotalCountVisitor,
  loadingUnpaidCountVisitor,
  loadingVisitorReceipt,
  onCloseModalFormVisitorReceipt,
  onCloseModalShowReceiptVisitor,
  onCloseQRModalVisitorReceipt,
  onOpenModalFormCreateVisitorReceipt,
  onOpenModalFormVisitorReceipt,
  onOpenModalShowReceiptVisitor,
  onOpenQRModalVisitorReceipt,
  removeVisitorReceipt,
  updateVisitorReceiptSlice,
} from "../store/slices/receipt/visitorReceiptSlice";
import Swal from "sweetalert2";
import { useAuth } from "../auth/hooks/useAuth";

export const useVisitorReceipt = () => {
  const {
    visitorReceipts,
    visibleShowReceiptVisitorModal,
    visibleFormReceiptVisitorModal,
    visitorReceiptSelected,
    errorsVisitorReceipt,
    totalUnpaidVisitorState,
    totalPaidVistorState,
    totalVisitorReceipt,
    idQRReceiptVisitor,
    visibleQRModalReceiptVisitor,
  } = useSelector((state) => state.visitorReceipts);
  const dispatch = useDispatch();
  const { login, handlerLogout } = useAuth();
  //navegacion
  const navigate = useNavigate();

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

  const getVisitorReceipts = async () => {
    try {
      const result = await findAllVisitorReceipts();
      dispatch(loadingVisitorReceipt(result.data));
    } catch (error) {
      if (error.response.status == 401) {
        handlerLogout();
      } else {
        throw error;
      }
    }
  };

  const handlerAddReceiptVisitor = async (visitorReceipt, redirectTo) => {
    let response;

    try {
      if (visitorReceipt.id === 0) {
        response = await createVisitorReceipt(visitorReceipt);
        dispatch(addVisitorReceipt(response.data));
        await getCountTotalVisitor();
      } else {
        //actualizar
        
        response = await updateVisitorReceipt(visitorReceipt);
        dispatch(updateVisitorReceiptSlice(response.data));
      }
      Toast.fire({
        icon: "success",
        title: visitorReceipt.id === 0 ? "Recibo creado" : "Recibo actualizado",
      });

      if (redirectTo) {
        handlerCloseModalFormVisitorReceipt();
        navigate(redirectTo);
      }
    } catch (error) {
      if (error.response && error.response.status == 400) {
        dispatch(loadingErrorVisitorReceipt(error.response.data));
      } else if (error.response?.status == 401) {
        //manejamos el cierre de sesion cuando tengamos autenticacion
        handlerLogout();
      } else {
        throw error;
      }
    }
  };

  const getCountUnpaidVisitor = async () => {
    try {
      const total = await totalUnpaidVisitor();
      dispatch(loadingUnpaidCountVisitor(total.data));
    } catch (error) {
      if (error.response.status == 401) {
        handlerLogout();
      } else {
        throw error;
      }
    }
  };

  const getCountPaidVisitor = async () => {
    try {
      const total = await totalPaidVisitor();
      dispatch(loadingPaidCountVisitor(total.data));
    } catch (error) {
      if (error.response.status == 401) {
        handlerLogout();
      } else {
        throw error;
      }
    }
  };

  const getCountTotalVisitor = async () => {
    try {
      const total = await totalCountReceiptsVisitor();
      dispatch(loadingTotalCountVisitor(total.data));
    } catch (error) {
      if (error.response.status == 401) {
        handlerLogout();
      } else {
        throw error;
      }
    }
  };

  const handlerChangePaymentStatusVisitor = async (receiptId, id = null) => {
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
          await changePaymentStatusVisitor(receiptId);

          Toast.fire({
            icon: "success",
            title: "Estado de pago actualizado",
          });
          await getVisitorReceipts();
          await getCountPaidVisitor();
          await getCountUnpaidVisitor();

          //Cargamos los recibos con el nuevo estado de pago
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

  const handlerRemoveVisitorReceipt = async (visitorReceiptId) => {
    //validaciones para aurhorizacion
    Swal.fire({
      title: "Esta seguro que desea eliminar?",
      text: "El recibo sera eliminado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1E293C",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteVisitorReceipt(visitorReceiptId);
          dispatch(removeVisitorReceipt(visitorReceiptId));

          Toast.fire({
            icon: "success",
            title: "Recibo eliminado ",
          });
        } catch (error) {
          if (error.response?.status == 401) {
            handlerLogout();
          }
        }
      }
    });
  };

  //info
  const handlerReceiptVisitorSelectedModalShow = (visitorReceipt) => {
    dispatch(onOpenModalShowReceiptVisitor({ ...visitorReceipt }));
  };

  const handlerCloseModalShowVisitorReceipt = () => {
    dispatch(onCloseModalShowReceiptVisitor());
  };

  //edit
  const handlerVisitorReceiptSelectedModalForm = (visitorReceipt) => {
   
    dispatch(onOpenModalFormVisitorReceipt({ ...visitorReceipt }));
  };

  //show form create
  const handlerOpenModalFormVisitorReceipt = () => {
    dispatch(onOpenModalFormCreateVisitorReceipt());
  };

  const handlerCloseModalFormVisitorReceipt = () => {
    dispatch(onCloseModalFormVisitorReceipt());
  };

  //QR Modal
  const handlerOpenModalQRVisitorReceipt = (idVisitorReceipt) => {
    dispatch(onOpenQRModalVisitorReceipt(idVisitorReceipt));
  };
  const handlerCloseModalQRVisitorReceipt = () => {
    dispatch(onCloseQRModalVisitorReceipt());
  };

  return {
    getVisitorReceipts,
    getCountUnpaidVisitor,
    getCountPaidVisitor,
    getCountTotalVisitor,
    visitorReceipts,
    initialVisitorReceipt,
    handlerAddReceiptVisitor,
    handlerChangePaymentStatusVisitor,

    handlerOpenModalQRVisitorReceipt,
    handlerCloseModalQRVisitorReceipt,

    visibleShowReceiptVisitorModal,
    visitorReceiptSelected,
    handlerReceiptVisitorSelectedModalShow,
    handlerCloseModalShowVisitorReceipt,

    visibleFormReceiptVisitorModal,
    handlerVisitorReceiptSelectedModalForm,
    handlerOpenModalFormVisitorReceipt,
    handlerCloseModalFormVisitorReceipt,
    errorsVisitorReceipt,

    handlerRemoveVisitorReceipt,

    totalUnpaidVisitorState,
    totalPaidVistorState,
    totalVisitorReceipt,

    idQRReceiptVisitor,
    visibleQRModalReceiptVisitor,
  };
};
