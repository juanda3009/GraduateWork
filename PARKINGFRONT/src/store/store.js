import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth/authSlice";
import { usersSlice } from "./slices/user/usersSlice";
import { vehicleSlice } from "./slices/vehicle/vehicleSlice";
import { rateSlice } from "./slices/rate/rateSlice";
import { receiptSlice } from "./slices/receipt/receiptSlice";
import { vehicleTypeSlice } from "./slices/vehicle/vehicleTypeSlice";
import { visitorReceiptSlice } from "./slices/receipt/visitorReceiptSlice";
import { qrCodeSlice } from "./slices/receipt/qrCodeSlice";
import { nightlyReceiptSlice } from "./slices/receipt/nightlyReceiptSlice";
import { reportSlice } from "./slices/report/reportSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    vehicles: vehicleSlice.reducer,
    vehicleType: vehicleTypeSlice.reducer,
    rates: rateSlice.reducer,
    auth: authSlice.reducer,
    receipts: receiptSlice.reducer,
    visitorReceipts: visitorReceiptSlice.reducer,
    nightlyReceipts: nightlyReceiptSlice.reducer,
    qrCode: qrCodeSlice.reducer,
    reports: reportSlice.reducer,
  },
});
