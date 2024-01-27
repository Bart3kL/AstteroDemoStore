export interface ActionsPanelProps {
	showOptions: boolean;
	setEdit: (v: boolean) => void;
	edit: boolean;
	lineId: string;
	resetChangedVariantToDefault: () => void;
}
