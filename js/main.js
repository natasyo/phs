document.addEventListener("DOMContentLoaded", function () {
  // Карусель
  if (typeof Swiper !== "undefined") {
    const swiper = new Swiper('.swiper-partner', {
      direction: 'horizontal', // Горизонтальная прокрутка
      loop: true, // Бесконечный цикл
      slidesPerView: "auto",
      speed: 2100,
      // freeMode: false,
      autoplay: {
        delay: 0, // 2 секунды
        pauseOnMouseEnter: true, // останавливать при взаимодействии
        reverseDirection: true,// Прокрутка слева направо
      },
      spaceBetween: 12,
      grid: {
        rows: 2, // Две строки
      },
      breakpoints: {
        575: { slidesPerView: 3 },
        767: { slidesPerView: 3 },
        992: {
          slidesPerView: 'auto',
          spaceBetween: 5,
          grid: {
            rows: 1, // Две строки
          },
        }  // ПК: 4 слайда
      },

    });

    const swiperOffers = new Swiper('.swiper-offers', {
      slidesPerView: 'auto',
      centeredSlides: true, // Центрируем активный слайд
      loop: true,
      spaceBetween: 24, speed: 2000,
      pagination: {
        el: '.swiper-pagination', // Контейнер для точек
        clickable: true // Делаем точки кликабельными
      },
      autoplay: {
        delay: 0,
        pauseOnMouseEnter: true,
        disableOnInteraction: true
      },
      breakpoints: { 2001: { slidesPerView: 7 }, }

    });
  }
  // Вызов метода расчет стоимости
  calculating();
});

window.onresize = function (event) {
  location.reload();
};



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
    input1.addEventListener("focusin", function () {
      Inputmask({
        mask: "+7 (999) 999-99-99",
        clearMaskOnLostFocus: true,
      }).mask(this);
    });
    input1.addEventListener('focusout', function () {
      Inputmask.remove(input1);
    })
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

// Переключение шагов
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


// Находим элементы меню и подложку
const menuItem = document.querySelector('.navbar-nav');
const contacts = document.querySelector('.footer__contacts');
createBg(menuItem);
createBg(contacts);
function createBg(menu) {
  // const menuItem = document.querySelector('.navbar-nav');
  const hoverBg = menu.querySelector('.hover-bg');
  const menuItems = menu.querySelectorAll('a');
  // При наведении на пункт меню вычисляем его позицию и ширину относительно контейнера
  menuItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
      const itemRect = item.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      const left = itemRect.left - menuRect.left;
      const width = itemRect.width;

      // Обновляем позицию и размеры подложки
      hoverBg.style.left = left + 'px';
      hoverBg.style.width = width + 'px';
    });
  });

  // При уходе курсора с меню сбрасываем подложку (можно, например, сделать её ширину 0)
  menu.addEventListener('mouseleave', function () {
    hoverBg.style.width = '0';
  });
}




function fixScrollbar(element) {
  console.log(element.closest('.calculate__var-wrap'))
  console.log(element.offsetWidth - element.clientWidth)
  const scrollbarWidth = element.offsetWidth - element.clientWidth;
  // element.style.paddingRight = `${scrollbarWidth}px`;
  if (element.offsetWidth - element.clientWidth > 0) {
    $(element).closest('.calculate__var-wrap').css("margin-right", '-15px');
  }


}

const scrollContainers = $('.calculate__var-wrap');
Array.from(scrollContainers).forEach((scrollContainer) => {
  fixScrollbar(scrollContainer);
  scrollContainer.addEventListener('mouseenter', () => fixScrollbar(scrollContainer));
  scrollContainer.addEventListener('mouseleave', () => scrollContainer.style.paddingRight = '');
})
