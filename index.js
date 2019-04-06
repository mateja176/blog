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

const fadeOptions = {
  duration: 500,
  easing: 'ease-in-out',
};

const closeMenu = () => {
  menu.classList.add('app-hidden');

  menuToggleIcon.innerHTML = 'menu';
};

const openMenu = () => {
  menu.classList.remove('app-hidden');

  menuToggleIcon.innerHTML = 'close';
};

const toggleMenu = () => {
  menuToggleIcon.animate(fadeKeyframes, fadeOptions);

  const isMenuHidden = menu.classList.contains('app-hidden');

  if (isMenuHidden) {
    openMenu();
  } else {
    closeMenu();
  }
};

menuToggleButton.onclick = toggleMenu;

menuToggleButton.onkeyup = ({ key }) => {
  if (key === 'Enter') {
    toggleMenu();
  }
};

menuItems.forEach((menuItem) => {
  menuItem.onclick = () => {
    closeMenu();
  };
});

let currentYOffset = 0;

window.onscroll = () => {
  if (window.innerWidth < 1060) {
    const yOffset = window.pageYOffset;

    if (yOffset > currentYOffset) {
      menuToggleButton.classList.add('app-hidden');
    } else {
      menuToggleButton.classList.remove('app-hidden');
    }

    currentYOffset = yOffset;
  }
};
