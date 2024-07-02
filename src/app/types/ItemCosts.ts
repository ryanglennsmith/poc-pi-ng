interface ItemCosts {
  variableCostOption: boolean;
  fixedCost: number;
  variableCostDefault: number;
  variableCostMin: number;
  variableCostMax: number;
  dueDateOption: boolean;
  dueDate: string;
  bankAccount: string;
  accountingCodes: string[];
}

export default ItemCosts;
