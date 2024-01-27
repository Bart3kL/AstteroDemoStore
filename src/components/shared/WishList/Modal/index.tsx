import { Product } from "./Product";

import type { ModalProps } from "./types";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperTitle,
	wrapperDescription,
	wrapperProducts,
	wrapperButtons,
	wrapperButtonsAddToCart,
	wrapperButtonsClear,
} = styles;

export const Modal = ({
	products,
	addToWishList,
	removeFromWishList,
	setProducts,
	addToCartButtonLabel,
	clearWishlistLabel,
	description,
	saveChangesButtonLabel,
	title,
	handleToggle,
}: ModalProps) => {
	const handleDeleteAllFromWishlist = () => {
		setProducts([]);
		document.cookie = `variantIds=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
		removeFromWishList("1", true);
	};

	const handleDeleteSignleProductFromWishlist = (productId: string) => {
		setProducts(products.filter((product) => product.id !== productId));
	};

	return (
		<div className={wrapper}>
			<h3 className={wrapperTitle}>{title}</h3>
			<p className={wrapperDescription}>{description}</p>
			<div className={wrapperProducts}>
				{products.length > 0 &&
					products.map((product) => (
						<Product
							key={product.id}
							{...product}
							addToWishList={addToWishList}
							removeFromWishList={removeFromWishList}
							handleDeleteSignleProductFromWishlist={() =>
								handleDeleteSignleProductFromWishlist(product.id)
							}
							saveChangesButtonLabel={saveChangesButtonLabel}
							handleToggle={handleToggle}
						/>
					))}
			</div>
			<div className={wrapperButtons}>
				<button className={wrapperButtonsAddToCart}>{addToCartButtonLabel}</button>
				<button className={wrapperButtonsClear} onClick={handleDeleteAllFromWishlist}>
					{clearWishlistLabel}
				</button>
			</div>
		</div>
	);
};
