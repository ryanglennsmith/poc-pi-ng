import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExitModalService {
  isVisible = signal(false);
  get showModalSignal() {
    return this.isVisible;
  }
  showModal() {
    this.isVisible.set(true);
  }
  closeModal() {
    this.isVisible.set(false);
  }

  constructor() {}
}
