interface ItemQuantities {
  limitedPlaces: boolean;
  limitedQuantity: boolean;
  repeatable: boolean;
  numberOfPlaces: number;
  stockAvailable: number;
  minimum: number;
  maximum: number;
  default: number;
}

export default ItemQuantities;
