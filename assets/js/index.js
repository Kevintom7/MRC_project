
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


