// Lazyload
const lazyImages = document.querySelectorAll('img[data-src], [data-srcset]')
if (lazyImages.length > 0) {
    lazyImages.forEach(img => {
        function showImg() {
            const { top } = img.getBoundingClientRect()
            if (top < window.innerHeight) {
                if (img.dataset.src) img.setAttribute('src', img.dataset.src)
                if (img.dataset.srcset) img.style.backgroundImage = `url(${img.dataset.srcset})`
                img.removeAttribute('data-src')
                img.removeAttribute('data-srcset')
                document.removeEventListener('scroll', showImg)
            }
        }
        showImg()
        document.addEventListener('scroll', showImg)
    })
}


const header = document.querySelector('.header')
const burger = header.querySelector('.burger')
burger.addEventListener('click', () => header.classList.toggle('menu-open'))
const headerMobile = header.querySelector('.header__mobile')
const copyElements = ['.header__social', '.header__nav', '.header__block_address', '.header__block_phone', '.header .btn'].forEach(s => {
    const el = header.querySelector(s)
    if (!el) return
    const clone = el.cloneNode(true)
    headerMobile.append(clone)
    if (s == '.header .btn') {
        const newDiv = document.createElement('div')
        newDiv.className = 'header__mobile-btn'
        newDiv.append(clone)
        headerMobile.append(newDiv)
        clone.classList.add('banner__btn')
        clone.insertAdjacentHTML('beforeend', `<svg>
        <use href="./img/icons/icons.svg#arrow"></use>
    </svg>`)
    }
})

const dropdownLinksMobile = header.querySelectorAll('.header__mobile .link-dropdown > a')
if (dropdownLinksMobile) dropdownLinksMobile.forEach(link => {
    link.addEventListener('click', () => link.parentNode.classList.toggle('open'))
})



const swiperDoctors = new Swiper('.doctors .swiper', {

    // Default parameters
    slidesPerView: 1,
    spaceBetween: 10,
    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    },
    scrollbar: {
        el: '.doctors .swiper-scrollbar',
        draggable: true,
    },
    on: {
        init: function () {
            setSameHeight(false, this.el.querySelectorAll('.doctor__name'))
        }
    }
})


const swiperAdvantages = new Swiper('.advantages__swiper', {
    slidesPerView: 1,
    loop: true,
    pagination: {
        el: '.advantages__swiper .swiper-pagination',
        type: 'bullets',
        clickable: true
    },
})

