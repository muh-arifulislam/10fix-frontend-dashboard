export type TOrderStatus = "pending" | "received" | "completed";

export type TOrder = {
  orderId: string;
  customerId: string;
  customerFullName?: string;
  customer?: {
    fullName: string;
    email: string;
    contactNo: string;
  };
  createdAt: string;
  updatedAt: string;
  dateOfService: string;
  status: TOrderStatus;
  shippingAddress: {
    thana: string;
    street: string;
  };
  orderedServices: {
    id: string;
    name: string;
  }[];
  isDeleted: boolean;
  deletedAt?: string | null;
  ordersTimeLine: {
    receivedAt: string | null;
    completedAt: string | null;
  };
};
