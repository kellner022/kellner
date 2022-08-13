//New -> Paid -> Reveived -> Commented -> Completed
export enum OrderStatus {
  New,
  Paid,
  Received,
  Commented,
  Completed,
}

export enum PaymentMethod {
  Apple,
  Paypal,
  Visa,
  Mastercard,
  Wechat,
  Alipay,
}

export enum Currency {
  USD,
  EU,
  AUD,
  RMB,
  HKD,
  JPY,
  KRW,
}


const currencyText = (currency: Currency): string => {
  let text = '';
  switch(currency) {
    case Currency.AUD:
    case Currency.HKD:
    case Currency.USD:
      text = '$';
      break;
    case Currency.EU:
      text = '€';
      break;
    case Currency.RMB:
    case Currency.JPY:
      text = '¥';
      break;
    default:
      text = '€';
  }

  return text;
};

export { currencyText };