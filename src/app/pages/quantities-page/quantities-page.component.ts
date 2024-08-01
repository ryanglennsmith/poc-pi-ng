import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ExitModalComponent } from '../../components/exit-modal/exit-modal.component';
import { ExitModalService } from '../../services/exit-modal.service';
import { FormContextService } from '../../services/form-context.service';
import ItemQuantities from '../../types/ItemQuantities';

@Component({
  selector: 'app-quantities-page',
  standalone: true,
  imports: [ReactiveFormsModule, ExitModalComponent],
  templateUrl: './quantities-page.component.html',
  styleUrl: './quantities-page.component.scss',
})
export class QuantitiesPageComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    public modalService: ExitModalService,
    private formCtxSvc: FormContextService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.quantitiesFormValue = this.formCtxSvc.itemQuantitiesSignal();
    this.quantitiesForm = this.formBuilder.group({
      limitedPlacesOption: this.quantitiesFormValue?.limitedPlaces
        ? 'limited'
        : 'unlimited',
      limitedQuantityOption: this.quantitiesFormValue?.limitedQuantity
        ? 'limited'
        : 'unlimited',
      repeatableOption: this.quantitiesFormValue?.repeatable
        ? 'repeatable'
        : 'one-time',
      numberOfPlaces: [
        this.quantitiesFormValue?.numberOfPlaces ?? 0,
        this.limitedPlacesValidator,
      ],
      minimum: [
        this.quantitiesFormValue?.minimum ?? 0,
        this.limitedQuantityValidator
      ],
      maximum: [
        this.quantitiesFormValue?.maximum ?? 0,
        this.limitedQuantityValidator
      ],
      default: [
        this.quantitiesFormValue?.default ?? 0,
        this.limitedQuantityValidator
      ],
    });
  }
  showLimitedQtyField = false;
  quantitiesFormValue: ItemQuantities | null = null;
  toggleLimitedQtyField = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    this.limitedQuantityOption?.setValue(value);
    this.showLimitedQtyField =
      this.quantitiesForm.value.limitedQuantityOption === 'limited';
  };
  showLimitedPlacesField = false;
  toggleLimitedPlacesField = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    this.limitedPlacesOption?.setValue(value);
    this.showLimitedPlacesField =
      this.quantitiesForm.value.limitedPlacesOption === 'limited';
  };
  quantitiesForm: FormGroup = new FormGroup({});
  handleSubmit = () => {
    this.submitClicked = true;
   
    const quantities: ItemQuantities = {
      limitedPlaces:
        this.quantitiesForm.value.limitedPlacesOption === 'limited',
      limitedQuantity:
        this.quantitiesForm.value.limitedQuantityOption === 'limited',
      repeatable: this.quantitiesForm.value.repeatableOption === 'repeatable',
      numberOfPlaces: this.quantitiesForm.value.numberOfPlaces,
      minimum: this.quantitiesForm.value.minimum,
      maximum: this.quantitiesForm.value.maximum,
      default: this.quantitiesForm.value.default,
    };
    this.formCtxSvc.setItemQuantities(quantities);
    this.revalidateForm();
     if (this.quantitiesForm.invalid) {
       console.log('invalid form');
       return;
     }
    this.router.navigate(['/costs']);
  };

  exitWithoutSaving = () => {
    this.modalService.showModal();
    console.log('exiting without saving');
  };

  submitClicked = false;

  revalidateForm = () => {
      if (this.formCtxSvc.itemQuantitiesSignal()?.limitedPlaces) {
        this.numberOfPlacesOption?.setValidators(this.limitedPlacesValidator);
      }
      this.numberOfPlacesOption?.updateValueAndValidity();
      if (this.formCtxSvc.itemQuantitiesSignal()?.limitedQuantity) {
        this.minimumOption?.setValidators(this.limitedQuantityValidator);
        this.maximumOption?.setValidators(this.limitedQuantityValidator);
        this.defaultOption?.setValidators(this.limitedQuantityValidator);
      }
      this.minimumOption?.updateValueAndValidity();
      this.maximumOption?.updateValueAndValidity();
      this.defaultOption?.updateValueAndValidity();
  }

  limitedPlacesValidator = (control: AbstractControl) => {
    if (
      this.quantitiesForm &&
      this.quantitiesForm.value.limitedPlacesOption === 'limited' &&
      control.value === 0
    ) {
      return { required: true };
    }
    return null;
  };

  //this setup does not handle max being smaller than min
  limitedQuantityValidator = (control: AbstractControl) => {
    if (
      this.quantitiesForm &&
      this.quantitiesForm.value.limitedQuantityOption === 'limited' &&
      control.value === 0
    ) {
      return { required: true };
    }
    return null;
  };

  get limitedPlacesOption() {
    return this.quantitiesForm.get('limitedPlacesOption');
  }

  get numberOfPlacesOption() {
    return this.quantitiesForm.get('numberOfPlaces');
  }

  get limitedQuantityOption() {
    return this.quantitiesForm.get('limitedQuantityOption');
  }
  get stockAvailableOption() {
    return this.quantitiesForm.get('stockAvailable');
  }
  get minimumOption() {
    return this.quantitiesForm.get('minimum');
  }
  get maximumOption() {
    return this.quantitiesForm.get('maximum');
  }
  get defaultOption() {
    return this.quantitiesForm.get('default');
  }

  goBack = () => {
    this.router.navigate(['/details']);
  };
}
