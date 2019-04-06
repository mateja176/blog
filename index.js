const menuToggleButton = document.querySelector('.menu__toggle');
const menuToggleIcon = menuToggleButton.querySelector('i');

const menu = document.querySelector('.stackedit__left');

const menuItems = document.querySelectorAll('.stackedit__toc ul li ul li');

const fadeKeyframes = [
  {
    color: 'white',
  },
  {
    color: 'royalblue',
  },
  {
    color: 'white',
  },
];

const duration = 500;

const fadeOptions = {
  duration,
  easing: 'ease-in-out',
};

const closeMenu = () => {
  menu.classList.remove('app-visible');
  menu.classList.add('app-hidden');

  menuToggleIcon.innerHTML = 'menu';
};

menuToggleButton.onclick = () => {
  menuToggleIcon.animate(fadeKeyframes, fadeOptions);

  const isMenuVisible = menu.classList.contains('app-visible');

  if (isMenuVisible) {
    closeMenu();
  } else {
    menu.classList.remove('app-hidden');
    menu.classList.add('app-visible');

    menuToggleIcon.innerHTML = 'close';
  }
};

menuItems.forEach((menuItem) => {
  menuItem.onclick = () => {
    closeMenu();
  };
});
