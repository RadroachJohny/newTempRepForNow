"use strict";

document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages;    

  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {  
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");
    
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    

      lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }



function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

// ПОЛИФИЛЫ

// $(function () {

  // ПОЛИФИЛЫ
  
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }
  
  
  // проверяем поддержку
  if (!Element.prototype.closest) {
    
    // реализуем
    Element.prototype.closest = function(css) {
      var node = this;
      
      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
  
  
  if (!Element.prototype.matches) {    
    // определяем свойство
    Element.prototype.matches = Element.prototype.matchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector;
    
  } 
  
  // ПОЛИФИЛЫ

  $('.completed__slick').slick({
    dots: true,
    arrows: true
  });

  $('.goal__slider').slick({
    infinite: true,
    dots: true,
    arrows: true
  });
  var next = document.querySelector('.completed .slick-next, .goal .slick-next'),
      next2 = document.querySelector('.goal .slick-next'),
      slickDots = document.querySelector('.completed .slick-dots, .goal .slick-dots'),
      slickDots2 = document.querySelector('.goal .slick-dots'),
      completSliderPhoto = document.querySelector('.completed__slider-photo'),
      completedArrow = document.querySelectorAll('.completed .slick-arrow');
  next.style.left = slickDots.offsetWidth + 92 + 'px';
  next2.style.left = slickDots2.offsetWidth + 102 + 'px';

  function slickDotsAdapt() {
    if (window.innerWidth < 951) {
      slickDots.style.bottom = 0;
      slickDots.style.bottom = completSliderPhoto.offsetHeight + 30 + 'px';
      completedArrow.forEach(function (item) {
        item.style.bottom = 0;
        item.style.bottom = completSliderPhoto.offsetHeight + 26 + 'px';
      });
    }
  }

  slickDotsAdapt();

  window.addEventListener('resize', slickDotsAdapt);

  $('.fantasy__mobile-slider').slick({
    arrows: true,
    // slidesToShow: 1,
    prevArrow: '<button type="button" class="slick-prev"><img src="img/arrow-left-mobile.svg" alt="предыдущий слайд"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="img/arrow-right-mobile.svg" alt="следующий слайд"></button>'
  });
  var goalSlickDots = document.body.querySelector('.goal .slick-dots'),
      slickItem = goalSlickDots.querySelectorAll('li'),
      sliderStepsColumn = document.querySelectorAll('.slider-steps__column'),
      goalSlider = document.querySelector('.goal__slider'),
      sliderCounter = document.querySelectorAll('.total'),
      popup = document.querySelector('.popup'),
      btnCallback = document.querySelectorAll('.btn-callback'),
      thanks = document.getElementById('thanks-modal'),
      body = document.body;

  goalSlider.addEventListener('click', function () {
    slickItem.forEach(function (item, n) {
      if (item.classList.contains('slick-active')) {
        sliderStepsColumn.forEach(function (item) {
          item.classList.remove('active');
        });
        sliderStepsColumn[n].classList.add('active');
      }
    });
  });

  $(".goal__slider").on("swipe", function () {
    slickItem.forEach(function (item, n) {
      if (item.classList.contains('slick-active')) {
        sliderStepsColumn.forEach(function (item) {
          item.classList.remove('active');
        });
        sliderStepsColumn[n].classList.add('active');
      }
    });
  });

  var newCounter = (sliderCounter.length - 1) / 2;
  sliderCounter.forEach(function (item) {
    return item.innerHTML = newCounter;
  });

  function popupShow() {
    popup.classList.add('is-active');
    body.classList.add('is-locked');
  }

  function popupHide() {
    popup.classList.remove('is-active');
    body.classList.remove('is-locked');
    document.querySelector('#popup-form').reset(); // inputClear()
  }

  btnCallback.forEach(function (item) {
    item.addEventListener('click', popupShow);
  });

  popup.addEventListener('click', function (event) {
    var target = event.target;

    if (target === popup || target.closest('.popup__close')) {
      popupHide();
    }
  });

  thanks.addEventListener('click', function (event) {
    var target = event.target;

    if (target.closest('.thanks__close') || target === thanks) {
      thanks.classList.remove('is-active');
    }
  });
  
  // YANDEX MAP
  //Переменная для включения/отключения индикатора загрузки

  var spinner = $('.botom__map-wrapper').children('.loader'); //Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)

  var check_if_load = false; //Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте

  var myMapTemp, myPlacemarkTemp; //Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;

  function init() {
    var myMapTemp = new ymaps.Map("map-yandex", {
      center: [47.99094598, 37.80597533],
      // координаты центра на карте
      zoom: 18,
      // коэффициент приближения карты
      controls: ['zoomControl', 'fullscreenControl'] // выбираем только те функции, которые необходимы при использовании

    });
    var myPlacemarkTemp = new ymaps.Placemark([47.99094598, 37.80597533], {
      hintContent: 'Донбасс Багет',
      balloonContent: "Это красивая метка"
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#imageWithContent',
      // Своё изображение иконки метки.
      iconImageHref: './img/marker.png',
      // Размеры метки.
      iconImageSize: [50, 50],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-25, -50]
    });
    myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту
    // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции

    var layer = myMapTemp.layers.get(0).get(0); // Решение по callback-у для определения полной загрузки карты

    waitForTilesLoad(layer).then(function () {
      // Скрываем индикатор загрузки после полной загрузки карты
      spinner.removeClass('is-active');
    }); // Отключить зум роликом мышки

    myMapTemp.behaviors.disable('scrollZoom');
  } // Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 


  function waitForTilesLoad(layer) {
    return new ymaps.vow.Promise(function (resolve, reject) {
      var tc = getTileContainer(layer),
          readyAll = true;
      tc.tiles.each(function (tile, number) {
        if (!tile.isReady()) {
          readyAll = false;
        }
      });

      if (readyAll) {
        resolve();
      } else {
        tc.events.once("ready", function () {
          resolve();
        });
      }
    });
  }

  function getTileContainer(layer) {
    for (var k in layer) {
      if (layer.hasOwnProperty(k)) {
        if (_instanceof(layer[k], ymaps.layer.tileContainer.CanvasContainer) || _instanceof(layer[k], ymaps.layer.tileContainer.DomContainer)) {
          return layer[k];
        }
      }
    }

    return null;
  } // Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)


  function loadScript(url, callback) {
    var script = document.createElement("script");

    if (script.readyState) {
      // IE
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      // Другие браузеры
      script.onload = function () {
        callback();
      };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  } // Основная функция, которая проверяет когда мы навели на блок с классом &#34;botom__map-wrapper&#34;


  var ymap = function ymap() {
    $('.botom__map-wrapper').mouseenter(function () {
      if (!check_if_load) {
        // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем
        // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
        check_if_load = true; // Показываем индикатор загрузки до тех пор, пока карта не загрузится

        spinner.addClass('is-active'); // Загружаем API Яндекс.Карт

        loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function () {
          // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
          ymaps.load(init);
        });
      }
    });
  };

  $(function () {
    //Запускаем основную функцию
    ymap();
  }); // Кнопка плавной прокрутки вверх 

  var button = $('.button-up');
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      button.fadeIn();
    } else {
      button.fadeOut();
    }
  });
  button.on('click', function () {
    $('body, html').animate({
      scrollTop: 0
    }, 0);
    return false;
  }); // ВАЛИДАЦИЯ

  $('form').each(function () {
    $(this).validate({
      errorPlacement: function errorPlacement(error, element) {
        if (element.attr("type") == "checkbox") {
          return element.next('label').append(error);
        }

        error.insertAfter($(element));
      },
      errorClass: "invalid",
      // focusCleanup: true,
      rules: {
        // строчное правило
        name: {
          required: true,
          minlength: 2,
          maxlength: 15
        },
        phone: {
          required: true,
          minlength: 17
        },
        // правило-объект
        email: {
          required: true,
          email: true
        },
        policymodalCheckbox: {
          required: true
        }
      },

      /* сообщения */
      errorElement: "div",
      messages: {
        name: {
          required: "Заполните поле",
          minlength: "Имя не короче двух букв",
          maxlength: "Имя не длиннее 15 букв"
        },
        phone: {
          required: "Заполните поле",
          minlength: "Длина номера 11 цифр"
        },
        email: {
          required: "Обязательно укажите email",
          email: "Введите корректный email"
        },
        policymodalCheckbox: "Вы должны согласиться на обработку данных"
      },
      submitHandler: function submitHandler() {
        send(event, 'send.php');
      }
    });
  });
