import { NavSubItem } from "./NavSubItem";
import { SaleBanner } from "./SaleBanner";
import { OutfitOfTheWeekBanner } from "./OutfitOfTheWeekBanner";
import { Brand } from "./Brand";
import { PresentationBanner } from "./PresentationBanner";

import type { NavModalProps } from "./types";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperSmaller,
	wrapperSuperSmaller,
	wrapperActive,
	wrapperBoxCategories,
	wrapperBoxCategoriesCategory,
	wrapperBoxBrands,
	wrapperBoxBrandsTitle,
	wrapperBoxBrandsList,
} = styles;

export const NavModal = ({
	isModalOpen,
	selectedSubLinks,
	popularProducts,
	banners,
	brands,
}: NavModalProps) => {
	const handleModalClick = (event: Event) => {
		event.stopPropagation();
	};

	return (
		<div
			className={cx(
				wrapper,
				isModalOpen && wrapperActive,
				banners && banners.type === "sale" && wrapperSmaller,
				banners && banners.type === "presentation" && wrapperSuperSmaller,
			)}
			onClick={() => handleModalClick}
		>
			{banners && banners.type !== "presentation" && (
				<div>
					<div className={wrapperBoxCategories}>
						<div className={wrapperBoxCategoriesCategory}>
							<h4>Categories</h4>
							{selectedSubLinks &&
								selectedSubLinks.map((item, idx) => <NavSubItem key={item.href + idx} {...item} />)}
						</div>
						<div className={wrapperBoxCategoriesCategory}>
							{popularProducts && (
								<>
									<h4>Popular</h4>
									{popularProducts.map((item, idx) => (
										<NavSubItem key={item.href + idx} {...item} />
									))}
								</>
							)}
						</div>
					</div>
					{brands && (
						<div className={wrapperBoxBrands}>
							<h4 className={wrapperBoxBrandsTitle}>{brands.title}</h4>
							<div className={wrapperBoxBrandsList}>
								{brands.list &&
									brands.list.map((brand, idx) => <Brand key={brand.href + idx} {...brand} />)}
							</div>
						</div>
					)}
				</div>
			)}
			{banners && banners.type === "sale" && <SaleBanner {...banners} />}
			{banners && banners.type === "outfitOfTheWeek" && <OutfitOfTheWeekBanner {...banners} />}
			{banners && banners.type === "presentation" && <PresentationBanner {...banners} />}
		</div>
	);
};
