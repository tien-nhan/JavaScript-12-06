// ! Phần Accordion 

document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const button = item.querySelector('.accordion-button');
        const collapse = item.querySelector('.accordion-collapse');

        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                button.classList.add('collapsed');
                button.setAttribute('aria-expanded', 'false');
                collapse.classList.remove('show');
            } else {
                accordionItems.forEach(otherItem => {
                    const buttonConlai = otherItem.querySelector('.accordion-button');
                    const collapseConlai = otherItem.querySelector('.accordion-collapse');

                    buttonConlai.classList.add('collapsed');
                    buttonConlai.setAttribute('aria-expanded', 'false');
                    collapseConlai.classList.remove('show');
                });

                button.classList.remove('collapsed');
                button.setAttribute('aria-expanded', 'true');
                collapse.classList.add('show');
            }
        });
    });
});


// ! Phần Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('[data-ride="carousel"]');
    const inner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    const tongsoSlide = items.length;
    const showSlide = tongsoSlide - 2; // Bỏ qua hai slide ảo

    let carouselIndex = 1;
    let chuyentiepSlide = false;

    
    inner.style.transform = `translateX(-${carouselIndex * 100}%)`;

    const updateCarousel = (newIndex) => {
        if (chuyentiepSlide) return;
        chuyentiepSlide = true;

    
        carouselIndex = newIndex;
        inner.style.transition = 'transform 0.5s ease-in-out';
        inner.style.transform = `translateX(-${carouselIndex * 100}%)`;

   
        inner.addEventListener('transitionend', handleTransitionEnd, { once: true });
    };

    const handleTransitionEnd = () => {
        chuyentiepSlide = false;

        if (carouselIndex === 0) {
            carouselIndex = showSlide;
            inner.style.transition = 'none';
            inner.style.transform = `translateX(-${carouselIndex * 100}%)`;
        } else if (carouselIndex === tongsoSlide - 1) {
            carouselIndex = 1;
            inner.style.transition = 'none';
            inner.style.transform = `translateX(-${carouselIndex * 100}%)`;
        }
    };

    const nextSlide = () => {
        updateCarousel((carouselIndex + 1) % tongsoSlide);
    };

    const prevSlide = () => {
        updateCarousel((carouselIndex - 1 + tongsoSlide) % tongsoSlide);
    };

    carousel.querySelector('[data-slide="next"]').addEventListener('click', nextSlide);
    carousel.querySelector('[data-slide="prev"]').addEventListener('click', prevSlide);
});


// ! Phần Navs and Tabs
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-plus');

    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();

            
            tabs.forEach(t => t.classList.remove('active'));

            
            tabContents.forEach(content => content.classList.remove('active'));

            
            tab.classList.add('active');

            
            const targetContent = document.querySelector(tab.getAttribute('data-tab-target'));
            targetContent.classList.add('active');
        });
    });
});


// ! Phần Modal

document.addEventListener('DOMContentLoaded', function() {
    const openModalButton = document.querySelectorAll('.open-modal');
    const closeModalButton = document.querySelectorAll('[data-modal-close]');
    const overlay = document.getElementById('overlay');

    openModalButton.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        });
    });

    closeModalButton.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        });
    });

    function openModal(modal) {
        if (modal == null) return;
        modal.classList.add('active');
        overlay.classList.add('active');
        setTimeout(() => {
            modal.scrollTop = 0; 
        }, 100);
    }

    function closeModal(modal) {
        if (modal == null) return;
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }
});

