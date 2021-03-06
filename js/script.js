var navItens = document.querySelectorAll('.nav-link');
var topbtn = document.getElementById('inicio');
var navBrand = document.getElementById('navbarBrand');

window.addEventListener('DOMContentLoaded', function() {
  navInit();
  toTopArrowBtn();
});

window.addEventListener('scroll', toTopArrowBtn);

navItens.forEach(item =>{  
  item.addEventListener('click', scrollToIdOnClick);
})

function getScrollTopByHref(element) {
  const id = element.getAttribute('href');
  return document.querySelector(id).offsetTop;
}

function scrollToIdOnClick(event) {
  event.preventDefault();
  let ref = getScrollTopByHref(event.target) - 65;
  if(event.target.getAttribute('href')!='#material'){
    ref = getScrollTopByHref(event.target) - 80;
  }
  scrollToPosition(ref);
  navStyleControl(event);
}

function scrollToPosition(ref) {
  smoothScrollTo(0, ref);
}

/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
 function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
};

function navStyleControl(event){
  const element = event.target;

  if(element.getAttribute('id')!='inicio'){
    navBrand.classList.remove('navbar-brand-ativado');
    if (element.classList.contains('nav-link-desativado')) {
      element.classList.remove('nav-link-desativado');
    }
  
    if (!element.classList.contains('nav-link-ativado')) {
      element.classList.add('nav-link-ativado');
    }
  
    navItens.forEach(item =>{  
      if (item !== element && item.classList.contains('nav-link-ativado')) {
        item.classList.remove('nav-link-ativado');
        item.classList.add('nav-link-desativado');
      }
    });
  }

  if(element.getAttribute('id')=='inicio'){
    navInit();
  }
}

function navInit(){  
  navBrand.classList.add('navbar-brand-ativado');
  navItens.forEach(item =>{  
    if(item.getAttribute('id')!='inicio'){
      item.classList.remove('nav-link-ativado');
      item.classList.add('nav-link-desativado');
    }    
  });  
}

function toTopArrowBtn(){
  if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
    topbtn.style.display="block";
  } else {
    topbtn.style.display="none";
  }
}