import { ColorOptions } from "@/components/shared/Options/ColorOptions";
import { SizeOptions } from "@/components/shared/Options/SizeOptions";
import { MaterialOptions } from "@/components/shared/Options/MaterialOptions";

import styles from "./rwd.module.scss";
const { wrapperOptions } = styles;

export const Options = ({
	preparedOptions,
	preparedVariants,
	setCurrentVariant,
	currentVariant,
}: any) => {
	return (
		<div>
			{preparedOptions.color && (
				<div className={wrapperOptions}>
					<ColorOptions
						values={preparedOptions.color}
						name="Color"
						setCurrentVariant={setCurrentVariant}
						currentVariant={currentVariant}
						variants={preparedVariants}
					/>
				</div>
			)}
			{preparedOptions.size && (
				<div className={wrapperOptions}>
					<SizeOptions
						values={preparedOptions.size}
						name="Size"
						setCurrentVariant={setCurrentVariant}
						currentVariant={currentVariant}
						variants={preparedVariants}
					/>
				</div>
			)}
			{preparedOptions.material && (
				<div className={wrapperOptions}>
					<MaterialOptions
						values={preparedOptions.material}
						name="Material"
						setCurrentVariant={setCurrentVariant}
						currentVariant={currentVariant}
						variants={preparedVariants}
					/>
				</div>
			)}
		</div>
	);
};
