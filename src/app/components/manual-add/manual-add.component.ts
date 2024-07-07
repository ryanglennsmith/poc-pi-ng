import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { ExitModalService } from '../../services/exit-modal.service';
import { FormContextService } from '../../services/form-context.service';
import Person from '../../types/Person';
import { PaginationService } from '../../services/pagination.service';
import { Router } from '@angular/router';

interface PersonAdded extends Person {
  status: string;
  selected: boolean;
}

@Component({
  selector: 'app-manual-add',
  standalone: true,
  imports: [ReactiveFormsModule, AddModalComponent],
  templateUrl: './manual-add.component.html',
  styleUrl: './manual-add.component.scss',
})
export class ManualAddComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    public modalService: ExitModalService,
    public formCtxSvc: FormContextService,
    public pagination: PaginationService,
    private router: Router
  ) {}
  ngOnInit() {
    this.previewForm = this.formBuilder.group({
      selectedPeople: this.formBuilder.array(['selectedPerson']),
    });
    this.peopleAddedSignal = this.formCtxSvc.peopleAddedSignal();
    this.peopleAdded = this.peopleAddedSignal!.map((person) => {
      return {
        ...person,
        status: 'added',
        selected: false,
      };
    });
    this.paginatedPeople = this.pagination.paginate(this.peopleAdded);

    this.pages = this.paginatedPeople.length;
    this.globalAssignment = this.formCtxSvc.globalAssignmentSignal();
  }
  previewForm!: FormGroup;
  peopleAddedSignal: Person[] | null = null;
  peopleAdded: PersonAdded[] | null = null;
  paginatedPeople: PersonAdded[][] = [];
  pages: number = 0;
  currentPage: number = 1;
  selectedPeople: PersonAdded[] = [];
  globalAssignment = false;
  placeholder = () => {
    this.router.navigate(['/preview']);
    console.log('placeholder');
  };
  openAddModal = () => {
    this.modalService.showAddPeopleModal();
  };
  toggleSelected = (event: Event, person: PersonAdded) => {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      console.table(person);
      this.addSelectedPerson(person);
    } else {
      this.removeSelectedPerson(person);
    }
  };
  handleSelected = (e: Event) => {
    const selectedEvent = e.target as HTMLSelectElement;
    const selectedValue = selectedEvent.value;
    if (selectedValue === 'add') {
      this.addPeopleToItem();
    } else if (selectedValue === 'remove') {
      this.removePeopleFromItem();
    }
  };
  addSelectedPerson = (person: PersonAdded) => {
    person.selected = true;
    this.selectedPeople = [...this.selectedPeople, person];
  };
  removeSelectedPerson = (person: PersonAdded) => {
    person.selected = false;
    this.selectedPeople = this.selectedPeople.filter(
      (selectedPerson) => selectedPerson.id !== person.id
    );
  };
  addPeopleToItem = () => {
    this.selectedPeople.forEach((person) => {
      person.status = 'added';
    });

    const peopleToAdd = this.peopleAdded!.filter(
      (person) => person.status === 'added'
    );
    this.formCtxSvc.setPeopleAdded(peopleToAdd, this.globalAssignment);
    console.table(this.formCtxSvc.peopleAddedSignal());
  };
  removePeopleFromItem = () => {
    this.selectedPeople.forEach((person) => {
      person.status = 'removed';
    });
    const peopleToAdd = this.peopleAdded!.filter((person) => {
      return person.status === 'added';
    });
    this.formCtxSvc.setPeopleAdded(peopleToAdd, this.globalAssignment);
    console.table(this.formCtxSvc.peopleAddedSignal());
  };
}
