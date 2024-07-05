import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ExitModalComponent } from '../../components/exit-modal/exit-modal.component';
import { ExitModalService } from '../../services/exit-modal.service';
import { FormContextService } from '../../services/form-context.service';
import ItemCosts from '../../types/ItemCosts';

@Component({
  selector: 'app-costs-page',
  standalone: true,
  imports: [ReactiveFormsModule, ExitModalComponent],
  templateUrl: './costs-page.component.html',
  styleUrl: './costs-page.component.scss',
})
export class CostsPageComponent {
  constructor(
    private formBuilder: FormBuilder,
    public modalService: ExitModalService,
    private formCtxSvc: FormContextService,
    private router: Router
  ) {
    this.costsForm = this.formBuilder.group({
      variableCostOption: 'fixed',
      fixedCost: [0, this.fixedCostValidator],
      hasDueDate: 'false',
      dueDate: ['', this.dueDateValidator],
      bankAccount: ['', Validators.required],
      variableDefault: [0, this.variableCostValidator],
      variableMin: [0, this.variableCostValidator],
      variableMax: [0, this.variableCostValidator],
      addAccountingCodes: 'false',
    });
  }

  costsForm: FormGroup;
  submitClicked = false;

  fixedCostValidator = (control: AbstractControl) => {
    if (this.costsForm && this.costsForm.value.variableCostOption === 'fixed') {
      if (control.value === 0) {
        return { required: true };
      }
    }
    return null;
  };

  variableCostValidator = (control: AbstractControl) => {
    if (
      this.costsForm &&
      this.costsForm.value.variableCostOption === 'variable'
    ) {
      if (control.value === 0) {
        return { required: true };
      }
    }
    return null;
  };

  dueDateValidator = (control: AbstractControl) => {
    if (this.costsForm && this.costsForm.value.hasDueDate === 'true') {
      if (control.value === '') {
        return { required: true };
      }
    }
    return null;
  };

  //TODO delete this
  goForward = () => {
    this.router.navigate(['/people']);
  };
  goBack = () => {
    this.router.navigate(['/quantities']);
  };
  handleSubmit = () => {
    this.submitClicked = true;
    if (this.costsForm.invalid) {
      return;
    }
    const formCosts: ItemCosts = {
      variableCostOption:
        this.costsForm.value.variableCostOption === 'variable',
      fixedCost: this.costsForm.value.fixedCost,
      variableCostDefault: this.costsForm.value.variableDefault,
      variableCostMin: this.costsForm.value.variableMin,
      variableCostMax: this.costsForm.value.variableMax,
      dueDateOption: this.costsForm.value.hasDueDate === 'true',
      dueDate: this.costsForm.value.dueDate,
      bankAccount: this.costsForm.value.bankAccount,
      accountingCodes: [],
    };
    this.formCtxSvc.setPaymentItemsCosts(formCosts);
    this.router.navigate(['/people']);
  };

  get variableCostOption() {
    return this.costsForm.get('variableCostOption');
  }
  get hasDueDate() {
    return this.costsForm.get('hasDueDate');
  }
  get addAccountingCodes() {
    return this.costsForm.get('addAccountingCodes');
  }
  get fixedCost() {
    return this.costsForm.get('fixedCost');
  }
  get variableDefault() {
    return this.costsForm.get('variableDefault');
  }
  get variableMin() {
    return this.costsForm.get('variableMin');
  }
  get variableMax() {
    return this.costsForm.get('variableMax');
  }
  get dueDate() {
    return this.costsForm.get('dueDate');
  }
  get bankAccount() {
    return this.costsForm.get('bankAccount');
  }

  bankAcctNums = [123456, 123548, 854632];

  exitWithoutSaving = () => {
    this.modalService.showModal();
    console.log('exiting without saving');
  };
}
