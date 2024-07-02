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
import PaymentItemDetails from '../../types/PaymentItemDetails';
import { FormContextService } from '../../services/form-context.service';
import { Router } from '@angular/router';

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
    public modalService: ExitModalService,
    private formCtxSvc: FormContextService,
    private router: Router
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
  submitClicked = false;

  exitWithoutSaving = () => {
    this.modalService.showModal();
    console.log('exiting without saving');
    // logic to exit without saving / show modal
  };
  handleSubmit = () => {
    this.submitClicked = true;
    if (this.paymentItemForm.invalid) {
      return;
    }
    this.formCtxSvc.setPaymentItemDetails(
      this.paymentItemForm.value as PaymentItemDetails
    );
    this.router.navigate(['/quantities']);
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
  goForward = () => {
    this.router.navigate(['/quantities']);
  };
}