const bannersSwiper = new Swiper('.banners__swiper', {
    slidesPerView: 1,
    navigation: {
        nextEl: '.banners__swiper .swiper-button-next',
        prevEl: '.banners__swiper .swiper-button-prev',
    },
    pagination: {
        el: '.banners__swiper .swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    /* loop: true, */
    spaceBetween: 100,
    centeredSlides: true,
    initialSlide: 1,
    autoHeight: true
})



const swiperLicenses = new Swiper('.licenses__swiper', {
    // Default parameters
    slidesPerView: 3,
    spaceBetween: 30,

    scrollbar: {
        el: '.licenses__swiper .swiper-scrollbar',
        draggable: true,
    },
})


const swiperEducation = new Swiper('.education.swiper', {
    // Default parameters
    slidesPerView: 3,
    spaceBetween: 30,
    scrollbar: {
        el: '.education.swiper .swiper-scrollbar',
        draggable: true,
    },
})


function setSameHeight(selector, elementsNode) {
    let column = 0
    const elements = selector ? document.querySelectorAll(selector) : elementsNode
    if (!elements.length) return
    elements.forEach(el => el.offsetHeight > column ? column = el.offsetHeight : '')
    elements.forEach(el => el.style.height = column + 'px')
}

const btnUp = {
    el: document.querySelector('.btn-up'),
    show() {
        // удалим у кнопки класс btn-up_hide
        this.el.classList.remove('btn-up_hide');
    },
    hide() {
        // добавим к кнопке класс btn-up_hide
        this.el.classList.add('btn-up_hide');
    },
    addEventListener() {
        if (!this.el) return
        // при прокрутке содержимого страницы
        window.addEventListener('scroll', () => {
            // определяем величину прокрутки
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            // если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
            scrollY > 400 ? this.show() : this.hide();
        });
        // при нажатии на кнопку .btn-up
        document.querySelector('.btn-up').onclick = () => {
            // переместим в начало страницы
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
}

btnUp.addEventListener();

setSameHeight('.passage__info h3')


const elementsWithArrow = document.querySelectorAll('.with-arrow')
if (elementsWithArrow.length) {
    elementsWithArrow.forEach(el => el.insertAdjacentHTML('afterbegin', '<svg><use href="./img/icons/icons.svg#arrow-spoiler"></use></svg>'))
}

// Aside Service
const asideServiceList = document.querySelector('.service__aside .popular__list_service')
if (asideServiceList) {

}

/* Спойлеры */
const spoilers = document.querySelectorAll('.spoiler')
if (spoilers.length > 0) {
    spoilers.forEach(spoiler => {
        const top = spoiler.querySelector('.spoiler-top')
        top.addEventListener('click', () => spoiler.classList.toggle('spoiler-open'))
    })
}


const anchors = [].slice.call(document.querySelectorAll('.scroll')),
    animationTime = 400,
    framesCount = 20;

function scroll(item) {
    let element = document.querySelector(item.getAttribute('href'))
    if (!element) return
    header.classList.remove('menu-open')
    // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
    let coordY = element.getBoundingClientRect().top + window.pageYOffset;

    // запускаем интервал, в котором
    let scroller = setInterval(function () {
        // считаем на сколько скроллить за 1 такт
        let scrollBy = coordY / framesCount;

        // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
        // и дно страницы не достигнуто
        if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {

            // то скроллим на к-во пикселей, которое соответствует одному такту
            window.scrollBy(0, scrollBy);
        } else {
            // иначе добираемся до элемента и выходим из интервала
            window.scrollTo(0, coordY);
            clearInterval(scroller);
        }
        // время интервала равняется частному от времени анимации и к-ва кадров
    }, animationTime / framesCount);

}

anchors.forEach(item => item.addEventListener('click', (e) => {
    e.preventDefault()
    scroll(item)
}))

// Popups
class Popup {
    constructor(popupElement) {
        this.popupElement = popupElement;
        this._closeButton = this.popupElement.querySelector('.popup__close');
        this._img = this.popupElement.querySelector('.popup__img') ?? ''
        this._handleEscClose = this._handleEscClose.bind(this)
        this._openingLinks = document.querySelectorAll(`[data-pointer="${this.popupElement.id}"]`)
        this.form = this.popupElement.querySelector('form')
        this.setEventListeners()
    }

    open(el) {
        document.body.style.overflow = "hidden";
        this.popupElement.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEscClose);
        if (this._img && el.src) this._img.src = el.src

    }

    close() {
        this.popupElement.classList.remove('popup_opened');
        document.body.style.overflow = "visible";
        document.removeEventListener('keydown', this._handleEscClose);
        if (this.form && this.form.classList.contains('form_success')) {
            setTimeout(() => {
                const valids = this.form.querySelectorAll('.valid')
                if (valids.length) valids.forEach(v => v.classList.remove('valid'))
                this.form.classList.remove('form_success')
            }, 300)
        }
    }

    _handleEscClose(evt) {
        if (evt.keyCode === 27) {
            this.close();
        }
    }

    _handleOverlayClick(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this._openingLinks.forEach(link => link.addEventListener('click', (e) => { e.preventDefault(); this.open(e.target) }))
        this._closeButton.addEventListener('click', () => this.close());
        this.popupElement.addEventListener('click', this._handleOverlayClick.bind(this));
    }
}

const popups = document.querySelectorAll('.popup')
let arrPopups = {}
document.addEventListener('DOMContentLoaded', () => {
    if (popups.length > 0) popups.forEach(item => {
        const popup = new Popup(item)
        arrPopups[item.id] = popup
    })
})

/* Маска */
window.addEventListener("DOMContentLoaded", function () {
    [].forEach.call(document.querySelectorAll('.tel'), function (input) {
        var keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            var matrix = "+7 (___) ___-__-__",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5) this.value = ""
        }
        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)
    });
});

const inputs = document.querySelectorAll('input')
if (inputs.length) {
    inputs.forEach(input => {
        const placeholder = input.nextElementSibling
        if (!placeholder || !placeholder.classList.contains('form__placeholder')) return
        input.addEventListener('focusout', () => {
            placeholder.style.display = 'block'
            if (input.value) placeholder.style.display = 'none'
        })

        input.addEventListener('focus', () => {
            placeholder.style.display = 'none'
        })
    })
}

function isValidInputs(inputs, afterSubmit) {
    if (!inputs || !inputs.length) return false
    return inputs.every(input => {

        let valid = input.validity.valid
        if (input.classList.contains('tel')) {
            valid = input.value.length >= input.minLength
        }


        if (!valid) {
            input.classList.add('invalid')
            input.classList.remove('valid')
        } else {
            input.classList.remove('invalid')
            input.classList.add('valid')
        }

        return valid
    })
}

const forms = document.querySelectorAll('form')
if (forms.length) {
    forms.forEach(form => {
        const button = form.querySelector('button[type="submit"]')
        const placeholders = form.querySelectorAll('.form__placeholder')
        let elements = form.querySelectorAll('input:not([type=hidden]), textarea')

        elements = Array.from(elements)

        if (elements.length) elements.forEach(el => el.addEventListener('input', () => isValidInputs([el])))

        if (button) button.dataset.text = button.textContent
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            const valid = isValidInputs(elements)
            if (!valid) return
            const action = form.action
            if (!action) return
            if (button) {
                button.textContent = 'Отправляем...'
            }

            const data = new FormData(form)

            fetch(action, {
                method: form.dataset.method || form.method,
                body: data
            })
                .then(response => {
                    if (response.ok) return response.text()
                    return Promise.reject()
                })
                .then(res => {
                    if (!res) return Promise.reject()
                    if (res) {
                        form.classList.add('form_success')
                        form.reset()
                        if (placeholders.length) placeholders.forEach(p => p.style.display = 'block')
                    }
                })
                .catch(err => form.classList.add('form_error'))
                .finally(() => {
                    if (button) button.textContent = button.dataset.text
                })
        })
    })
}