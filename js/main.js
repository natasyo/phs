document.addEventListener("DOMContentLoaded", function () {
  // Карусель партнеры

  function createCarousel(container, center) {
    if (typeof Carousel !== "undefined") {
      const carousel = new Carousel(container, {
        slidesToScroll: 1,
        slidesPerPage: 1,
        center: center,
        friction: 0.003,
        dragFree: true,
        Dots: false,
        Navigation: false,
      });
      // Автопрокрутка с изменением направления
      setInterval(function () {
        carousel.slidePrev();
        // carouselDubl.slidePrev();  // Прокручивает в обычном направлении
      }, 1500);
    } else {
      console.error("Ошибка: Carousel не найден. Проверьте подключение.");
    }
  }

  const container = document.getElementById("partnersCarousel");

  if (container) {
    createCarousel(container, false);
    const width = window.innerWidth;
    if (width < 992) {
      const condD = createDublicate(container);
      createCarousel(condD, true);
    }
    window.addEventListener("resize", (e) => {
      var el = document.getElementById("partnersCarouselDubl");
      if (el) el.remove();
      const width = window.innerWidth;
      if (width < 992) {
        const condD = createDublicate(container);
        createCarousel(condD, true);
      }
    });
  }
  // Карусель предложения
  const offersSlider = document.getElementById("offersSlider");
  if (offersSlider) {
    new Carousel(offersSlider, {
      slidesToScroll: 1,
      slidesPerPage: 1,
      center: true,
      friction: 0.03,
      dragFree: true,
      Navigation: false,
      Autoplay: { timeout: 500, showProgress: false }
    }, { Autoplay });
  }

  // Вызов метода расчет стоимости
  calculating();
});



function createDublicate(carousel) {
  const contCopy = carousel.cloneNode(true);
  const arr = Array.from(contCopy.children);
  arr.sort(() => Math.random() - 0.5);
  contCopy.setAttribute("id", "partnersCarouselDubl");
  arr.forEach((item) => contCopy.appendChild(item));
  const wrap = document.getElementById("slidersWrap");
  wrap.append(contCopy);
  return contCopy;
}

// _________________________________________________Валидация формы______________
(() => {
  ("use strict");
  // Функция для включения маски
  function setPhoneMask(input) {
    Inputmask({
      mask: "+7 (999) 999-99-99",
      clearMaskOnLostFocus: true,
    }).mask(input);
  }
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");
  // _________________Маска номера телефона
  const input = document.getElementById("emailPhone");

  let maskEmailPhone;
  // Определяем, что вводит пользователь
  if (input) {
    input.addEventListener("input", function () {
      if (/^\d/.test(input.value)) {
        // Если первая цифра - число
        mask = setPhoneMask(this);
      } else {
        Inputmask.remove(input); // Удаляем маску, если вводят email
      }
    });

    input.addEventListener("keyup", function () {
      console.log(input.value.length);
      if (input.value.length === 0) {
        Inputmask.remove(input);
      }
    });
  }


  document.getElementsByName("phone").forEach((input1) => {
    input1.addEventListener("input", function () {
      Inputmask({
        mask: "+7 (999) 999-99-99",
        clearMaskOnLostFocus: true,
      }).mask(this);
    });
  });
  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let phonePattern = /^\+7\ \(\d{3}\)\ \d{3}-\d{2}-\d{2}$/;
        let input = form.querySelector("#emailPhone");
        console.log(!!input)
        if (input) {
          input.setCustomValidity("");
          let value = input.value.trim();
          if (emailPattern.test(value) || phonePattern.test(value)) {
            input.classList.remove("is-invalid");
          } else {
            input.classList.add("is-invalid");
            event.preventDefault();
          }
        }
        const phone = form.querySelector("[name='phone']");
        if (phone) {
          phone.setCustomValidity("");
          let value = phone.value.trim();
          if ((!phone.required && value) || phone.required) {
            if (phonePattern.test(value)) {
              phone.classList.remove("is-invalid");
            } else {
              phone.classList.add("is-invalid");
              console.log('sfsdfsfsdfd');
              event.preventDefault();

            }
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
  if (typeof prevStep !== 'undefined') {
    if (stepCurrent === 0) {
      prevStep.classList.add("d-none");
    } else {
      prevStep.classList.remove("d-none");
    }
  }
  if (typeof nextStep !== 'undefined') {
    console.log(stepCurrent === steps.length - 1);
    if (stepCurrent === steps.length - 1) {
      nextStep.setAttribute("type", "submit");
    } else {
      nextStep.setAttribute("type", "button");
    }
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
    if (typeof nextStep !== 'undefined') {
      nextStep.addEventListener("click", function (e) {
        if (nextStep.getAttribute("type") === "button") {
          e.preventDefault();
          showData();
          if (stepCurrent + 1 < steps.length) {
            stepCurrent = stepCurrent + 1;
            changeStep(steps, stepCurrent);
          }
        }
      });
    }
    if (typeof prevStep !== 'undefined') {
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
}
