"use strict";
const $ = require("jquery");

const date = require("jquery-datetimepicker");
import "jquery-datetimepicker/build/jquery.datetimepicker.min.css";

const select = require("select2");
import "select2/dist/css/select2.min.css";

import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
Swiper.use([Navigation, Pagination]);

import IMask from "imask";

import "../scss/style.scss";

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
	const headerOpenBtn = document.querySelector(".header__menu-btn");
	const headerCloseBtn = document.querySelector(".header__menu-close");

	headerOpenBtn.addEventListener("click", () => {
		body.classList.add("blocked-scroll");
		header.classList.add("header--opened");
	});

	headerCloseBtn.addEventListener("click", () => {
		body.classList.remove("blocked-scroll");
		header.classList.remove("header--opened");
	});

	header.addEventListener("click", (event) => {
		if (header.classList.contains("header--opened")) {
			if (event.target.tagName.toLowerCase() === "a" || event.target.classList.contains("header__overlay")) {
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

	// Order modal

	//Opening modal

	const modalOpenBtn = document.querySelectorAll('[data-modal="open-btn"]');
	const modal = document.querySelector('[data-modal="block"]');

	modalOpenBtn.forEach((btn) => {
		btn.addEventListener("click", () => {
			modal.classList.add("order--opened");
			body.classList.add("blocked-scroll");
		});
	});

	modal.addEventListener("click", (event) => {
		if (event.target && event.target.classList.contains("order__overlay")) {
			modal.classList.remove("order--opened");
			body.classList.remove("blocked-scroll");
		}
	});

	// Form listener

	const orderForm = modal.querySelector("form");
	const orderTabs = document.querySelectorAll(".order__tab");
	const orderBtn = document.querySelectorAll(".order__btn");
	const orderInfo = {};
	let isTypeChoosen = false;
	let step = 0;
	let activeTab = orderTabs[0];

	orderForm.addEventListener("submit", sendFormToEmail);

	async function sendFormToEmail(event) {
		event.preventDefault();
		let countOfErrors = formValidation(activeTab.querySelectorAll("input"));
		if (countOfErrors === 0) {
			let inputs = this.querySelectorAll("input, select, textarea");
			event.preventDefault();
			inputs.forEach((input) => {
				if (input.value || (input.value && input.checked)) {
					orderInfo[input.name] = input.value;
				}
			});
			modal.classList.add("order--successed");
			setTimeout(() => {
				modal.classList.remove("order--opened", "order--successed");
			}, 5000);
			step = 0;
			hideTabContent();
			showTabContent();
			this.reset();
			$(".order__select-destination select").val(null).trigger("change");
			$(".order__select-departure select").val(null).trigger("change");
			$(".order__select-type select").val(null).trigger("change");
			$('input[type="number"]').attr({ value: 1 });
			activeTab = orderTabs[0];
			// $.ajax({
			// 	type: "POST",
			// 	url: "",
			// 	data: formData,
			// 	error: function (req, textStatus, err) {
			// 		console.error(err);
			// 		alert("При обработки формы произошла ошибка. Попробуйте еще раз!");
			// 	},
			// 	success: function () {
			// 		modal.classList.add("order--successed");
			// 		this.reset();
			// setTimeout(() => {
			// 	modal.classList.remove("order--opened", "order--successed");
			// }, 5000);
			// 	},
			// });
		}
	}

	// Modal Tabs

	function hideTabContent() {
		orderTabs.forEach((item) => {
			item.classList.add("order__tab--hide");
			item.classList.remove("order__tab--show");
		});
	}

	function showTabContent(i = 0) {
		orderForm.scrollIntoView();
		orderTabs[i].classList.add("order__tab--show");
		orderTabs[i].classList.remove("order__tab--hide");
	}

	hideTabContent();
	showTabContent();

	orderBtn.forEach((btn) => {
		if (btn.type === "button") {
			btn.addEventListener("click", () => {
				if (formValidation(activeTab.querySelectorAll("input, select")) === 0) {
					step++;
					hideTabContent();
					showTabContent(step);
					activeTab = orderTabs[step];
				}
			});
		}
	});

	function formValidation(inputs) {
		let numberOfErrors = 0;
		inputs.forEach((input) => {
			if (!$(input).is(":hidden")) {
				if (input.tagName.toLowerCase() === "input") {
					if (input.type === "checkbox" || input.type === "radio") {
						if (input.checked || input.name === "back") {
							input.parentNode.parentNode.parentNode.classList.remove("order__error");
							isTypeChoosen = true;
						} else {
							if (!isTypeChoosen) {
								input.parentNode.parentNode.parentNode.classList.add("order__error") || numberOfErrors++;
							} else {
								numberOfErrors = 0;
							}
						}
					} else {
						if (input.name === "amount-passengers") {
							input.value
								? input.parentNode.parentNode.classList.remove("order__error")
								: input.parentNode.parentNode.classList.add("order__error") || numberOfErrors++;
						} else {
							input.value ? input.parentNode.classList.remove("order__error") : input.parentNode.classList.add("order__error") || numberOfErrors++;
						}
					}
				} else if (input.tagName.toLowerCase() === "select") {
					input.getAttribute("data-selected") === "false"
						? input.parentNode.classList.add("order__error") || numberOfErrors++
						: input.parentNode.classList.remove("order__error");
				}
			}
		});
		return numberOfErrors;
	}

	$(".order__back input").on("change", function () {
		if (this.checked) {
			$(".order__back-subblock").addClass("order__back-subblock--showed");
		} else {
			$(".order__back-subblock").removeClass("order__back-subblock--showed");
		}
	});

	$(".order__select-destination select").select2();
	$(".order__select-destination select").on("select2:select", function () {
		$(".order__select-destination select").attr({ "data-selected": "true" });
	});
	$(".order__select-departure select").select2();
	$(".order__select-departure select").on("select2:select", function () {
		$(".order__select-departure select").attr({ "data-selected": "true" });
	});

	$(".order__select-type select").select2();
	$(".order__select-type select").on("select2:select", function (event) {
		$(".order__select-type select").attr({ "data-selected": "true" });
		const { text } = event.params.data;
		if (text === "Межгород") {
			$(orderForm).attr({ "data-type": "intercity" });
		} else if (text === "Аеропорт") {
			$(orderForm).attr({ "data-type": "airport" });
			$(".order__input-flight").addClass("order__input-flight--showed");
		} else if (text === "Ж/д вокзал") {
			$(orderForm).attr({ "data-type": "railway" });
		}
	});

	const phoneFields = document.querySelectorAll("input[type='tel']");
	phoneFields.forEach((input) => {
		IMask(input, {
			mask: "+{7}(000)000-00-00",
		});
	});

	$.datetimepicker.setLocale("ru");

	$(".order__input-date input").each((i, el) => {
		$(el).datetimepicker({
			timepicker: false,
			format: "d.m.Y",
			minDate: 0,
			onClose: function () {
				$($(".order__input-date input")[i].parentElement).removeClass("order__input--opened");
			},
		});
	});

	$(".order__input-time input").each((i, el) => {
		$(el).datetimepicker({
			datepicker: false,
			format: "H:i",
			minTime: 0,
			step: 10,
			onClose: function () {
				$($(".order__input-time input")[i].parentElement).removeClass("order__input--opened");
			},
		});
	});

	$(".order__input-date input, .order__input-time input ").on("click", function () {
		$(this.parentElement).addClass("order__input--opened");
	});

	let passangersAmount = 1;

	$('input[type="number"]').on("change", function (e) {
		passangersAmount = e.target.value;
		$('input[type="number"]').attr({ value: e.target.value });
	});

	$(".order__input-plus").on("click", function () {
		const input = $('input[type="number"]');
		input[0].value ? (input[0].value = ++passangersAmount) : input.attr({ value: "1" });
	});

	$(".order__input-minus").on("click", function () {
		const input = $('input[type="number"]');
		input[0].value ? (input[0].value = passangersAmount === 1 ? 1 : --passangersAmount) : input.attr({ value: "1" });
	});

	// Questions form
	const questionsForm = document.querySelector(".questions__form");

	questionsForm.addEventListener("submit", function (event) {
		event.preventDefault();
		modal.classList.add("order--opened", "order--successed");
		setTimeout(() => {
			modal.classList.remove("order--opened", "order--successed");
		}, 5000);
		this.reset();
		// setTimeout(() => {
		// 	modal.classList.remove("order--successed", "order--opened");
		// }, 5000);
		// $.ajax({
		// 	type: "POST",
		// 	url: "",
		// 	data: formData,
		// 	error: function (req, textStatus, err) {
		// 		console.error(err);
		// 		alert("При обработки формы произошла ошибка. Попробуйте еще раз!");
		// 	},
		// 	success: function () {
		// 		modal.classList.add("order--successed");
		// 		this.reset();
		// 		setTimeout(() => {
		//    modal.classList.remove("order--opened", "order--successed");
		// 		}, 5000);
		// 	},
		// });
	});
});
