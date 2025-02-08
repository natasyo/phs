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
    console.log(width);
    const condD = createDublicate(container);
    createCarousel(condD, { ...carouselProps, center: true });
  }
  window.addEventListener("resize", (e) => {
    var el = document.getElementById("partnersCarouselDubl");
    if (el) el.remove();
    const width = window.innerWidth;
    if (width < 992) {
      console.log(width);
      const condD = createDublicate(container);
      createCarousel(condD, { ...carouselProps, center: true });
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
  arr.sort(() => Math.random() - 0.5);
  console.log(arr);
  contCopy.setAttribute("id", "partnersCarouselDubl");
  arr.forEach((item) => contCopy.appendChild(item));
  const wrap = document.getElementById("slidersWrap");
  wrap.append(contCopy);
  return contCopy;
}

Fancybox.bind("[data-fancybox]", {
  // Custom options for all galleries
});


// Валидация формы
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {


    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      let input = document.getElementById('emailPhone');
      input.setCustomValidity("");
      let value = input.value.trim();

      // Регулярныя выразы для праверкі
      let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let phonePattern = /^\+?\d{10,15}$/;
      if (emailPattern.test(value) || phonePattern.test(value)) {
        input.classList.remove('is-invalid');

      } else {
        input.classList.add('is-invalid');
        input.setCustomValidity("Памылка: няправільны email!");
        console.log('invalid')
        event.preventDefault(); // Блакуем адпраўку
      }


      form.classList.add('was-validated')
    }, false)
  })
})()




