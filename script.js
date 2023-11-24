const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            let animStart = 8;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if (animItemHeight > window.innerHeight) {
                animStart = 1;
                animItemPoint = window.innerHeight / animStart;
            }

            if (
                pageYOffset > animItemOffset - animItemPoint &&
                pageYOffset < animItemOffset + animItemHeight
            ) {
                animItem.classList.add('_active');
            } else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }

    animOnScroll();

    window.addEventListener('scroll', animOnScroll);

    window.addEventListener('resize', () => {
        animOnScroll(); // Добавлен вызов функции при изменении размеров окна
    });
}