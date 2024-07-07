import { Injectable, signal } from '@angular/core';
import PaymentItemDetails from '../types/PaymentItemDetails';
import ItemQuantities from '../types/ItemQuantities';
import ItemCosts from '../types/ItemCosts';
import Person from '../types/Person';

@Injectable({
  providedIn: 'root',
})
export class FormContextService {
  paymentItemDetails = signal<PaymentItemDetails | null>(null);
  itemQuantities = signal<ItemQuantities | null>(null);
  paymentItemsCosts = signal<ItemCosts | null>(null);
  peopleAdded = signal<Person[] | null>(null);
  showPeoplePreview = signal(false); // reset to false after use
  peopleInitialState = signal(true); // reset to true after use
  globalAssignment = signal(false);

  get showPeopleInitialStateSignal() {
    return this.peopleInitialState;
  }

  get showPeoplePreviewSignal() {
    return this.showPeoplePreview;
  }

  get peopleAddedSignal() {
    return this.peopleAdded;
  }

  get itemQuantitiesSignal() {
    return this.itemQuantities;
  }

  get paymentItemDetailsSignal() {
    return this.paymentItemDetails;
  }

  get paymentItemsCostsSignal() {
    return this.paymentItemsCosts;
  }

  get globalAssignmentSignal() {
    return this.globalAssignment;
  }

  setPeopleInitialState = (show: boolean) => {
    this.peopleInitialState.set(show);
  };
  setShowPeoplePreview = (show: boolean) => {
    this.showPeoplePreview.set(show);
  };

  setPeopleAdded = (people: Person[], global: boolean) => {
    this.globalAssignment.set(global);
    this.peopleAdded.set(people);
    console.log('People added');
    console.table(people);
  };

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
