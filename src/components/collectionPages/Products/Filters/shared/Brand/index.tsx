import type { BrandProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperCheckbox, wrapperInputCheckbox, wrapperInputLabel } = styles;

export const Brand = ({ brandFilters, toggleBrandFilter, availableBrands }: BrandProps) => {
	return (
		<div className={wrapper}>
			{availableBrands.map((brand, idx) => (
				<div className={wrapperCheckbox} key={"brand" + brand + idx}>
					<input
						className={wrapperInputCheckbox}
						id={brand}
						type="checkbox"
						checked={brandFilters.includes(brand)}
						onChange={() => toggleBrandFilter(brand)}
					/>
					<label className={wrapperInputLabel} onClick={() => toggleBrandFilter(brand)}>
						{brand}
					</label>
				</div>
			))}
		</div>
	);
};
