function dynamicYear() {
	const yearEl = document.querySelector('.copyright-year')
	const year = new Date().getFullYear()
	yearEl.textContent = year
}

dynamicYear()

const btnNav = document.querySelector('.btn-mobile-nav')
const header = document.querySelector('.header')
const allLinks = document.querySelectorAll('a:link')

btnNav.addEventListener('click', function () {
	header.classList.toggle('nav-open')
})

allLinks.forEach(function (link) {
	link.addEventListener('click', function (e) {
		const href = link.getAttribute('href')

		if (href.startsWith('#')) {
			e.preventDefault()
			link.classList.toggle('animated')

			if (href === '#') {
				window.scrollTo({
					top: 0,
					behavior: 'smooth',
				})
			} else {
				const sectionEl = document.querySelector(href)
				if (sectionEl) {
					sectionEl.scrollIntoView({ behavior: 'smooth' })
				}
			}
		}
	})
})

document.querySelectorAll('.main-nav-link').forEach(function (link) {
	link.addEventListener('click', function () {
		header.classList.remove('nav-open')
	})
})

// Sticky navigation

const sectionHeroEl = document.querySelector('.section-hero')

const observer = new IntersectionObserver(
	function (entries) {
		const ent = entries[0]
		if (!ent.isIntersecting) document.querySelector('body').classList.add('sticky')
		else document.querySelector('body').classList.remove('sticky')
	},
	{
		root: null,
		threshold: 0.1,
		rootMargin: '-80px',
	}
)

observer.observe(sectionHeroEl)
// slider steps methods
const steps = [...document.querySelectorAll('.steps__content')]
const stepsContainer = document.querySelector('#steps-container')
const stepsNumbers = [...document.querySelectorAll('.steps__number')]
const stepsBtnLeft = document.querySelector('.steps__button--left')
const stepsBtnRight = document.querySelector('.steps__button--right')

const stepsEl = function () {
	let curSlide = 0
	const maxSlide = steps.length

	const moveStep = stepIndex => {
		steps.forEach(step => step.classList.remove('active'))
		stepsNumbers.forEach(num => num.classList.remove('active'))

		steps[stepIndex].classList.add('active')
		stepsNumbers[stepIndex].classList.add('active')
		curSlide = stepIndex
	}

	moveStep(curSlide)

	stepsContainer.addEventListener('click', e => {
		const clicked = e.target.closest('[data-index]')
		if (!clicked) return

		const stepIndex = +clicked.dataset.index - 1
		moveStep(stepIndex)
	})

	const nextStep = () => {
		if (curSlide >= maxSlide - 1) curSlide = -1
		moveStep(curSlide + 1)
	}

	const prevStep = () => {
		if (curSlide <= 0) curSlide = maxSlide
		moveStep(curSlide - 1)
	}

	stepsBtnRight.addEventListener('click', nextStep)
	stepsBtnLeft.addEventListener('click', prevStep)
}

stepsEl()

// slider clients

const slides = [...document.querySelectorAll('.slider__slide')]
const slider = document.querySelector('.slider')
const sliderBtnLeft = document.querySelector('.slider__btn--left')
const sliderBtnRight = document.querySelector('.slider__btn--right')
const dots = document.querySelector('.dots')

const sliderEl = function () {
	let curSlide = 0
	const maxSlide = slides.length
	let autoSlideInterval

	const moveSlide = slide => {
		slides.forEach((s, i) => {
			s.style.transform = `translateX(${(i - slide) * 100}%)`
		})
		activateDot(slide)
		curSlide = +slide
	}

	const createDots = () => {
		slides.forEach((_, i) => {
			dots.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
		})
	}

	const activateDot = slide => {
		document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))
		document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
	}

	const nextSlide = () => {
		curSlide = curSlide === maxSlide - 1 ? 0 : curSlide + 1
		moveSlide(curSlide)
	}

	const prevSlide = () => {
		curSlide = curSlide === 0 ? maxSlide - 1 : curSlide - 1
		moveSlide(curSlide)
	}

	const resetInterval = () => {
		clearInterval(autoSlideInterval)
		autoSlideInterval = setInterval(nextSlide, 5000)
	}

	// EVENTS
	sliderBtnRight.addEventListener('click', () => {
		nextSlide()
		resetInterval()
	})

	sliderBtnLeft.addEventListener('click', () => {
		prevSlide()
		resetInterval()
	})

	dots.addEventListener('click', e => {
		if (e.target.classList.contains('dots__dot')) {
			const { slide } = e.target.dataset
			moveSlide(slide)
			resetInterval()
		}
	})

	document.addEventListener('keydown', e => {
		if (e.key === 'ArrowRight') nextSlide()
		if (e.key === 'ArrowLeft') prevSlide()
		resetInterval()
	})

	slider.addEventListener('swiped-left', () => {
		nextSlide()
		resetInterval()
	})

	slider.addEventListener('swiped-right', () => {
		prevSlide()
		resetInterval()
	})

	const init = () => {
		createDots()
		moveSlide(0)
		autoSlideInterval = setInterval(nextSlide, 14 * 1000)
	}

	init()
}

sliderEl()
