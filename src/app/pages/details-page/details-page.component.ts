import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExitModalComponent } from '../../components/exit-modal/exit-modal.component';
import { ExitModalService } from '../../services/exit-modal.service';
import CategoryField from '../../types/CategoryField';
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
export class DetailsPageComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    public modalService: ExitModalService,
    private formCtxSvc: FormContextService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.itemDetails = this.formCtxSvc.paymentItemDetailsSignal();
    this.paymentItemForm = this.formBuilder.group({
      itemName: [this.itemDetails?.itemName ?? '', Validators.required],
      itemShortName: this.itemDetails?.itemShortName ?? '',
      description: [this.itemDetails?.description ?? '', Validators.required], // i borked the form length validator here and too tired to figure out how to fix it, some kind of async validator error that i need to learn how to fix
      notes: this.itemDetails?.notes ?? 'none',
      category: this.itemDetails?.category ?? 'None',
      requireConsent: this.itemDetails?.requireConsent ?? false,
      enableAlert: this.itemDetails?.enableAlert ?? false,
      enablePayPoint: this.itemDetails?.enablePayPoint ?? false,
    });
  }
  paymentItemForm: FormGroup = new FormGroup({});
  submitClicked = false;
  itemDetails: PaymentItemDetails | null = null;

  exitWithoutSaving = () => {
    this.modalService.showModal();
    console.log('exiting without saving');
    // logic to exit without saving / show modal
  };
  handleSubmit = () => {
    this.submitClicked = true;
    if (this.paymentItemForm!.invalid) {
      return;
    }
    this.formCtxSvc.setPaymentItemDetails(
      this.paymentItemForm!.value as PaymentItemDetails
    );
    this.router.navigate(['/quantities']);
  };

  //iterate through enum for categories
  categories = Object.values(CategoryField);

  get itemName() {
    return this.paymentItemForm!.get('itemName');
  }
  get itemShortName() {
    return this.paymentItemForm!.get('itemShortName');
  }
  get description() {
    return this.paymentItemForm!.get('description');
  }
  goForward = () => {
    this.router.navigate(['/quantities']);
  };
}
