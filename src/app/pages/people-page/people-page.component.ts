import { Component } from '@angular/core';
import { GlobalAddComponent } from '../../components/global-add/global-add.component';
import { ManualAddComponent } from '../../components/manual-add/manual-add.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExitModalService } from '../../services/exit-modal.service';
import { AddModalComponent } from '../../components/add-modal/add-modal.component';
import { MockBackendService } from '../../services/mock-backend.service';
import { FormContextService } from '../../services/form-context.service';
import { Router } from '@angular/router';
import { ExitModalComponent } from '../../components/exit-modal/exit-modal.component';

@Component({
  selector: 'app-people-page',
  standalone: true,
  imports: [
    ManualAddComponent,
    GlobalAddComponent,
    ReactiveFormsModule,
    AddModalComponent,
    ExitModalComponent
  ],
  templateUrl: './people-page.component.html',
  styleUrl: './people-page.component.scss',
})
export class PeoplePageComponent {
  constructor(
    private formBuilder: FormBuilder,
    public modalService: ExitModalService,
    public backend: MockBackendService,
    public formCtxSvc: FormContextService,
    private router: Router
  ) {
    this.peopleForm = this.formBuilder.group({});
  }
  people = this.backend.people;
  peopleForm: FormGroup;
  showGlobal = false;
  showManual = false;
  successResponse = false;

  onSubmit = () => {
    console.log(this.peopleForm.value);
    // this.successResponse = true;
  }
  cancelClicked = () => {
    this.modalService.showModal();
    console.log('Cancel clicked');
  }

  showAddModal = () => {
    this.modalService.showAddPeopleModal();
    console.log('Show Add Modal');
  }
  get showGlobalValue() {
    return this.showGlobal;
  }
  goBack = () => {
    this.router.navigate(['/costs']);
  };
}
