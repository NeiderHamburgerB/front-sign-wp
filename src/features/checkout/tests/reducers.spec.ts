import checkoutReducer, {
    setCardData,
    setDeliveryData,
    setAcceptedTerms,
} from "../reducers/checkoutSlice";
import {
    requestCardToken,
    fetchPaymentTokens,
    createPayment,
    checkPaymentStatus,
} from "../actions/checkoutActions";
import { describe, it, expect } from "@jest/globals";

const initialState = {
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

describe("checkoutSlice Reducer", () => {
    // Test del estado inicial
    it("should return the initial state", () => {
        const state = checkoutReducer(undefined, { type: "" });
        expect(state).toEqual(initialState);
    });

    // Test de reducers
    it("should handle setCardData", () => {
        const cardData = { number: "1234", cvc: "123", exp_month: "12", exp_year: "25", card_holder: "John Doe", quotas: "1", email: "test@test.com" };
        const state = checkoutReducer(initialState, setCardData(cardData));
        expect(state.cardData).toEqual(cardData);
    });

    it("should handle setDeliveryData", () => {
        const deliveryData = { address: "123 St", city: "City", phone: "1234567890" };
        const state = checkoutReducer(initialState, setDeliveryData(deliveryData));
        expect(state.deliveryData).toEqual(deliveryData);
    });

    it("should handle setAcceptedTerms", () => {
        const state = checkoutReducer(initialState, setAcceptedTerms(true));
        expect(state.acceptedTerms).toBe(true);
    });

    // Test de extraReducers
    describe("Extra Reducers", () => {
        // Estados de requestCardToken
        it("should handle requestCardToken.pending", () => {
            const action = { type: requestCardToken.pending.type };
            const state = checkoutReducer(initialState, action);
            expect(state.loading).toBe(true);
            expect(state.error).toBeNull();
        });

        it("should handle requestCardToken.fulfilled", () => {
            const action = { type: requestCardToken.fulfilled.type, payload: "token_123" };
            const state = checkoutReducer(initialState, action);
            expect(state.loading).toBe(false);
            expect(state.cardToken).toBe("token_123");
        });

        it("should handle requestCardToken.rejected", () => {
            const action = { type: requestCardToken.rejected.type, payload: "Error" };
            const state = checkoutReducer(initialState, action);
            expect(state.loading).toBe(false);
            expect(state.error).toBe("Error");
        });

        // Estados de fetchPaymentTokens
        it("should handle fetchPaymentTokens.fulfilled", () => {
            const action = {
                type: fetchPaymentTokens.fulfilled.type,
                payload: {
                    acceptanceToken: "accept_123",
                    personalDataAuthToken: "auth_123",
                    permalinkA: "linkA",
                    permalinkB: "linkB",
                },
            };
            const state = checkoutReducer(initialState, action);
            expect(state.loading).toBe(false);
            expect(state.acceptanceToken).toBe("accept_123");
            expect(state.personalDataAuthToken).toBe("auth_123");
            expect(state.permalinkA).toBe("linkA");
            expect(state.permalinkB).toBe("linkB");
        });

        it("should handle fetchPaymentTokens.rejected with no payload", () => {
            const action = { type: fetchPaymentTokens.rejected.type };
            const state = checkoutReducer(initialState, action);
            expect(state.loading).toBe(false);
            expect(state.error).toBe("Error al obtener tokens de pago");
        });

        // Estados de createPayment
        it("should handle createPayment.fulfilled", () => {
            const action = { type: createPayment.fulfilled.type, payload: "payment_123" };
            const state = checkoutReducer(initialState, action);
            expect(state.loading).toBe(false);
            expect(state.id).toBe("payment_123");
        });

        it("should handle createPayment.rejected", () => {
            const action = { type: createPayment.rejected.type, payload: "Error creating payment" };
            const state = checkoutReducer(initialState, action);
            expect(state.loading).toBe(false);
            expect(state.error).toBe("Error creating payment");
        });

        // Estados de checkPaymentStatus
        it("should handle checkPaymentStatus.fulfilled", () => {
            const action = { type: checkPaymentStatus.fulfilled.type, payload: "APPROVED" };
            const state = checkoutReducer(initialState, action);
            expect(state.loading).toBe(false);
            expect(state.paymentStatus).toBe("APPROVED");
        });

        it("should handle checkPaymentStatus.rejected", () => {
            const action = { type: checkPaymentStatus.rejected.type, payload: "Error fetching status" };
            const state = checkoutReducer(initialState, action);
            expect(state.loading).toBe(false);
            expect(state.error).toBe("Error fetching status");
        });

        // Estado desconocido
        it("should handle unknown action", () => {
            const action = { type: "unknown_action" };
            const state = checkoutReducer(initialState, action);
            expect(state).toEqual(initialState);
        });
    });
});
