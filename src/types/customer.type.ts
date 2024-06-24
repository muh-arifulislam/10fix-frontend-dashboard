import { TOrder } from "./order.type";

export type TFullName = {
  firstName: string;
  lastName?: string;
};

export type TAddress = {
  thana: string;
  street: string;
};

export type TCustomerStatus = "ACTIVE" | "DISABLED" | "DELETED";

export type TCustomer = {
  _id: string;
  fullName: TFullName;
  email: string;
  contactNo: string;
  address: TAddress;
  orders: TOrder[];
  status?: TCustomerStatus;
  createdAt: string;
  updatedAt: string;
};
