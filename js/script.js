document.addEventListener('DOMContentLoaded', function () {


  /*Клик БУРГЕР*/
  document.querySelector('.burger').addEventListener('click', function(){
    document.querySelector('.burger span').classList.toggle('active');
    document.querySelector('.menu').classList.toggle("animate");
  });



  // Шаблон микс modal СПАСИБО/forms
  const btnCloseBuy = document.querySelector('.modal__close_js');
  const modalBuy = document.querySelector('.modal_js');
  if (modalBuy) {
    btnCloseBuy.addEventListener('click', function () {
      document.querySelector('.modal_js').classList.toggle('modal_js_active');
    });
    modalBuy.addEventListener('click', function (event) {
      if (event._notClick) return;
      modalBuy.classList.remove('modal_js_active');
      document.querySelector('.modal__sps_js').classList.remove('modal__sps_js_active');
    });    
  }


  // inputmask - Телефон/forms
  const formJs = document.querySelector('.form_js');
  if (formJs) { // Обёртка if. Спасение Gulp-а от null в браузере
    new window.JustValidate('.form_js', {
      colorWrong: '#ff6972',
      messages: {
        email: {
          email: 'Недопустимый формат',
          required: 'Введите email'
        }
      },

      //*отправка формы*/
      submitHandler: function (thisForm) {
        let formData = new FormData(thisForm);
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('Отправлено');
            } //if xhr
          }
        }

        xhr.open('POST', 'mail.php', 'list.php', true);
        xhr.send(formData);
        thisForm.reset();
        document.querySelector('.modal_js').classList.toggle('modal_js_active');
        document.querySelector('.modal__sps_js').classList.toggle('modal__sps_js_active');
      }
    })
  };


  
  //swiper - Полезное useful
  const swiperOus = document.querySelector(".provide")//Для обёртки if
  if (swiperOus) {//Обёртка if. Спасение Gulp-а от null в браузере
    const provideSwiper = new Swiper('.provide__mySwiper', {
      // Дополнительные параметры
      direction: 'horizontal',
      loop: false,

      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },

      //slidesPerView: 'auto',
      slidesPerGroup: 1,//Одна картинка - один шаг
      slidesPerView: 1,
      spaceBetween: 30,

      breakpoints: {
        580: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 32,
        },

        999: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 30,
        },
    
        1440: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 30,
        },
      },

      //Бесконечное листание страниц
      speed: 3000,//Интервал ожидания

      autoplay: {
        delay: 5000,//Интервал ожидания
        disableOnInteraction: false,      
      }

    });
  };//Обёртка if 



  /*Просто модальное окно, без формы*/
  const btns = document.querySelectorAll('.btn');
  const modalOverlay = document.querySelector('.modal-overlay ');
  const modals = document.querySelectorAll('.modal-fix');
  const body = document.body;
  const fixBlocks = document.querySelectorAll('.fix-block');

  //disable enable scroll//
  let disableScroll = function () {
    //window.innerWidth - ширина всего окна. Находим ширину только body - document.body.offsetWidth
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    let pagePosition = window.scrollY;
    body.classList.add('disable-scroll');
    //ставим fixBlocks задаём padding
    fixBlocks.forEach((el) => {
      el.style.paddingRight = paddingOffset;
    }); 
    body.style.paddingRight = paddingOffset;
    body.dataset.position = pagePosition;
    body.style.top = -pagePosition + 'px';
  }

  let enableScroll = function () {
    let pagePosition = parseInt(document.body.dataset.position, 10);
    body.style.top = 'auto';
    body.classList.remove('disable-scroll');
    //обратная версия fixBlocks обнуляем padding
    fixBlocks.forEach((el) => {
      el.style.paddingRight = '0px';
    });
    //пишим стили body в js-се
    body.style.paddingRight = '0px';
    window.scroll({ top: pagePosition, left: 0 });
    body.removeAttribute('data-position');
  }

  btns.forEach((el) => {
    el.addEventListener('click', (e) => {
      let path = e.currentTarget.getAttribute('data-path');

      disableScroll();

      modals.forEach((el) => {
        el.classList.remove('modal--visible');
      });

      document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
      modalOverlay.classList.add('modal-overlay--visible');
    });
  });

  modalOverlay.addEventListener('click', (e) => {

    enableScroll();

    if (e.target == modalOverlay) {
      modalOverlay.classList.remove('modal-overlay--visible');
      modals.forEach((el) => {
        el.classList.remove('modal--visible');
      });
    }
  });



  // Плавный скролл по якорям. В любое место можно кинуть.
  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
      e.preventDefault();
      const id = smoothLink.getAttribute('href');

      document.querySelector(id).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
      });
    });
  };

  
  
 


});