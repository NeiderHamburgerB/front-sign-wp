import { createSlice } from "@reduxjs/toolkit";
import {
  requestCardToken,
  fetchPaymentTokens,
  createPayment,
  checkPaymentStatus,
} from "../actions/checkoutActions";
import { CheckoutState } from "../types/Checkout";

const initialState: CheckoutState = {
  cardToken: null,
  cardData: null,
  deliveryData: null,
  acceptanceToken: null,
  personalDataAuthToken: null,
  permalinkA: null,
  permalinkB: null,
  acceptedTerms: false,
  loading: false,
  error: null,
  id: null,
  paymentStatus: null,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCardData: (state, action) => {
      state.cardData = action.payload;
    },
    setDeliveryData: (state, action) => {
      state.deliveryData = action.payload;
    },
    setAcceptedTerms: (state, action) => {
      state.acceptedTerms = action.payload;
    },
  },
  extraReducers: (builder) => {
    // requestCardToken
    builder
      .addCase(requestCardToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestCardToken.fulfilled, (state, action) => {
        state.loading = false;
        state.cardToken = action.payload;
      })
      .addCase(requestCardToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Error obteniendo token de la tarjeta";
      });

    // fetchPaymentTokens
    builder
      .addCase(fetchPaymentTokens.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentTokens.fulfilled, (state, action) => {
        state.loading = false;
        state.acceptanceToken = action.payload.acceptanceToken;
        state.personalDataAuthToken = action.payload.personalDataAuthToken;
        state.permalinkA = action.payload.permalinkA;
        state.permalinkB = action.payload.permalinkB;
      })
      .addCase(fetchPaymentTokens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Error al obtener tokens de pago";
      });

    // createPayment
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Error al crear pago";
      });

    // checkPaymentStatus
    builder
      .addCase(checkPaymentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkPaymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = action.payload;
      })
      .addCase(checkPaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Error consultando estado del pago";
      });
  },
});

export const { setCardData, setDeliveryData, setAcceptedTerms } = checkoutSlice.actions;
export default checkoutSlice.reducer;