// });


 // Отправка формы
// Отправка данных на сервер

function send(event, php) {
  // console.log("Отправка запроса");
  event.preventDefault ? event.preventDefault() : event.returnValue = false;
  var req = new XMLHttpRequest();
  req.open('POST', php, true);

  req.onload = function () {
    if (req.status >= 200 && req.status < 400) {
     var json = JSON.parse(this.response); // Ебанный internet explorer 11

     // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
      // console.log(json); 

      if (json.result == "success") {
        // Если сообщение отправлено
        // Скрыть popup
        $("#popup-modal").removeClass("is-active");
        document.body.classList.remove('is-locked');
        var form = document.querySelectorAll('form');
        form.forEach(function (item) {
          item.reset();
        });
        document.getElementById('thanks-modal').classList.add('is-active');
      } else {
        // Если произошла ошибка
        alert("Ошибка. Сообщение не отправлено");
      } // Если не удалось связаться с php файлом

    } else {
      alert("Ошибка сервера. Номер: " + req.status);
    }
  }; // Если не удалось отправить запрос. Стоит блок на хостинге


  req.onerror = function () {
    alert("Ошибка отправки запроса");
  };

  req.send(new FormData(event.target));
} // МАСКА ДЛЯ ТЕЛЕФОНА


var maskPhone = function maskPhone() {
  var inputsPhone = document.querySelectorAll('input[type=tel]');
  inputsPhone.forEach(function (input) {
    var keyCode;

    var mask = function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = input.selectionStart;

      if (pos < 3) {
        event.preventDefault();
      }

      var matrix = "+3 (___) ___ ____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = input.value.replace(/\D/g, ""),
          newValue = matrix.replace(/[_\d]/g, function (a) {
        if (i < val.length) {
          return val.charAt(i++) || def.charAt(i);
        } else {
          return a;
        }
      });
      i = newValue.indexOf("_");

      if (i != -1) {
        i < 5 && (i = 3);
        newValue = newValue.slice(0, i);
      }

      var reg = matrix.substr(0, input.value.length).replace(/_+/g, function (a) {
        return "\\d{1," + a.length + "}";
      }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");

      if (!reg.test(input.value) || input.value.length < 5 || keyCode > 47 && keyCode < 58) {
        input.value = newValue;
      }

      if (event.type == "blur" && input.value.length < 5) {
        input.value = "";
      }
    };

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
  });
};

maskPhone();

function isInternetExplorer() {
  return window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
}


if (isInternetExplorer() !== false) {
  document.querySelector('.goal__slider-steps').style.marginBottom = 110 + 'px';
  document.querySelector('.fantasy__pictures').style.cssText = 'margin-top: -140px; top: 0;' ;
}

});