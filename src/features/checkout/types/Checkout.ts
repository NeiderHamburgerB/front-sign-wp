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
  cardToken: string ;             
  cardData: CardData ;
  deliveryData: DeliveryData ;
  acceptanceToken: string ;
  personalDataAuthToken: string ;
  permalinkA: string ;
  permalinkB: string ;
  acceptedTerms: boolean;
  loading: boolean;
  error: string ;
  id: string ;            
  paymentStatus: string ;       
}
export interface Props {
  onClose: () => void;
}