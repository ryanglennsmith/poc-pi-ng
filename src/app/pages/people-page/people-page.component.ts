import { Component } from '@angular/core';
import { GlobalAddComponent } from '../../components/global-add/global-add.component';
import { ManualAddComponent } from '../../components/manual-add/manual-add.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-people-page',
  standalone: true,
  imports: [ManualAddComponent, GlobalAddComponent, ReactiveFormsModule],
  templateUrl: './people-page.component.html',
  styleUrl: './people-page.component.scss',
})
export class PeoplePageComponent {
  constructor(private formBuilder: FormBuilder) {
    this.peopleForm = this.formBuilder.group({
      global: 'false',
      manual: 'false',
    });
  }
  peopleForm: FormGroup;
  showGlobal = false;
  showManual = false;
  successResponse = false;

  toggleGlobal() {
    this.showGlobal = !this.showGlobal;
    this.showManual = false;
  }
  toggleManual() {
    this.showManual = !this.showManual;
    this.showGlobal = false;
  }
  showAssignment() {
    this.showGlobal = false;
    this.showManual = false;
  }
  onSubmit() {
    console.log(this.peopleForm.value);
    this.successResponse = true;
  }
  cancelClicked() {
    console.log('Cancel clicked');
  }
  get showGlobalValue() {
    return this.showGlobal;
  }
}
