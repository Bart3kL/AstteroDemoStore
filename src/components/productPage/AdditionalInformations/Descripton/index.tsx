/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

import type { DescriptionProps } from "./types";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperActive,
	wrapperFirstBox,
	wrapperFirstBoxImage,
	wrapperFirstBoxDescription,
	wrapperSecondBox,
	wrapperSecondBoxDescription,
	wrapperSecondBoxImage,
	wrapperTable,
	wrapperDescription,
} = styles;

export const Description = ({ currentTab }: DescriptionProps) => {
	return (
		<div className={cx(wrapper, currentTab && wrapperActive)}>
			<div className={wrapperFirstBox}>
				<div className={wrapperFirstBoxImage}>
					<Image
						src="https://cdn.shopify.com/s/files/1/1323/8419/files/product-tab-03.png?v=1654456180"
						alt=";"
						fill
					/>
				</div>
				<div className={wrapperFirstBoxDescription}>
					<p>
						<a href="#">There are many benefits</a> to shopping at an online store, including the
						ability to find a wide variety of items, the ability to compare prices easily, and the
						ability to have items shipped directly to your doorstep.
					</p>
					<p>
						<span>
							With countless online stores offering a wide selection of variously styled clothes and
							accessories, it's easier to find the perfect collection for you. Not only do these
							stores offer great prices, but they also have up-to-date information on the latest
							trends in fashion. If you're looking for the new outfit, there are several things you
							should consider when shopping for clothes online. Different clothing styles will look
							better on some people than others. Additionally, it's important to keep up with
							current trends to make sure your wardrobe stays in style.
						</span>
					</p>
				</div>
			</div>

			<div className={wrapperSecondBox}>
				<div className={wrapperSecondBoxDescription}>
					<p>
						<span>
							Featuring the latest trends in fashion and accessories, our new arrivals are sure to
							get you excited for the warmer months ahead. From sundresses and caps to swimwear and
							sandals, we have everything you need to update your wardrobe for spring and summer.
							Whether you're looking for a new tote&nbsp;to carry all your beach essentials or some
							statement jewelry to dress up your favorite outfit, we've got you covered. Start
							shopping our new collection now and find your perfect spring and summer style!
						</span>
					</p>
					<p>
						If you're looking for the <a href="#">latest fashion</a> trends, you'll definitely want
						to check out our online store! We've got a great selection of clothes and accessories
						that will help you stay up-to-date with the latest styles.
					</p>
				</div>
				<div className={wrapperSecondBoxImage}>
					<Image
						src="https://cdn.shopify.com/s/files/1/1323/8419/files/product-tab-02.png?v=1654456180"
						alt=";"
						fill
					/>
				</div>
			</div>
			<div className={wrapperTable}>
				<table>
					<tbody>
						<tr>
							<th>Entry Header 1</th>
							<th>Entry Header 2</th>
							<th>Entry Header 3</th>
						</tr>
						<tr>
							<td>Entry First Line 1</td>
							<td>Entry First Line 2</td>
							<td>Entry First Line 3</td>
						</tr>
						<tr>
							<td>Entry Line 1</td>
							<td>Entry Line 2</td>
							<td>Entry Line 3</td>
						</tr>
						<tr>
							<td>Entry Last Line 1</td>
							<td>Entry Last Line 2</td>
							<td>Entry Last Line 3</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p className={wrapperDescription}>
				You can also read customer reviews to get an idea of how different garments look on real
				people before making a purchase. Shopping for clothes online is a great way to stay
				fashionable without breaking the bank. With so many options available, it's easy to find the
				perfect collection of clothing that suits both your style preferences and budget! So what
				are you waiting for? Start shopping our new collection now and find your perfect spring and
				summer style!
			</p>
		</div>
	);
};
