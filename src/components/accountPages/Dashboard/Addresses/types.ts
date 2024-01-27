import type { AddressPropss } from "../types";

export interface AddressesProps {
	showAddress: boolean;
	setShowAddress: (showAddress: boolean) => void;
	defaultAddressId: {
		id: string;
	};
	addresses: AddressPropss[];
}
