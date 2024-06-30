import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
//types will be moved to a shared location like /app/types
interface PIDetails {
  itemName: FormControl;
  itemShortName: FormControl;
  description: FormControl;
  notes: FormControl;
  category: FormControl; // enum this later
}

const exitWithoutSaving = () => {
  // logic to exit without saving / show modal
};

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
  imports: [],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent {
  showModal = false;
  paymentItemForm = new FormGroup<PIDetails>({
    itemName: new FormControl('Item Name'),
    itemShortName: new FormControl('Item Short Name'),
    description: new FormControl('Description'),
    notes: new FormControl('Notes'),
    category: new FormControl('Category'),
  });
}
