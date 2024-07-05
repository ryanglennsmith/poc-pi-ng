import { Component } from '@angular/core';
import { ExitModalService } from '../../services/exit-modal.service';
import {
  FormArray,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

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
    private formBuilder: FormBuilder
  ) {
    this.addPeopleForm = this.formBuilder.group({});
  }
  addPeopleForm: FormGroup;
  closeModal = () => {
    this.modalService.closeModal();
  };
  yearGroups = [
    'All school',
    'All pupils',
    'All visitors',
    'All others',
    'Year 1',
    'Year 2',
    'Year 3',
  ];
  selectedGroups: string[] = [];
  people = ['Hannah', 'Craig', 'Samual', 'Marcus', 'Selina', 'Lily', 'Piers'];
  selectedPeople: string[] = [];
  pushGroup = (group: string) => {
    this.selectedGroups = [...this.selectedGroups, group];
    console.log(this.selectedGroups);
  };
  pushPerson = (person: string) => {
    this.selectedPeople = [...this.selectedPeople, person];
    console.log(this.selectedPeople);
  };

  xClick = () => {
    console.log('x clicked');
  };
  placeholder = () => {
    console.log('placeholder');
  };
}
