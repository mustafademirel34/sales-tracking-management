export interface DeliveryData<T> {
    data: T[];
}

export interface DeliveryStage {
    stageId?: number;
    customerId?: number|null;
    itemName: string;
    itemPrice: number | null;
    state: string;
    isCompleted:boolean;
    paymentMethod: string | null;
    whenWasCreated: string | null;
    deliveryTime: string | null;
    customerNotes: string;
    deliveryNotes: string;
    paymentNotes: string;
    customerName: string;
    phone: string;
    address: string;
}