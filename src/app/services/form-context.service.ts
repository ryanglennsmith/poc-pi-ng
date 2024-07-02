import { Injectable, signal } from '@angular/core';
import PaymentItemDetails from '../types/PaymentItemDetails';
import ItemQuantities from '../types/ItemQuantities';
import ItemCosts from '../types/ItemCosts';

@Injectable({
  providedIn: 'root',
})
export class FormContextService {
  paymentItemDetails = signal<PaymentItemDetails | null>(null);
  itemQuantities = signal<ItemQuantities | null>(null);
  paymentItemsCosts = signal<ItemCosts | null>(null);

  get itemQuantitiesSignal() {
    return this.itemQuantities;
  }

  get paymentItemDetailsSignal() {
    return this.paymentItemDetails;
  }

  get paymentItemsCostsSignal() {
    return this.paymentItemsCosts;
  }

  setPaymentItemDetails = (details: PaymentItemDetails) => {
    this.paymentItemDetails.set(details);
    console.table(details);
  };

  setItemQuantities = (quantities: ItemQuantities) => {
    this.itemQuantities.set(quantities);
    console.table(quantities);
  };

  setPaymentItemsCosts = (costs: ItemCosts) => {
    this.paymentItemsCosts.set(costs);
    console.table(costs);
  };

  constructor() {}
}
