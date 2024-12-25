import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { CardData, TokenDataResponse } from "../types/Checkout";

export const API_URL = process.env.VITE_API_MAIN || 'http://localhost:3000/api/main';

// Token de la tarjeta
export const requestCardToken = createAsyncThunk<
  string,
  CardData,
  { rejectValue: string }
>(
  "checkout/requestCardToken",
  async (cardData, { rejectWithValue }) => {
    const resp = await fetch(`${API_URL}/payment/cards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardData),
    });
    if (!resp.ok) {
      return rejectWithValue("Por favor introduce una tarjeta válida.");
    }
    const data = await resp.json();
    return data.data;
  }
);

// Obtener links
export const fetchPaymentTokens = createAsyncThunk<
  TokenDataResponse,
  void,
  { rejectValue: string }
>("checkout/fetchPaymentTokens", async (_, { rejectWithValue }) => {
  const resp = await fetch(`${API_URL}/payment/tokens`);
  if (!resp.ok) {
    return rejectWithValue("Error al obtener tokens de pago.");
  }
  const data = await resp.json();
  return data.data;
});

// Crear pago
export const createPayment = createAsyncThunk<
  string,
  void,
  { rejectValue: string; state: RootState }
>("checkout/createPayment", async (_, { getState, rejectWithValue }) => {
  const state = getState();
  const { selectedProduct } = state.products;
  const { cardToken, deliveryData, acceptanceToken, personalDataAuthToken, cardData } =
    state.checkout;

  const requestBody = {
    address: deliveryData?.address,
    city: deliveryData?.city,
    phone: deliveryData?.phone,
    cardToken,
    acceptanceToken,
    personalDataAuthToken,
    quotas: cardData?.quotas,
    email: cardData?.email,
    firstName: cardData?.card_holder,
    payment: {
      amount: (Number(selectedProduct?.price) || 0) * (Number(selectedProduct?.quantity) || 1),
      currency: "COP",
      items: [
        {
          productId: selectedProduct?.id,
          quantity: selectedProduct?.quantity,
          unitPrice: Number(selectedProduct?.price) || 0,
        },
      ],
    },
  };

  const resp = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!resp.ok) {
    const err = await resp.json();
    return rejectWithValue(err.message || "No se pudo crear el pago.");
  }

  const data = await resp.json();
  return data.data.id;
});

// Consultar estado final y actualizar estado de la orden
export const checkPaymentStatus = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("checkout/checkPaymentStatus", async (id, { rejectWithValue }) => {
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(10000);
  const resp = await fetch(`${API_URL}/payment/verify/${id}`);
  if (!resp.ok) {
    return rejectWithValue("No se pudo consultar el estado del pago.");
  }
  const data = await resp.json();
  let status = data.data.status;
  if (status == 'APPROVED') {
    status = 'Aprobado';
    const resp = await fetch(`${API_URL}/orders/${data.data.reference}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'APPROVED',
        id: data.data.id,
        methodName: data.data.payment_method.extra.brand,
        finalizedAt: data.data.finalized_at
      }),

    });
    if (!resp.ok) {
      return rejectWithValue(`Error ${resp.status}. No se pudo consultar el estado del pago.`);
    }
  } else if (status == 'PENDING') {
    status = 'Pendiente';
  } else {
    status = 'Rechazado';
  }
  return status;
});
