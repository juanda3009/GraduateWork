import apiClient from "../auth/middleware/apiClient";
const BASE_URL_VISITOR_RECEIPT = "/visitor-receipt";

export const findAllVisitorReceipts = async () => {
  try {
    const response = await apiClient.get(BASE_URL_VISITOR_RECEIPT);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createVisitorReceipt = async ({ plate, rate }) => {
  try {
    return await apiClient.post(BASE_URL_VISITOR_RECEIPT, {
      plate,
      rate,
    });
  } catch (error) {
    throw error;
  }
};

export const updateVisitorReceipt = async ({
  id,
  plate,
  issueDate,
  dueDate,
  paymentStatus,
  rate,
}) => {
  try {
    return await apiClient.put(`${BASE_URL_VISITOR_RECEIPT}/${id}`, {
      plate,
      issueDate,
      dueDate,
      paymentStatus,
      rate,
    });
  } catch (error) {
    throw error;
  }
};

export const changePaymentStatusVisitor = async (receiptId) => {
  try {
    await apiClient.put(
      `${BASE_URL_VISITOR_RECEIPT}/change-payment/${receiptId}`
    );
  } catch (error) {
    throw error;
  }
};

export const deleteVisitorReceipt = async (visitorReceiptId) => {
  try {
    await apiClient.delete(`${BASE_URL_VISITOR_RECEIPT}/${visitorReceiptId}`);
  } catch (error) {
    throw error;
  }
};

export const totalUnpaidVisitor = async () => {
  try {
    const response = await apiClient.get(
      `${BASE_URL_VISITOR_RECEIPT}/count-unpaid`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const totalPaidVisitor = async () => {
  try {
    const response = await apiClient.get(
      `${BASE_URL_VISITOR_RECEIPT}/count-paid`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const totalCountReceiptsVisitor = async () => {
  try {
    const response = await apiClient.get(
      `${BASE_URL_VISITOR_RECEIPT}/count-total`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
