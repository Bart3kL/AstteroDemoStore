export interface PhotosInputProps {
	onChangeCallback: (e: any) => void;
	photos: { preview: string; file: File }[];
	handleDeletePhoto: (v: string) => void;
}
