import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { ExitModalService } from '../../services/exit-modal.service';

@Component({
  selector: 'app-manual-add',
  standalone: true,
  imports: [ReactiveFormsModule, AddModalComponent],
  templateUrl: './manual-add.component.html',
  styleUrl: './manual-add.component.scss',
})
export class ManualAddComponent {
  constructor(
    private formBuilder: FormBuilder,
    public modalService: ExitModalService
  ) {
    // this.manualForm = this.formBuilder.group({
    //   name: '',
    //   year: '',
    //   groups: this.formBuilder.array([]),
    //   email: '',
    //   phone: '',
    // });
  }
  // manualForm: FormGroup;
  placeholder = () => {
    console.log('placeholder');
  };
  openAddModal = () => {
    this.modalService.showModal();
  };

  emptyTable = true;
}
