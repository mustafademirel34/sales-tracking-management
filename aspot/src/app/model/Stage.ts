export interface Stage {
    stageId: number|null;
    customerId: number|null;
    itemName: string;
    itemPrice: number|null;
    state: string;
    paymentMethod: string;
    whenWasCreated: Date|null;
    deliveryTime: Date|null;
    deliveryNotes: string;
    paymentNotes: string;
    isCompleted:boolean;
  }
  