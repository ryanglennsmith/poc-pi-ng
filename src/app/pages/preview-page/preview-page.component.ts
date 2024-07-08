import { Component, OnInit } from '@angular/core';
import { FormContextService } from '../../services/form-context.service';
import Person from '../../types/Person';
import PaymentItemDetails from '../../types/PaymentItemDetails';
import ItemQuantities from '../../types/ItemQuantities';
import ItemCosts from '../../types/ItemCosts';
import { Router } from '@angular/router';
@Component({
  selector: 'app-preview-page',
  standalone: true,
  imports: [],
  templateUrl: './preview-page.component.html',
  styleUrl: './preview-page.component.scss',
})
export class PreviewPageComponent implements OnInit {
  constructor(public formCtxSvc: FormContextService, private router: Router) {}
  peopleAdded: Person[] | null = null;
  globalAssignment: boolean = false;
  paymentItemDetails: PaymentItemDetails | null = null;
  itemQuantities: ItemQuantities | null = null;
  paymentItemCosts: ItemCosts | null = null;

  ngOnInit(): void {
    this.peopleAdded = this.formCtxSvc.peopleAddedSignal();
    this.globalAssignment = this.formCtxSvc.globalAssignmentSignal();
    this.paymentItemDetails = this.formCtxSvc.paymentItemDetailsSignal();
    this.itemQuantities = this.formCtxSvc.itemQuantitiesSignal();
    this.paymentItemCosts = this.formCtxSvc.paymentItemsCostsSignal();
  }

  goto = (route: string) => {
    this.router.navigate([route]);
  };
  goBack = () => {
    this.router.navigate(['/people']);
  };
}
