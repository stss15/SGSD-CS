(() => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const carousel = document.getElementById('carousel');
    const carouselImg = document.getElementById('carousel-img');
    const carouselCaption = document.getElementById('carousel-caption');
    let carouselItems = [];
    let carouselIndex = 0;

    const openLightbox = (src) => {
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = src;
        lightbox.classList.add('active');
    };

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove('active');
    };

    if (lightbox) {
        lightbox.addEventListener('click', closeLightbox);
        const closeBtn = lightbox.querySelector('.lightbox-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                closeLightbox();
            });
        }
    }

    document.querySelectorAll('[data-lightbox-src]').forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const src = item.getAttribute('data-lightbox-src');
            if (src) openLightbox(src);
        });
    });

    // --- Carousel Logic ---
    const carouselSets = {
        interfaces: [
            'images/Interfaces/GUI.png',
            'images/Interfaces/CLI.png',
            'images/Interfaces/VUI.png',
            'images/Interfaces/Form.png',
            'images/Interfaces/Gesture.png'
        ]
    };

    const renderCarousel = () => {
        if (!carousel || !carouselImg || !carouselItems.length) return;
        carouselImg.src = carouselItems[carouselIndex];
        if (carouselCaption) {
            carouselCaption.innerText = `${carouselIndex + 1} / ${carouselItems.length}`;
        }
    };

    const openCarousel = (key) => {
        const set = carouselSets[key];
        if (!set || !set.length || !carousel) return;
        carouselItems = set;
        carouselIndex = 0;
        renderCarousel();
        carousel.classList.add('active');
    };

    const closeCarousel = () => {
        if (carousel) carousel.classList.remove('active');
    };

    if (carousel) {
        carousel.addEventListener('click', (e) => {
            // Close only if clicking backdrop, not buttons or image
            if (e.target.id === 'carousel') closeCarousel();
        });
        const closeBtn = document.getElementById('carousel-close');
        if (closeBtn) closeBtn.addEventListener('click', closeCarousel);
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                carouselIndex = (carouselIndex - 1 + carouselItems.length) % carouselItems.length;
                renderCarousel();
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                carouselIndex = (carouselIndex + 1) % carouselItems.length;
                renderCarousel();
            });
        }
    }

    document.querySelectorAll('[data-carousel]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const key = item.getAttribute('data-carousel');
            openCarousel(key);
        });
    });
})();
