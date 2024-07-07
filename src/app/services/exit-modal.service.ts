import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExitModalService {
  isVisible = signal(false);
  addPeopleModalisVisible = signal(false);

  get addPeopleModalSignal() {
    return this.addPeopleModalisVisible;
  }

  get showModalSignal() {
    return this.isVisible;
  }

  showAddPeopleModal() {
    this.addPeopleModalisVisible.set(true);
  }
  closeAddPeopleModal() {
    this.addPeopleModalisVisible.set(false);
  }
  showModal() {
    this.isVisible.set(true);
  }
  closeModal() {
    this.isVisible.set(false);
  }

  constructor() {}
}
