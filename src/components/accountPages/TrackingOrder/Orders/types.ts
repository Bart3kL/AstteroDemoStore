export interface OrdersProps {
	trackYourOrder: {
		title: string;
		buttonLabel: string;
		errorLabel: string;
		inputPlaceholder: string;
		noTrackingUpdatesLabel: string;
		noTrackingDescription: string;
	};
	trackYourHistory: {
		title: string;
		buttonLabel: string;
		statusLabels: {
			pending: string;
			shipped: string;
			delivered: string;
		};
		shipmentContentsTitle: string;
	};
}

export type VariablesProps = {
	variables: {
		query: string;
		authParams: {
			email: string;
		};
	};
};
