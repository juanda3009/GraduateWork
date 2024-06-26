import apiClient from "../auth/middleware/apiClient";

const BASE_URL_RECEIPT = "/nightly-receipt";

export const findAllNightlyReceipts = async () => {
  try {
    const response = await apiClient.get(BASE_URL_RECEIPT);
    return response;
  } catch (error) {
    throw error;
  }
};

export const findNightlyReceiptsByUser = async (id) => {
  try {
    const response = await apiClient.get(`${BASE_URL_RECEIPT}/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const changePaymentStatusNight = async (receiptNightlyId) => {
  try {
    await apiClient.patch(
      `${BASE_URL_RECEIPT}/change-payment/${receiptNightlyId}`
    );
  } catch (error) {
    throw error;
  }
};

export const createNightlyReceiptByUser = async (userId, { vehicle, rate }) => {
  try {
    return await apiClient.post(`${BASE_URL_RECEIPT}/${userId}/create`, {
      vehicle,
      rate,
    });
  } catch (error) {
    throw error;
  }
};

export const updateNightlyReceipt = async (
  nightlyReceiptId,
  { initialTime, departureTime, paymentStatus, rate }
) => {
  try {
    return await apiClient.put(
      `${BASE_URL_RECEIPT}/${nightlyReceiptId}/update`,
      {
        initialTime,
        departureTime,
        paymentStatus,
        rate,
      }
    );
  } catch (error) {
    throw error;
  }
};

export const deleteNightlyReciptById = async (nightlyReceiptId) => {
  try {
    await apiClient.delete(`${BASE_URL_RECEIPT}/${nightlyReceiptId}`);
  } catch (error) {
    throw error;
  }
};

export const totalUnpaid = async () => {
  try {
    const response = await apiClient.get(`${BASE_URL_RECEIPT}/count-unpaid`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const totalPaid = async () => {
  try {
    const response = await apiClient.get(`${BASE_URL_RECEIPT}/count-paid`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const totalCountReceipts = async () => {
  try {
    const response = await apiClient.get(`${BASE_URL_RECEIPT}/count-total`);
    return response;
  } catch (error) {
    throw error;
  }
};
