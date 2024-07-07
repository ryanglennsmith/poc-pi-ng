import { Component } from '@angular/core';
import { ExitModalService } from '../../services/exit-modal.service';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MockBackendService } from '../../services/mock-backend.service';
import Person from '../../types/Person';
import { FormContextService } from '../../services/form-context.service';

@Component({
  selector: 'app-add-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.scss',
})
export class AddModalComponent {
  constructor(
    public modalService: ExitModalService,
    private formBuilder: FormBuilder,
    public backend: MockBackendService,
    public formCtxSvc: FormContextService
  ) {
    this.addPeopleForm = this.formBuilder.group({
      assignmentType: 'manual',
    });
    if (this.backend.peopleResultSignal() !== null) {
      this.people = this.backend.peopleResultSignal();
    }
    if (this.backend.yearGroupsResultSignal() !== null) {
      this.yearGroups = this.backend.yearGroupsResultSignal();
    }
  }
  addPeopleForm: FormGroup;
  closeModal = () => {
    this.modalService.closeAddPeopleModal();
  };
  selectedGroups: string[] = [];

  yearGroups: string[] | null = null;
  people: Person[] | null = null;
  selectedPeople: Person[] = [];
  pushGroup = (e: Event) => {
    const element = e.target as HTMLSelectElement;
    const selectedGroup = element.value;
    this.selectedGroups = [...this.selectedGroups, selectedGroup];
    console.log(this.selectedGroups);
  };
  pushPerson = (e: Event) => {
    const element = e.target as HTMLSelectElement;
    const selectedId = element.value;
    const person = this.people!.find(
      (person) => person.id === Number(selectedId)
    );
    if (!person) {
      console.error('Person not found');
      return;
    }
    this.selectedPeople = [...this.selectedPeople, person];
    console.log(this.selectedPeople);
  };
  popGroup = (e: Event) => {
    const element = e.target as HTMLSpanElement;
    const group = element.id;
    this.selectedGroups = this.selectedGroups.filter((selectedGroup) => {
      return selectedGroup !== group;
    });
  };
  popPerson = (e: Event) => {
    const element = e.target as HTMLSpanElement;
    const personId = element.id;
    const id = Number(personId);
    this.selectedPeople = this.selectedPeople.filter(
      (person) => person.id !== id
    );
  };
  placeholder = () => {
    console.log('placeholder');
  };

  onSubmit() {
    let peopleToAdd = this.selectedPeople;
    if (this.addPeopleForm.value.assignmentType === 'global') {
      console.log('Global assignment');
      peopleToAdd = this.people!;
      this.formCtxSvc.setPeopleAdded(peopleToAdd, true);
      this.formCtxSvc.setShowPeoplePreview(true);
      this.formCtxSvc.setPeopleInitialState(false);
      this.modalService.closeAddPeopleModal();
      return;
    }
    if (this.selectedGroups.includes('All school')) {
      peopleToAdd = this.people!;
      this.formCtxSvc.setPeopleAdded(peopleToAdd, false);
      this.formCtxSvc.setShowPeoplePreview(true);
      this.formCtxSvc.setPeopleInitialState(false);
      this.modalService.closeAddPeopleModal();
      return;
    }
    if (this.selectedGroups.includes('All pupils')) {
      const pupils = this.people!.filter(
        (person) =>
          person.year_group === 'Year 1' ||
          person.year_group === 'Year 2' ||
          person.year_group === 'Year 3'
      );
      peopleToAdd = [...peopleToAdd, ...pupils];
    }
    if (this.selectedGroups.includes('All staff')) {
      const staff = this.people!.filter(
        (person) => person.year_group === 'staff'
      );
      peopleToAdd = [...peopleToAdd, ...staff];
    }
    if (this.selectedGroups.length > 0) {
      this.selectedGroups.forEach((group) => {
        console.log(`Group: ${group}`);
        const peopleInGroup = this.people!.filter(
          (person) => person.year_group === group
        );
        peopleToAdd = [...peopleToAdd, ...peopleInGroup];
      });
    }
    this.formCtxSvc.setPeopleAdded(peopleToAdd, false);
    this.formCtxSvc.setShowPeoplePreview(true);
    this.formCtxSvc.setPeopleInitialState(false);
    this.modalService.closeAddPeopleModal();
  }
}
