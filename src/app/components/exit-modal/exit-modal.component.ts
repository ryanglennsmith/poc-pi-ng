import { Component } from '@angular/core';
import { ExitModalService } from '../../services/exit-modal.service';

@Component({
  selector: 'app-exit-modal',
  standalone: true,
  imports: [],
  templateUrl: './exit-modal.component.html',
  styleUrl: './exit-modal.component.scss',
})
export class ExitModalComponent {
  constructor(public modalService: ExitModalService) {}
  closeModal = () => {
    this.modalService.closeModal();
  };
}
