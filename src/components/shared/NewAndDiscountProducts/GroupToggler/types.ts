export interface GroupTogglerProps {
	activeGroup: string;
	setActiveGroup: (group: string) => void;
	groups: string[];
}
