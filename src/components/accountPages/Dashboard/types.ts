import { type AddressProps } from "@/lib/shopify/functions/account/types";

export interface DashBoardProps {
	firstName: string;
	lastName: string;
	defaultAddress: {
		id: string;
	};
	addresses: AddressPropss[];
}
export type AddressPropss = AddressProps & { id: string };
