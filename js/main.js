document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("partnersCarousel");
    const carouselProps = {
        slidesPerPage: 2, // Показывать 4 элемента
        infinite: true, // Бесконечная прокрутка
        Navigation: false, // Кнопки "вперёд/назад"
        Dots: false, // Показывает точки
        center: false, // Отключает центрирование
    };
    createCarousel(container, carouselProps);
    const width = window.innerWidth;
    if (width < 992) {
        console.log(width)
        const condD = createDublicate(container);
        createCarousel(condD, { ...carouselProps, center: true })
    }
    window.addEventListener('resize', (e) => {
        var el = document.getElementById("partnersCarouselDubl");
        if (el)
            el.remove();
        const width = window.innerWidth;
        if (width < 992) {
            console.log(width)
            const condD = createDublicate(container);
            createCarousel(condD, { ...carouselProps, center: true })
        }
    });

});

function createCarousel(container, carouselProps) {
    if (typeof Carousel !== "undefined") {
        const carousel = new Carousel(container, carouselProps);

        // Автопрокрутка с изменением направления
        setInterval(function () {
            carousel.slidePrev();
            // carouselDubl.slidePrev();  // Прокручивает в обычном направлении
        }, 1500);
    } else {
        console.error("Ошибка: Carousel не найден. Проверьте подключение.");
    }
}

function createDublicate(carousel) {
    const contCopy = carousel.cloneNode(true);
    const arr = Array.from(contCopy.children);
    arr.sort(() => Math.random() - 0.5)
    console.log(arr)
    contCopy.setAttribute('id', 'partnersCarouselDubl');
    arr.forEach(item => contCopy.appendChild(item));
    const wrap = document.getElementById('slidersWrap');
    wrap.append(contCopy);
    return contCopy;
}



play.onclick = function () {
    console.log('click')
}