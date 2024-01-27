export interface DefaultProps {
	title: string;
	filter: string | number;
	toggleFilter: (filter: string | number) => void;
}
