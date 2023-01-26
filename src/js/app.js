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
    /* loop: true, */
    spaceBetween: 100,
    centeredSlides: true,
    on: {
        slideChange: function () {

        }
    },
    allowTouchMove: false,
    initialSlide: 1,
    autoHeight: true
})

const banners = document.querySelectorAll('.banner')
if (banners.length) {
    banners.forEach((banner, index) => {
        const blockForSwiper = banner.querySelector('.banner__swiper')
        if (!blockForSwiper) return
         new Swiper(blockForSwiper, {
            slidesPerView: 1,
            autoHeight: true,
            loop: true,
            pagination: {
                el: blockForSwiper.querySelector('.swiper-pagination'),
                type: 'bullets',
                clickable: true
            },
            autoplay: index == 1 ? { delay: 3000, stopOnLastSlide: true } : false,
        })
    })
}


function setSameHeight(selector, elementsNode) {
    let column = 0
    const elements = selector ? document.querySelectorAll(selector) : elementsNode
    if (!elements.length) return
    elements.forEach(el => el.offsetHeight > column ? column = el.offsetHeight : '')
    elements.forEach(el => el.style.height = column + 'px')
}