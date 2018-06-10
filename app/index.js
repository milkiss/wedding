import $ from 'jquery'
import 'babel-polyfill'
import 'sanitize.css/sanitize.css'
import FontFaceObserver from 'fontfaceobserver'
import Swiper from 'swiper'

import 'stylesheets/style.scss'
import 'swiper/dist/css/swiper.min.css'

import loadTypekit from 'lib/loadTypekit'
import 'lib/modernizr-custom'

const notoSansObserver = new FontFaceObserver('Noto Sans KR', {});

// When Noto Sans KR is loaded, add a font-family using Noto Sans KR to the body
notoSansObserver.load().then(() => {
  document.body.classList.add('notoSansLoaded');
}, () => {
  document.body.classList.remove('notoSansLoaded');
})

const setDDay = () => {
  const targetDate = new Date('2018-07-14')
  const days = Math.ceil((targetDate - new Date()) / (24 * 60 * 60 * 1000))
  $('#c-dday').text(days >= 0 ? `D-${days || 'day'}` : `D+${-days}`)
}

const scrollHandler = () => {
  displayGNB()
  highlightSection()
}

const animateMenuScroll = () => {
  $('.nav-item').click(function scroller(e) {
    e.preventDefault()
    const remBase = parseInt(window.getComputedStyle(document.body, null).getPropertyValue('font-size'), 10)
    const scrollTo = document.getElementById(this.id.split('-')[1]).offsetTop - 3.8 * remBase

    $('html, body').stop().animate({ scrollTop: scrollTo }, 500)
  })
}

const displayGNB = () => {
  const displayRatio = window.scrollY / window.innerHeight
  if (displayRatio < 0.1) {
    $('#c-dday').removeClass('floating');
    $('#c-nav').css('bottom', '-2.9rem');
    $('#c-header').css('top', '-3.25rem');
  } else {
    $('#c-dday').addClass('floating');
    $('#c-nav').css('bottom', '0');
    $('#c-header').css('top', '0');
  }
}

const highlightSection = () => {
  const sections = ['home', 'words', 'contact', 'photo', 'direction']
  const offsets = sections.map((x) => document.getElementById(x).offsetTop)
  const remBase = parseInt(window.getComputedStyle(document.body, null).getPropertyValue('font-size'), 10)
  const scrollTop = $(window).scrollTop()
  const windowHeight = $(window).height()
  let index = 0

  offsets.forEach((x, i) => {
    if (x <= scrollTop + 4 * remBase) {
      index = i
    }
  })
  $('.nav-item').removeClass('selected')
  $(`#to-${sections[index]}`).addClass('selected')

  $(`#${sections[index]}`).css('opacity', 1)
  if (
    index < sections.length &&
    scrollTop + windowHeight + 5 * remBase > offsets[index + 1]
  ) {
    const visibleRatio = ((scrollTop + windowHeight + 5 * remBase) - offsets[index + 1]) / windowHeight

    if ($(`#${sections[index]}`).next().hasClass('c-fadable')) {
      $(`#${sections[index]}`)
        .next().css('opacity', 1)
    }

    if ($(`#${sections[index]}`).hasClass('c-fadable')) {
      $(`#${sections[index]}`)
        .css('opacity', 1 - visibleRatio)
    }
  }
}

const initSwiper = () => {
  const galleryTop = new Swiper('.gallery-top', {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 10,
  });
  const galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true,
  });
  galleryTop.params.control = galleryThumbs;
  galleryThumbs.params.control = galleryTop;
}

$(() => {
  loadTypekit()
  setDDay()
  animateMenuScroll()
  scrollHandler()
  initSwiper()
  $(window).scroll(scrollHandler)
})
