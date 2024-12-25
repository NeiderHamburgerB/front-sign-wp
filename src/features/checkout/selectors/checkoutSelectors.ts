import { RootState } from "../../../app/store";

export const selectCardToken = (state: RootState) => state.checkout.cardToken;
export const selectLoading = (state: RootState) => state.checkout.loading;
export const selectError = (state: RootState) => state.checkout.error;
export const selectDeliveryData = (state: RootState) => state.checkout.deliveryData;
export const selectPaymentStatus = (state: RootState) => state.checkout.paymentStatus;
