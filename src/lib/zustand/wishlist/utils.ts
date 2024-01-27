"use client";

const baseCircleProperties: React.CSSProperties = {
	position: "fixed",
	// borderRadius: "50%",
	width: "19px",
	height: "19px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	userSelect: "none",
	pointerEvents: "none",
	zIndex: "200",
};

const boomCircleProperties: React.CSSProperties = {
	width: "19px",
	height: "19px",
	backgroundColor: "transparent",
	animation: "flyingCircleBoomAnimation 700ms ease-in-out forwards",
	WebkitAnimation: "flyingCircleBoomAnimation 700ms ease-in-out forwards",
};

const boomShapesProperties: React.CSSProperties = {
	position: "absolute",
	width: "41px",
	height: "41px",
	backgroundColor: "#ffc51f",
	zIndex: "200",
	clipPath:
		"polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
	WebkitClipPath:
		"polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
	animation: "boomSparksBackground 700ms ease-in-out forwards",
};

const generateRandomBoomCircles = (rotates: number[]) => {
	return rotates.map((rotate) => {
		const circle = document.createElement("div");
		Object.assign(circle.style, {
			...boomShapesProperties,
			rotate: `${rotate}deg`,
		});
		return circle;
	});
};

const animateMovingCircle = (
	circle: HTMLDivElement,
	buttonPosition: DOMRect,
	quantityPosition: DOMRect,
	time: number,
	setAnimationFalse: () => void,
	isDesktop: boolean,
	onlyBoom: boolean,
) => {
	const startTime = performance.now();

	const animate = () => {
		const currentTime = performance.now();

		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / time, 1);

		const startX = buttonPosition.left + (quantityPosition.left - buttonPosition.left) * progress;
		const startY = buttonPosition.top + (quantityPosition.top - buttonPosition.top) * progress;

		circle.style.left = onlyBoom ? `${startX}px` : `${startX}px`;
		circle.style.top = onlyBoom ? `${startY + 11}px` : `${startY}px`;

		if (onlyBoom) {
			Object.assign(circle.style, boomCircleProperties);

			const boomCircles = generateRandomBoomCircles([350, 230, 120, 30, 0]);
			boomCircles.forEach((boomCircle) => {
				circle.appendChild(boomCircle);
			});

			setTimeout(() => {
				setAnimationFalse();
				//THIRD STEP - REMOVE (after boom = 700ms)
				document.body.removeChild(circle);
			}, 700);

			return;
		}

		if (progress < 1) {
			requestAnimationFrame(animate);
		} else {
			const isLargeDesktop = window && window.innerWidth >= 1275;
			if (!onlyBoom) {
				circle.style.left = `${
					isLargeDesktop
						? quantityPosition.left + 11
						: isDesktop
						? quantityPosition.left + 19
						: quantityPosition.left
				}px`;
			}
			circle.style.top = `${quantityPosition.top}px`;

			circle.removeEventListener("animationend", animate);

			setTimeout(() => {
				//SECOND STEP - BOOM (700ms)
				Object.assign(circle.style, boomCircleProperties);

				const boomCircles = generateRandomBoomCircles([350, 230, 120, 30, 0]);
				boomCircles.forEach((boomCircle) => {
					circle.appendChild(boomCircle);
				});

				setTimeout(() => {
					setAnimationFalse();
					//THIRD STEP - REMOVE (after boom = 700ms)
					document.body.removeChild(circle);
				}, 700);

				//SECOND STEP - TIMEOUT (time to fly)
			}, time);
		}
	};

	requestAnimationFrame(animate);
};

const circleBuilder = (variant: "default" | "navy") => {
	switch (variant) {
		case "default":
			return {
				time: 1000,
				transition: "all 1000ms cubic-bezier(.32,.32,.42,.84)",
				webkitTransition: "all 1000ms cubic-bezier(.32,.32,.42,.84)",
			};
		default:
			return {
				time: 1000,
				transition: "all 1000ms cubic-bezier(.32,.32,.42,.84)",
				webkitTransition: "all 1000ms cubic-bezier(.32,.32,.42,.84)",
			};
	}
};

export const addMovingCircle = async (
	event: any,
	setAnimationFalse: () => void,
	isDesktop: boolean,
	onlyBoom: boolean,
) => {
	const realVariant = "default";
	const circleProperties = circleBuilder(realVariant as "default");

	return new Promise<void>((resolve) => {
		const { time, ...settableProperties } = circleProperties;
		const quantityElement = document.getElementById(
			isDesktop ? "cartCircleDesktop" : onlyBoom ? "heartWishlist" : "cartCircle",
		);

		if (!quantityElement) {
			resolve();
			return;
		}
		const quantityPosition = quantityElement.getBoundingClientRect();
		const buttonPosition = event.currentTarget
			? event.currentTarget.getBoundingClientRect()
			: (event.target as HTMLElement).getBoundingClientRect();
		const { width: circleWidth, height: circleHeight } = quantityPosition;

		const circle = document.createElement("div");

		const dynamicProperties = {
			top: onlyBoom
				? `${buttonPosition.top + buttonPosition.height / 2 - circleHeight / 2 - 5}px`
				: `${buttonPosition.top + buttonPosition.height / 2 - circleHeight / 2}px`,
			left: `${buttonPosition.left + buttonPosition.width / 2 - circleWidth / 2}px`,
			width: `${circleWidth}px`,
			height: `${circleHeight}px`,
		};

		Object.assign(circle.style, {
			...dynamicProperties,
			...settableProperties,
			...baseCircleProperties,
		});
		const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svgElement.setAttribute("width", "19");
		svgElement.setAttribute("height", "17");
		svgElement.setAttribute("viewBox", "0 0 19 17");
		svgElement.setAttribute("fill", "none");
		svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");

		const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
		pathElement.setAttribute(
			"d",
			"M17.3763 1.60988C16.4191 0.571753 15.1058 0 13.6779 0C12.6106 0 11.6331 0.337437 10.7726 1.00286C10.3384 1.33874 9.94492 1.74968 9.59803 2.22931C9.25129 1.74982 8.8577 1.33874 8.42335 1.00286C7.56297 0.337437 6.58551 0 5.51818 0C4.09028 0 2.77678 0.571753 1.81963 1.60988C0.873904 2.63587 0.352936 4.03754 0.352936 5.55685C0.352936 7.1206 0.935692 8.55203 2.18683 10.0617C3.30607 11.4122 4.91468 12.7831 6.7775 14.3706C7.41358 14.9127 8.13458 15.5272 8.88324 16.1817C9.08102 16.355 9.3348 16.4503 9.59803 16.4503C9.86113 16.4503 10.1151 16.355 10.3125 16.182C11.0612 15.5273 11.7826 14.9125 12.419 14.3701C14.2815 12.783 15.8901 11.4122 17.0094 10.0616C18.2605 8.55203 18.8431 7.1206 18.8431 5.55671C18.8431 4.03754 18.3222 2.63587 17.3763 1.60988Z",
		);
		if (onlyBoom) {
			pathElement.setAttribute("fill", "transparent");
		} else {
			pathElement.setAttribute("fill", "#0067ff");
		}

		svgElement.appendChild(pathElement);

		circle.appendChild(svgElement);

		document.body.appendChild(circle);

		animateMovingCircle(
			circle,
			buttonPosition,
			quantityPosition,
			time,
			setAnimationFalse,
			isDesktop,
			onlyBoom,
		);
		resolve();
	});
};
