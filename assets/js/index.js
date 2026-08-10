
    // lives directly in the HTML above. This script only toggles which
    // slide is visible and replays the text entrance animation — it does
    // not generate or store any slide content itself.



    (function initHeroSlider() {
        const slides = document.querySelectorAll(".top_section .slide");
        const allDots = document.querySelectorAll(".top_section .top_squre");

        let currentSlide = 0;
        const SLIDE_DURATION = 4000; // total time each slide stays visible

        function playEntrance(slideEl) {
            const textEls = slideEl.querySelectorAll(".hero_text_el");
            textEls.forEach((el) => el.classList.remove("in"));
            void slideEl.offsetWidth; // force reflow so the transition replays
            textEls.forEach((el) => el.classList.add("in"));
        }

        function showSlide(index) {
            slides.forEach((slideEl, i) => {
                slideEl.classList.toggle("active", i === index);
            });
            allDots.forEach((dot) => {
                dot.classList.toggle("active", parseInt(dot.getAttribute("data-slide"), 10) === index);
            });
            playEntrance(slides[index]);
            currentSlide = index;
        }

        function nextSlide() {
            showSlide((currentSlide + 1) % slides.length);
        }

        // allow clicking any dot (in any slide) to jump straight to that slide
        allDots.forEach((dot) => {
            dot.addEventListener("click", () => {
                showSlide(parseInt(dot.getAttribute("data-slide"), 10));
                resetTimer();
            });
        });

        // play the entrance animation for the first slide on load
        playEntrance(slides[currentSlide]);

        let timer = setInterval(nextSlide, SLIDE_DURATION);

        function resetTimer() {
            clearInterval(timer);
            timer = setInterval(nextSlide, SLIDE_DURATION);
        }
    })();


document.addEventListener('DOMContentLoaded', () => {
    const viewport = document.querySelector('.openmenu');
    const track = document.querySelector('.open-menu-car-slider');
    const cards = track.querySelectorAll('.mega-car-card');
    const leftArrow = document.querySelector('.mega-arrow-left');
    const rightArrow = document.querySelector('.mega-arrow-right');

    const CARDS_PER_VIEW = 4;   // how many full cards you want visible at once
    const GAP = 30;             // must match your CSS gap
    let position = 0;

    function sizeCards() {
        const totalGap = GAP * (CARDS_PER_VIEW - 1);
        const cardWidth = (viewport.offsetWidth - totalGap) / CARDS_PER_VIEW;
        cards.forEach(card => {
            card.style.width = `${cardWidth}px`;
        });
        return cardWidth + GAP; // step size
    }

    let step = sizeCards();

    function getMaxScroll() {
        const trackWidth = cards.length * step;
        return Math.max(trackWidth - viewport.offsetWidth, 0);
    }

    function update() {
        track.style.transform = `translateX(${-position}px)`;
    }

    rightArrow.addEventListener('click', () => {
        const pageWidth = CARDS_PER_VIEW * step;
        position = Math.min(position + pageWidth, getMaxScroll());
        update();
    });

    leftArrow.addEventListener('click', () => {
        const pageWidth = CARDS_PER_VIEW * step;
        position = Math.max(position - pageWidth, 0);
        update();
    });

    window.addEventListener('resize', () => {
        step = sizeCards();
        position = 0;
        update();
    });
});


const mobileToggle = document.getElementById('mobileToggle');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');

mobileToggle.addEventListener('click', () => {
    const isOpen = mobileNavOverlay.classList.toggle('active');
    mobileToggle.classList.toggle('active', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
});


document.querySelectorAll('.mobile-nav-accordion').forEach(item => {
    item.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        document.querySelectorAll('.mobile-nav-accordion.active').forEach(other => {
            if (other !== item) other.classList.remove('active');
        });

        item.classList.toggle('active', !isOpen);
    });
});




document.querySelectorAll('.mobile-slider-supercar').forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('dragging');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('dragging');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('dragging');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5; // drag speed multiplier
        slider.scrollLeft = scrollLeft - walk;
    });
});








document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.filter_category');
  const cards = document.querySelectorAll('.supercar_card');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.getAttribute('data-filter');

      // toggle active state on buttons
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // show/hide cards
      cards.forEach(function (card) {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        const matches = filter === 'all' || categories.includes(filter);
        card.classList.toggle('is-hidden', !matches);
      });
    });
  });
});








document.addEventListener('DOMContentLoaded', function () {
  const toggle   = document.querySelector('.filter_accordion_toggle');
  const list     = document.querySelector('.filter_accordion_list');
  const label    = document.querySelector('.filter_accordion_label');
  const items    = document.querySelectorAll('.filter_accordion_item');
  const cards    = document.querySelectorAll('.supercar_card');

  // open/close the dropdown
  toggle.addEventListener('click', function () {
    toggle.classList.toggle('open');
    list.classList.toggle('open');
  });

  // select a filter
  items.forEach(function (item) {
    item.addEventListener('click', function () {
      const filter = item.getAttribute('data-filter');

      items.forEach(function (i) { i.classList.remove('active'); });
      item.classList.add('active');

      label.textContent = 'FILTER: ' + item.textContent;

      cards.forEach(function (card) {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        const matches = filter === 'all' || categories.includes(filter);
        card.classList.toggle('is-hidden', !matches);
      });

      // close after selecting
      toggle.classList.remove('open');
      list.classList.remove('open');
    });
  });
});
