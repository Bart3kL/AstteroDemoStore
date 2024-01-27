import Image from "next/image";

import type { PhotosInputProps } from "./types";
import { cx } from "@/lib/utils";
import { Icons } from "@/lib";
import { usePhotosInput } from "./hooks";

import styles from "./base.module.scss";

const {
	container,
	containerLabel,
	containerInput,
	containerWrapper,
	containerWrapperBig,
	containerWrapperPhoto,
	containerWrapperPhotoDelete,
} = styles;

export const PhotosInput = ({ onChangeCallback, photos, handleDeletePhoto }: PhotosInputProps) => {
	const { handleChange } = usePhotosInput(onChangeCallback);

	const isPhotoAdded = photos.length > 0;
	const shouldRowReverse = photos.length > 2;
	return (
		<div className={container}>
			{isPhotoAdded && (
				<div className={cx(containerWrapper, shouldRowReverse && containerWrapperBig)}>
					{photos.map(({ preview }) => {
						return (
							<div className={containerWrapperPhoto} key={preview}>
								<div
									className={containerWrapperPhotoDelete}
									onClick={() => handleDeletePhoto(preview)}
								>
									<Icons.ExitSVG />
								</div>
								<Image src={preview} alt="preview" width={80} height={80} />
							</div>
						);
					})}
				</div>
			)}
			<label htmlFor="photos" className={containerLabel}>
				<Icons.PlusInCircleSVG />
				<input
					accept="image/*"
					type="file"
					id="photos"
					className={containerInput}
					multiple
					onChange={handleChange}
				/>
			</label>
		</div>
	);
};
