
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		//customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());



const anchors = document.querySelectorAll('a.scroll-to')

for (let anchor of anchors) {
	anchor.addEventListener('click', function (e) {
		e.preventDefault()

		const blockID = anchor.getAttribute('href')

		document.querySelector(blockID).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		})
	})
}



var swiper = new Swiper('.slider-rev', {

	loop: true,
	spaceBetween: 30,

	speed: 1000,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		dynamicBullets: true,
	},
});




var qus = document.querySelectorAll('.qustions__item-plus')

qus.forEach(function (el) {
	el.onclick = function () {
		el.classList.toggle("active");
		el.previousElementSibling.classList.toggle("active");
	}
});


//////////////////////////




let header = gsap.timeline({
	scrollTrigger: {
		trigger: ".header",   // pin the trigger element while active
		start: "top 60% ",
		end: "center 40%",
		// toggleActions: "play reverse restart resume",


	}
});

header.from(".header__start", { duration: 1, ease: "power4.out", opacity: 0, y: 100 }, "+=0.2")
	.from(".header__title", { duration: 1.2, ease: "power4.out", opacity: 0, y: 100 }, "-=0.6")
	.from(".header__text", { duration: 0.9, ease: "power4.out", opacity: 0, y: 100 }, "-=0.8")
	.from(".header__btn", { duration: 1, ease: "power4.out", opacity: 0, y: 50 }, "-=0.6")


let about = gsap.timeline({
	scrollTrigger: {
		trigger: ".about",   // pin the trigger element while active
		start: "top 60% ",
		end: "center 40%",
		toggleActions: "play none none none",



	}
});

about.from(".about__inner", { duration: 1, ease: "power4.out", opacity: 0, y: 200 }, "+=0.2")
	.from(".inner-about__min", { duration: 0.9, ease: "power4.out", opacity: 0, y: 100 }, "-=0.6")
	.from(".inner-about__title", { duration: 0.9, ease: "power4.out", opacity: 0, y: 50 }, "-=0.6")
	.from(".inner-about__btn", { duration: 0.9, ease: "power4.out", opacity: 0, y: 50 }, "-=0.6")
	.from(".inner-about__man", { duration: 1.4, ease: "power4.out", opacity: 0, y: 50 }, "-=0.6")


let forr = gsap.timeline({
	scrollTrigger: {
		trigger: ".forr",   // pin the trigger element while active
		start: "top 60% ",
		end: "center 40%",
		toggleActions: "play none none none",



	}
});

forr.from(".forr__title", { duration: 1, ease: "power4.out", opacity: 0, y: 200 }, "+=0.2")
	.from(".inner-forr__item-1", { duration: 0.9, ease: "power4.out", opacity: 0, y: 100 }, "-=0.6")
	.from(".inner-forr__item-2", { duration: 0.9, ease: "power4.out", opacity: 0, y: 50 }, "-=0.6")
	.from(".inner-forr__item-3", { duration: 0.9, ease: "power4.out", opacity: 0, y: 50 }, "-=0.6")
	.from(".inner-forr__item-4", { duration: 0.9, ease: "power4.out", opacity: 0, y: 50 }, "-=0.6")
	.from(".inner-forr__item-5", { duration: 0.9, ease: "power4.out", opacity: 0, y: 50 }, "-=0.6")
	.from(".inner-forr__item-6", { duration: 0.9, ease: "power4.out", opacity: 0, y: 50 }, "-=0.6")



let program = gsap.timeline({
	scrollTrigger: {
		trigger: ".program",   // pin the trigger element while active
		start: "top 60% ",
		end: "center 40%",
		toggleActions: "play none none none",



	}
});

program.from(".program__title", { duration: 1, ease: "power4.out", opacity: 0, y: 100 }, "+=0.2")
	.from(".inner-program__item-1", { duration: 0.9, ease: "power4.out", opacity: 0, y: 50 }, "-=0.6")
	.from(".inner-program__item-2", { duration: 0.9, ease: "power4.out", opacity: 0, y: 50 }, "-=0.6")
	.from(".inner-program__item-3", { duration: 0.9, ease: "power4.out", opacity: 0, y: 50 }, "-=0.6")
	.from(".inner-program__item-4", { duration: 0.9, ease: "power4.out", opacity: 0, y: 50 }, "-=0.6")
	.from(".inner-program__item-5", { duration: 0.9, ease: "power4.out", opacity: 0, y: 50 }, "-=0.6")






let tarif = gsap.timeline({
	scrollTrigger: {
		trigger: ".tarif",   // pin the trigger element while active
		start: "top 60% ",
		end: "center 40%",
		toggleActions: "play none none none",



	}
});

tarif.from(".tarif__title", { duration: 1, ease: "power4.out", opacity: 0, y: 100 }, "+=0.2")
	.from(".inner-tarif__img-1", { duration: 1, ease: "power4.out", opacity: 0, y: 100 }, "-=0.6")
	.from(".inner-tarif__img-2", { duration: 1, ease: "power4.out", opacity: 0, y: 100 }, "-=0.6")
	.from(".inner-tarif__img-3", { duration: 1, ease: "power4.out", opacity: 0, y: 100 }, "-=0.6")



let qustions = gsap.timeline({
	scrollTrigger: {
		trigger: ".qustions ",   // pin the trigger element while active
		start: "top 60% ",
		end: "center 40%",
		toggleActions: "play none none none",



	}
});

qustions.from(".qustions__title", { duration: 1, ease: "power4.out", opacity: 0, y: 100 }, "+=0.2")
	.from(".qustions__item-1", { duration: 0.9, ease: "power4.out", opacity: 0, y: 100 }, "-=0.6")
	.from(".qustions__item-2", { duration: 0.9, ease: "power4.out", opacity: 0, y: 100 }, "-=0.6")
	.from(".qustions__item-3", { duration: 0.9, ease: "power4.out", opacity: 0, y: 100 }, "-=0.6")
	.from(".qustions__item-4", { duration: 0.9, ease: "power4.out", opacity: 0, y: 100 }, "-=0.6")



let footer = gsap.timeline({
	scrollTrigger: {
		trigger: ".footer",   // pin the trigger element while active
		start: "-200px 60% ",
		end: "center 40%",
		toggleActions: "play none none none",




	}
});

footer.to(".rev__container", { duration: 1.2, ease: "power4.out", className: "+=rev__container _container active" }, "+=0.2")
	.from(".footer__ip", { duration: 0.9, ease: "power4.out", opacity: 0, y: 100 }, "-=0.4")
	.from(".footer__call", { duration: 0.9, ease: "power4.out", opacity: 0, y: 100 }, "-=0.4")
	.from(".footer__img", { duration: 0.9, ease: "power4.out", opacity: 0, y: 100 }, "-=0.4")


