import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

import type { SlideProps } from "./types";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const {
	wrapperPlay,
	wrapperPause,
	wrapperMedia,
	wrapperMediaDesktop,
	wrapperMediaMobile,
	wrapperContent,
	wrapperContentFirstLine,
	wrapperContentSecondLine,
	wrapperContentBtn,
	wrapperContentFirstLineActive,
	wrapperContentSecondLineActive,
	wrapperContentBtnActive,
} = styles;

export const Slide = ({
	idx,
	mobileMedia,
	desktopMedia,
	buttonLabel,
	redirection,
	textFirstLine,
	textSecondLine,
	currentSlideIdx,
}: SlideProps) => {
	const [isPlaying, setIsPlaying] = useState(true);
	const videoRef = useRef<HTMLVideoElement | null>(null);

	const handlePlayVideo = () => {
		if (isPlaying && videoRef.current) {
			setIsPlaying(false);
			videoRef.current.pause();
		}
		if (!isPlaying && videoRef.current) {
			setIsPlaying(true);
			videoRef.current.play();
		}
	};

	return (
		<div
			className={cx(
				`keen-slider__slide number-slide-${idx}`,
				(desktopMedia.src.includes("videos") || desktopMedia.src.includes("videos")) &&
					videoRef.current &&
					isPlaying &&
					wrapperPause,
				(desktopMedia.src.includes("videos") || desktopMedia.src.includes("videos")) &&
					videoRef.current &&
					!isPlaying &&
					wrapperPlay,
			)}
		>
			<div className={wrapperMedia}>
				{!mobileMedia.src.includes("videos") && (
					<Image
						src={mobileMedia.src}
						alt={mobileMedia.alt ?? ""}
						width={300}
						height={700}
						className={wrapperMediaMobile}
						loading="eager"
					/>
				)}
				{!desktopMedia.src.includes("videos") && (
					<Image
						src={desktopMedia.src}
						alt={desktopMedia.alt ?? ""}
						width={1500}
						height={700}
						className={wrapperMediaDesktop}
						loading="eager"
					/>
				)}
				{mobileMedia.src.includes("videos") && (
					<video
						playsInline
						loop
						autoPlay
						muted
						ref={videoRef}
						className={wrapperMediaMobile}
						onClick={handlePlayVideo}
					>
						<source src={mobileMedia.src} type="video/mp4" />
					</video>
				)}
				{desktopMedia.src.includes("videos") && (
					<video
						playsInline
						loop
						autoPlay
						muted
						ref={videoRef}
						onClick={handlePlayVideo}
						className={wrapperMediaDesktop}
					>
						<source src={desktopMedia.src} type="video/mp4" />
					</video>
				)}
			</div>
			<div className={wrapperContent}>
				<h4
					className={cx(
						wrapperContentFirstLine,
						currentSlideIdx === idx && wrapperContentFirstLineActive,
					)}
				>
					{textFirstLine}
				</h4>
				<h3
					className={cx(
						wrapperContentSecondLine,
						currentSlideIdx === idx && wrapperContentSecondLineActive,
					)}
				>
					{textSecondLine}
				</h3>
				<button
					className={cx(wrapperContentBtn, currentSlideIdx === idx && wrapperContentBtnActive)}
				>
					<Link href={redirection}>{buttonLabel}</Link>
				</button>
			</div>
		</div>
	);
};
