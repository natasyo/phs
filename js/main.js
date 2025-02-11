document.addEventListener("DOMContentLoaded", function () {
  // Карусель партнеры
  const container = document.getElementById("partnersCarousel");
  const carouselProps = {
    slidesPerPage: 2, // Показывать 4 элемента
    infinite: true, // Бесконечная прокрутка
    Navigation: false, // Кнопки "вперёд/назад"
    Dots: false, // Показывает точки
    center: false, // Отключает центрирование
    Autoplay: true,
  };
  if (container) {
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
  }
  // Карусель предложения
  const offersSlider = document.getElementById("offersSlider");
  if (offersSlider) {
    createCarousel(offersSlider, {
      centered: true,
      Navigation: false,
      slidesPerPage: 1,
      Autoplay: true,
    });
  }

  // Вызов метода расчет стоимости
  calculating();
});

function createCarousel(container, carouselProps) {
  if (typeof Carousel !== "undefined") {
    const carousel = new Carousel(container, carouselProps);

    // Автопрокрутка с изменением направления
    if (carouselProps.Autoplay)
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
if (typeof Fancybox !== "undefined")
  Fancybox.bind("[data-fancybox]", {
    // Custom options for all galleries
  });

// _________________________________________________Валидация формы
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          console.log("dgjkshfdgjhdjfhgldsjkhf");
        }
        let input = document.getElementById("emailPhone");
        if (input) {
          input.setCustomValidity("");
          let value = input.value.trim();

          // Регулярныя выразы для праверкі
          let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          let phonePattern = /^\+?\d{10,15}$/;
          if (emailPattern.test(value) || phonePattern.test(value)) {
            input.classList.remove("is-invalid");
          } else {
            input.classList.add("is-invalid");
            input.setCustomValidity("Памылка: няправільны email!");
            event.preventDefault(); // Блакуем адпраўку
          }
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// _________________Рачет стоимости________________
//Изменение текущего шага
function changeStep(steps, stepCurrent) {
  steps.forEach((step, index) => {
    step.classList.remove("d-none");
    if (index !== stepCurrent) step.classList.add("d-none");
    currentStep.innerText = stepCurrent + 1;
    countSteps.innerText = steps.length;
  });
  if (stepCurrent === 0) {
    prevStep.classList.add("d-none");
  } else {
    prevStep.classList.remove("d-none");
  }
  console.log(stepCurrent === steps.length - 1);
  if (stepCurrent === steps.length - 1) {
    nextStep.setAttribute("type", "submit");
  } else {
    nextStep.setAttribute("type", "button");
  }
}
// Вывод значений формы
function showData() {
  const form = document.querySelector("form");
  const data = new FormData(form);
  let output = "";
  for (const entry of data) {
    output = `${output}${entry[0]}=${entry[1]}\r\n`;
  }
  console.log(output);
}
function calculating() {
  let stepCurrent = 0;
  const steps = Array.from(document.getElementsByClassName("step"));

  if (steps) {
    changeStep(steps, stepCurrent);
    nextStep.addEventListener("click", function (e) {
      if (nextStep.getAttribute("type") === "button") {
        e.preventDefault();
        console.log(nextStep.getAttribute("type"));
        showData();
        if (stepCurrent + 1 < steps.length) {
          stepCurrent = stepCurrent + 1;
          changeStep(steps, stepCurrent);
        }
      }
    });
    prevStep.addEventListener("click", function (e) {
      e.preventDefault();
      showData();
      if (stepCurrent - 1 >= 0) {
        stepCurrent = stepCurrent - 1;
        changeStep(steps, stepCurrent);
      }
    });
  }
}
