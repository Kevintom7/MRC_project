
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
