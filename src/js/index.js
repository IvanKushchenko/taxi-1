"use strict";
import Swiper, { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../scss/style.scss";

Swiper.use([Navigation, Pagination]);

window.addEventListener("DOMContentLoaded", () => {
	// Check scroll width
	// const div = document.createElement("div");
	// div.classList.add("scroll-checker");
	// let scrollWidth = null;
	// function checkScrollWidth() {
	// 	document.body.append(div);
	// 	scrollWidth = div.offsetWidth - div.clientWidth;
	// 	div.remove();
	// 	document.body.style.marginRight = `${scrollWidth}px`;
	// }
	const body = document.body;
	//Header
	const header = document.querySelector(".header");
	const headerBtn = document.querySelector(".header__menu-btn");

	headerBtn.addEventListener("click", () => {
		body.classList.toggle("blocked-scroll");
		header.classList.toggle("header--opened");
	});

	header.addEventListener("click", (event) => {
		if (header.classList.contains("header--opened")) {
			if (event.target.tagName.toLowerCase() === "a") {
				body.classList.remove("blocked-scroll");
				header.classList.remove("header--opened");
			}
		}
	});

	// Advantage slider
	new Swiper(".advantages__slider", {
		slidesPerView: 3,
		spaceBetween: 80,
		grabCursor: true,
		navigation: {
			prevEl: ".advantages__slider-prev",
			nextEl: ".advantages__slider-next",
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 15,
			},
			769: {
				slidesPerView: 2,
				spaceBetween: 15,
			},
			993: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
			1601: {
				spaceBetween: 80,
				slidesPerView: 3,
			},
		},
	});

	// Types slider
	new Swiper(".types__slider", {
		slidesPerView: 5,
		spaceBetween: 30,
		grabCursor: true,
		navigation: {
			prevEl: ".types__slider-prev",
			nextEl: ".types__slider-next",
		},
		pagination: {
			el: ".types__slider-pagination",
			clickable: true,
			type: "bullets",
			renderBullet: function (idx, className) {
				return `<span class="${className}">${idx + 1}</span>`;
			},
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 15,
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 15,
			},
			769: {
				slidesPerView: 3,
				spaceBetween: 15,
			},
			993: {
				slidesPerView: 4,
				spaceBetween: 15,
			},
			1441: {
				slidesPerView: 5,
				spaceBetween: 30,
			},
		},
	});

	// Feedback slider
	new Swiper(".feedback__slider", {
		slidesPerView: 3,
		spaceBetween: 30,
		loop: true,
		grabCursor: true,
		navigation: {
			prevEl: ".feedback__slider-prev",
			nextEl: ".feedback__slider-next",
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 15,
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 15,
			},
			993: {
				slidesPerView: 3,
				spaceBetween: 15,
			},
		},
	});
});
