import { Component } from '@angular/core';
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
export class QuantitiesPageComponent {
  constructor(
    private formBuilder: FormBuilder,
    public modalService: ExitModalService,
    private formCtxSvc: FormContextService,
    private router: Router
  ) {
    this.quantitiesForm = this.formBuilder.group({
      limitedPlacesOption: 'unlimited',
      limitedQuantityOption: 'unlimited',
      repeatableOption: 'one-time',
      numberOfPlaces: [0, this.limitedPlacesValidator],
      stockAvailable: [0, this.limitedQuantityValidator],
      minimum: [0, this.limitedQuantityValidator],
      maximum: [0, this.limitedQuantityValidator],
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
    if (this.quantitiesForm.invalid) {
      return;
    }
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
    this.router.navigate(['/costs']);
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
    return null;
  };

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
  //TODO delete this
  goForward = () => {
    this.router.navigate(['/costs']);
  };
  goBack = () => {
    this.router.navigate(['/details']);
  };
}
