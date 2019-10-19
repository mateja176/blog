const treeWalker = document.createTreeWalker(document.body);

let node = treeWalker.nextNode();
const links = {};

while (node) {
  if (/^\s*\[[\w -]+\]/.test(node.textContent) && node.nodeType === 3) {
    const [rawText, href] = node.textContent.split(': ');
    const formattedText = rawText
      .trim()
      .slice(1)
      .slice(0, -1);
    if (node.nextSibling && node.nextSibling.tagName === 'A') {
      node.nextSibling.textContent = formattedText;
      node.nextSibling.target = '__blank';
      links[formattedText] = node.nextSibling;
    } else {
      const a = document.createElement('a');
      a.textContent = formattedText;
      a.href = href;
      a.target = '__blank';
      links[formattedText] = a;
    }
  }
  node = treeWalker.nextNode();
}

console.log(links);

const tocToggleButton = document.querySelector('.toc__toggle');
const tocToggleIcon = tocToggleButton.querySelector('i');

const toc = document.querySelector('.stackedit__left');

const tocItems = document.querySelectorAll('.stackedit__toc ul li ul li');

const content = document.querySelector('.stackedit__right');

const fadeKeyframes = [
  {
    color: 'white',
  },
  {
    color: '#aaa',
  },
  {
    color: 'white',
  },
];

const fadeOptions = {
  duration: 500,
  easing: 'ease-out',
};

const closeToc = () => {
  toc.classList.add('app-hidden');

  tocToggleIcon.innerHTML = 'toc';

  content.onclick = () => {};
};

const openToc = () => {
  toc.classList.remove('app-hidden');

  tocToggleIcon.innerHTML = 'close';

  content.onclick = toggleToc;
};

const toggleToc = () => {
  tocToggleIcon.animate(fadeKeyframes, fadeOptions);

  const isTocHidden = toc.classList.contains('app-hidden');

  if (isTocHidden) {
    openToc();
  } else {
    closeToc();
  }
};

tocToggleButton.onclick = toggleToc;

tocToggleButton.onkeyup = ({ key }) => {
  if (key === 'Enter') {
    toggleToc();
  }
};

tocItems.forEach(tocItem => {
  tocItem.onclick = () => {
    closeToc();
  };
});

let currentYOffset = 0;

window.onscroll = () => {
  if (window.innerWidth < 1060) {
    const yOffset = window.pageYOffset;

    if (yOffset > currentYOffset) {
      tocToggleButton.classList.add('app-hidden');
    } else {
      tocToggleButton.classList.remove('app-hidden');
    }

    currentYOffset = yOffset;
  }
};
