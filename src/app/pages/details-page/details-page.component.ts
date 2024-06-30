import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ExitModalComponent } from '../../components/exit-modal/exit-modal.component';
import { ExitModalService } from '../../services/exit-modal.service';
//types will be moved to a shared location like /app/types
interface PIDetails {
  itemName: FormControl;
  itemShortName: FormControl;
  description: FormControl;
  notes: FormControl; // enum this later
  category: FormControl; // enum this later
}

const handleSubmit = () => {
  console.log('submitting');
  // logic to handle submit
};

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [ReactiveFormsModule, ExitModalComponent],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent {
  constructor(
    private formBuilder: FormBuilder,
    public modalService: ExitModalService
  ) {
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
    this.modalService.showModal();
    console.log('exiting without saving');
    // logic to exit without saving / show modal
  };
  handleSubmit = () => {
    console.table(this.paymentItemForm.value);
    // logic to handle validation and submit
  };
  closeModal = () => {
    console.log('closing modal');
    this.showModal = false;
    // logic to close modal
  };
}
