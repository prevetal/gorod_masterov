WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function () {
	// Main slider
	let mainSlider = document.querySelector('.main_slider .swiper')

	if (mainSlider) {
		new Swiper('.main_slider .swiper', {
			loop: true,
			speed: 750,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			lazy: true
		})
	}


	// Marquee
	new Swiper('.marquee .swiper', {
		spaceBetween: 0,
		speed: 15000,
		loop: true,
		centeredSlides: true,
		slidesPerView: 'auto',
		allowTouchMove: false,
		autoplay: {
			delay: 1,
			disableOnInteraction: true
		}
	})


	// Page head marquee
	new Swiper('.page_head_marquee .swiper', {
		spaceBetween: 0,
		speed: 15000,
		loop: true,
		centeredSlides: true,
		slidesPerView: 'auto',
		allowTouchMove: false,
		autoplay: {
			delay: 1,
			disableOnInteraction: true
		}
	})


	// Our products - gallery slider
	const gallerySliders = [],
		gallery = document.querySelectorAll('.gallery .swiper')

	gallery.forEach((el, i) => {
		el.classList.add('gallery_s' + i)

		let options = {
			loop: true,
			allowTouchMove: false,
			speed: 15000,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			spaceBetween: 20,
			slidesPerView: 'auto',
			autoplay: {
				delay: 1,
				disableOnInteraction: true
			}
		}

		gallerySliders.push(new Swiper('.gallery_s' + i, options))
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: 'Закрыть',
		NEXT: 'Следующий',
		PREV: 'Предыдущий',
		MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
	}

	Fancybox.defaults.tpl = {
		closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg><use xlink:href="images/sprite.svg#ic_close"></use></svg></button>',

		main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
			<div class="fancybox__backdrop"></div>
			<div class="fancybox__carousel"></div>
			<div class="fancybox__footer"></div>
		</div>`,
	}


	// Zoom images
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false
		},
		Thumbs: {
			autoStart: false
		}
	})


	// Tabs
	var locationHash = window.location.hash

	$('body').on('click', '.tabs .btn', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				activeTabContent = $(activeTab),
				level = $(this).data('level')

			parent.find('.tabs:first .btn').removeClass('active')
			parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		let activeTab = $(`.tabs button[data-content="${locationHash}"]`),
			activeTabContent = $(locationHash),
			parent = activeTab.closest('.tabs_container'),
			level = activeTab.data('level')

		parent.find('.tabs:first .btn').removeClass('active')
		parent.find('.tab_content.' + level).removeClass('active')

		activeTab.addClass('active')
		activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Menu
	$('header .menu_btn, .main_menu .head .close_btn').click((e) => {
		e.preventDefault()

		$('body').toggleClass('lock')
		$('.main_menu').toggleClass('show')
	})


	if (is_touch_device()) {
		const subMenus = document.querySelectorAll('.main_menu .links .sub')

		// Submenu on the touch screen
		$('.main_menu .links a.sub_link').addClass('touch_link')

		$('.main_menu .links a.sub_link').click(function (e) {
			const dropdown = $(this).next()

			if (dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				subMenus.forEach(el => el.classList.remove('show'))
				dropdown.addClass('show')

				BODY.style = 'cursor: pointer;'
			}
		})

		// Close the submenu when clicking outside it
		document.addEventListener('click', e => {
			if ($(e.target).closest('.main_menu .links').length === 0) {
				subMenus.forEach(el => el.classList.remove('show'))

				BODY.style = 'cursor: default;'
			}
		})
	}


	// Accordion
	$('body').on('click', '.accordion .accordion_item .head', function(e) {
		e.preventDefault()

		let item = $(this).closest('.accordion_item'),
			accordion = $(this).closest('.accordion')

		if (item.hasClass('active')) {
			item.removeClass('active').find('.data').slideUp(300)
		} else {
			accordion.find('.accordion_item').removeClass('active')
			accordion.find('.data').slideUp(300)

			item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Stores
	$('.stores .list .head').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	// Select file
	// const fileInputs = document.querySelectorAll('form input[type=file]')

	// if (fileInputs) {
	// 	fileInputs.forEach(el => {
	// 		el.addEventListener('change', () => el.closest('.file').querySelector('label span').innerText = el.value)
	// 	})
	// }
})



window.addEventListener('load', function () {
	// Products
	let products = $('.products .masonry'),
		productsGutter = parseInt(products.css('--gutter'))

	products.masonry({
		gutter: productsGutter,
		itemSelector: '.product',
		columnWidth: products.find('.product').outerWidth()
	})
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 360) document.getElementsByTagName('meta')['viewport'].content = 'width=360, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})