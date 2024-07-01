import { Injectable, signal } from '@angular/core';
import PaymentItemDetails from '../types/PaymentItemDetails';
import ItemQuantities from '../types/ItemQuantities';

@Injectable({
  providedIn: 'root',
})
export class FormContextService {
  paymentItemDetails = signal<PaymentItemDetails | null>(null);
  itemQuantities = signal<ItemQuantities | null>(null);

  get itemQuantitiesSignal() {
    return this.itemQuantities;
  }

  get paymentItemDetailsSignal() {
    return this.paymentItemDetails;
  }

  setPaymentItemDetails = (details: PaymentItemDetails) => {
    this.paymentItemDetails.set(details);
    console.table(details);
  };

  setItemQuantities = (quantities: ItemQuantities) => {
    this.itemQuantities.set(quantities);
    console.table(quantities);
  };

  constructor() {}
}
