import CategoryField from './CategoryField';
import NotesField from './NotesField';

interface PaymentItemDetails {
  itemName: string;
  itemShortName: string;
  description: string;
  notes: NotesField;
  category: CategoryField;
  requireConsent: boolean;
  enableAlert: boolean;
  enablePayPoint: boolean;
}
export default PaymentItemDetails;
