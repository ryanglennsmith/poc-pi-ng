import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
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
export class QuantitiesPageComponent {
  constructor(
    private formBuilder: FormBuilder,
    public modalService: ExitModalService,
    private formCtxSvc: FormContextService
  ) {
    this.quantitiesForm = this.formBuilder.group({
      limitedPlacesOption: 'unlimited',
      limitedQuantityOption: 'unlimited',
      repeatableOption: 'one-time',
      numberOfPlaces: [0, this.limitedPlacesValidator],
      stockAvailable: 0,
      minimum: 0,
      maximum: 0,
    });
  }
  showLimitedQtyField = false;
  toggleLimitedQtyField = () => {
    this.showLimitedQtyField =
      this.quantitiesForm.value.limitedQuantityOption === 'limited';
    console.log(`thing ${this.quantitiesForm.value.limitedQuantityOption}`);
  };
  showLimitedPlacesField = false;
  toggleLimitedPlacesField = () => {
    this.showLimitedPlacesField =
      this.quantitiesForm.value.limitedPlacesOption === 'limited';
    console.log(`thing ${this.quantitiesForm.value.limitedPlacesOption}`);
  };
  quantitiesForm: FormGroup;
  handleSubmit = () => {
    this.submitClicked = true;
    console.log(this.quantitiesForm.valid);
    const quantities: ItemQuantities = {
      limitedPlaces:
        this.quantitiesForm.value.limitedPlacesOption === 'limited',
      limitedQuantity:
        this.quantitiesForm.value.limitedQuantityOption === 'limited',
      repeatable: this.quantitiesForm.value.repeatableOption === 'repeatable',
      numberOfPlaces: this.quantitiesForm.value.numberOfPlaces,
      stockAvailable: this.quantitiesForm.value.stockAvailable,
      minimum: this.quantitiesForm.value.minimum,
      maximum: this.quantitiesForm.value.maximum,
    };
    this.formCtxSvc.setItemQuantities(quantities);
  };

  exitWithoutSaving = () => {
    this.modalService.showModal();
    console.log('exiting without saving');
  };

  submitClicked = false;

  limitedPlacesValidator = (control: AbstractControl) => {
    if (
      this.quantitiesForm &&
      this.quantitiesForm.value.limitedPlacesOption === 'limited' &&
      control.value === 0
    ) {
      return { required: true };
    }
    return { required: false };
  };

  get limitedPlacesOption() {
    return this.quantitiesForm.get('limitedPlacesOption');
  }

  get numberOfPlacesOption() {
    return this.quantitiesForm.get('numberOfPlaces');
  }
}
