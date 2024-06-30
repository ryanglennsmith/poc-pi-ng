import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
//types will be moved to a shared location like /app/types
interface PIDetails {
  itemName: FormControl;
  itemShortName: FormControl;
  description: FormControl;
  notes: FormControl; // enum this later
  category: FormControl; // enum this later
}

const showModal = () => {
  // logic to show modal
};

const handleSubmit = () => {
  console.log('submitting');
  // logic to handle submit
};

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent {
  constructor(private formBuilder: FormBuilder) {
    this.paymentItemForm = this.formBuilder.group({
      itemName: '',
      itemShortName: '',
      description: '',
      notes: 'No notes field',
      category: 'None',
    });
  }
  paymentItemForm: FormGroup<PIDetails>;
  showModal = false;
  exitWithoutSaving = () => {
    console.log('exiting without saving');
    // logic to exit without saving / show modal
  };
  handleSubmit = () => {
    console.table(this.paymentItemForm.value);
    // logic to handle validation and submit
  };
}
