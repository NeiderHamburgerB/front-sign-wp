export interface CardData {
  number: string;
  cvc: string;
  exp_month: string;
  exp_year: string;
  card_holder: string;
  quotas: string;
  email: string;
}

export interface DeliveryData {
  address: string;
  city: string;
  phone: string;
}

export interface TokenDataResponse {
  acceptanceToken: string;
  personalDataAuthToken: string;
  permalinkA: string;
  permalinkB: string;
}


export interface CheckoutState {
  cardToken: string | null;             
  cardData: CardData | null;
  deliveryData: DeliveryData | null;
  acceptanceToken: string | null;
  personalDataAuthToken: string | null;
  permalinkA: string | null;
  permalinkB: string | null;
  acceptedTerms: boolean;
  loading: boolean;
  error: string | null;
  id: string | null;            
  paymentStatus: string | null;       
}
export interface Props {
  onClose: () => void;
}