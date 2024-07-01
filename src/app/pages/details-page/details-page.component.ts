import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExitModalComponent } from '../../components/exit-modal/exit-modal.component';
import { ExitModalService } from '../../services/exit-modal.service';
import CategoryField from '../../types/CategoryField';
import NotesField from '../../types/NotesField';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [ReactiveFormsModule, ExitModalComponent],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent {
  constructor(
    private formBuilder: FormBuilder,
    public modalService: ExitModalService
  ) {
    this.paymentItemForm = this.formBuilder.group({
      itemName: ['', Validators.required],
      itemShortName: ['', Validators.required],
      description: ['', Validators.required],
      notes: 'No notes field',
      category: 'None',
      requireConsent: false,
      enableAlert: false,
      enablePayPoint: false,
    });
  }
  paymentItemForm: FormGroup;
  showModal = false;
  exitWithoutSaving = () => {
    this.modalService.showModal();
    console.log('exiting without saving');
    // logic to exit without saving / show modal
  };
  handleSubmit = () => {
    console.table(this.paymentItemForm.value);
    console.log(this.paymentItemForm.status);
    console.log(this.paymentItemForm.value.itemName);
    // logic to handle validation and submit
  };

  //iterate through enum for categories
  categories = Object.values(CategoryField);
  //iterate through enum for notes
  notes = Object.values(NotesField);

  get itemName() {
    return this.paymentItemForm.get('itemName');
  }
  get itemShortName() {
    return this.paymentItemForm.get('itemShortName');
  }
  get description() {
    return this.paymentItemForm.get('description');
  }
}
