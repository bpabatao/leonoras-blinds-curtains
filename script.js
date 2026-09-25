const projects = [
  {
    image: 'assets/images/office-zebra-blinds.jpg',
    alt: 'Zebra blinds across an office window',
    category: 'Zebra blinds',
    title: 'Office zebra blinds',
    room: 'Office',
  },
  {
    image: 'assets/images/grey-living-room-curtains.jpg',
    alt: 'Grey pleated curtains and white sheers in a living room',
    category: 'Curtains',
    title: 'Living room curtains and sheers',
    room: 'Living room',
  },
  {
    image: 'assets/images/gym-zebra-blinds.jpg',
    alt: 'Zebra blinds across the windows of a home gym',
    category: 'Zebra blinds',
    title: 'Home gym zebra blinds',
    room: 'Home gym',
  },
  {
    image: 'assets/images/stairwell-curtains.jpg',
    alt: 'Curtains and sheers beside a stairwell',
    category: 'Curtains',
    title: 'Stairwell curtains',
    room: 'Stairwell',
  },
  {
    image: 'assets/images/marble-room-roller-blind.jpg',
    alt: 'Light roller blind mounted against a marble tiled wall',
    category: 'Roller blinds',
    title: 'Roller blind',
    room: 'Marble-tiled room',
  },
  {
    image: 'assets/images/warm-bedroom-curtains.jpg',
    alt: 'Warm neutral curtains and sheers framing a bedroom window',
    category: 'Curtains',
    title: 'Bedroom curtains and sheers',
    room: 'Bedroom',
  },
  {
    image: 'assets/images/bedroom-curtains.jpg',
    alt: 'Neutral curtains and sheer panels layered around a bedroom window',
    category: 'Curtains',
    title: 'Bedroom sheer curtains',
    room: 'Bedroom',
  },
  {
    image: 'assets/images/corner-room-curtains.jpg',
    alt: 'Curtains and sheers arranged around windows in a corner room',
    category: 'Curtains',
    title: 'Corner-room curtains',
    room: 'Corner room',
  },
  {
    image: 'assets/images/bedroom-blinds.jpg',
    alt: 'Dark horizontal blinds across the bedroom windows',
    category: 'Blinds',
    title: 'Bedroom blinds',
    room: 'Bedroom',
  },
  {
    image: 'assets/images/office-wood-look-blinds.jpg',
    alt: 'Wood-look horizontal blinds in an office',
    category: 'Wood-look blinds',
    title: 'Office wood-look blinds',
    room: 'Office',
  },
];

const gallery = document.querySelector('.gallery');
const galleryFeature = document.querySelector('#gallery-feature');
const galleryImage = document.querySelector('#gallery-image');
const galleryCategory = document.querySelector('#gallery-category');
const galleryTitle = document.querySelector('#gallery-title');
const galleryRoom = document.querySelector('#gallery-location');
const currentSlide = document.querySelector('#current-slide');
const slideTotal = document.querySelector('#slide-total');
const galleryProgress = document.querySelector('#gallery-progress');
const galleryLive = document.querySelector('#gallery-live');
const projectButtons = [...document.querySelectorAll('[data-project]')];
const previousProject = document.querySelector('#previous-project');
const nextProject = document.querySelector('#next-project');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
const siteHeader = document.querySelector('#site-header');
const lightbox = document.querySelector('#gallery-lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
let selectedProject = 0;
let changeToken = 0;

slideTotal.textContent = String(projects.length).padStart(2, '0');
galleryProgress.setAttribute('aria-valuemax', String(projects.length));

function showProject(index) {
  selectedProject = (index + projects.length) % projects.length;
  const project = projects[selectedProject];
  const thisChange = ++changeToken;
  const nextImage = new Image();
  nextImage.src = project.image;

  galleryFeature.classList.add('is-changing');
  const revealProject = () => {
    if (thisChange !== changeToken) return;
    galleryImage.src = project.image;
    galleryImage.alt = project.alt;
    galleryCategory.textContent = project.category;
    galleryTitle.textContent = project.title;
    galleryRoom.textContent = project.room;
    currentSlide.textContent = String(selectedProject + 1).padStart(2, '0');
    galleryFeature.setAttribute('aria-label', `Installation ${selectedProject + 1} of ${projects.length}`);
    galleryLive.textContent = `${project.title}. ${project.category}, ${project.room}.`;
    galleryProgress.setAttribute('aria-valuenow', String(selectedProject + 1));
    galleryProgress.firstElementChild.style.width = `${((selectedProject + 1) / projects.length) * 100}%`;
    projectButtons.forEach((button, buttonIndex) => {
      button.setAttribute('aria-pressed', String(buttonIndex === selectedProject));
    });
    const activeButton = projectButtons[selectedProject];
    if (window.matchMedia('(max-width: 680px)').matches) {
      activeButton.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'nearest' });
    }
    if (lightbox.open) updateLightbox(project);
    requestAnimationFrame(() => galleryFeature.classList.remove('is-changing'));
  };

  if (nextImage.decode) {
    nextImage.decode().then(revealProject).catch(revealProject);
  } else {
    nextImage.onload = revealProject;
    nextImage.onerror = revealProject;
  }
}

function updateLightbox(project) {
  lightboxImage.src = project.image;
  lightboxImage.alt = project.alt;
  lightboxCaption.textContent = `${project.category} | ${project.room}`;
}

projectButtons.forEach((button, index) => {
  button.addEventListener('click', () => showProject(index));
});

previousProject.addEventListener('click', () => showProject(selectedProject - 1));
nextProject.addEventListener('click', () => showProject(selectedProject + 1));

gallery.addEventListener('keydown', (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    showProject(selectedProject - 1);
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    showProject(selectedProject + 1);
  }
});

let pointerStart;
galleryFeature.addEventListener('pointerdown', (event) => {
  if (event.pointerType === 'mouse' && event.button !== 0) return;
  pointerStart = { x: event.clientX, y: event.clientY };
});
galleryFeature.addEventListener('pointerup', (event) => {
  if (!pointerStart) return;
  const deltaX = event.clientX - pointerStart.x;
  const deltaY = event.clientY - pointerStart.y;
  if (Math.abs(deltaX) > 52 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
    showProject(selectedProject + (deltaX < 0 ? 1 : -1));
  }
  pointerStart = undefined;
});
galleryFeature.addEventListener('pointercancel', () => { pointerStart = undefined; });

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  siteNav.classList.toggle('is-open', !isOpen);
});

function closeMenu(restoreFocus = false) {
  menuToggle.setAttribute('aria-expanded', 'false');
  siteNav.classList.remove('is-open');
  if (restoreFocus) menuToggle.focus();
}

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => closeMenu());
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu(true);
  }
});

function openLightbox() {
  updateLightbox(projects[selectedProject]);
  if (typeof lightbox.showModal === 'function') lightbox.showModal();
}

document.querySelector('#open-gallery-image').addEventListener('click', openLightbox);
document.querySelector('#close-lightbox').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = [...document.querySelectorAll('[data-reveal]')];
if (reducedMotion || !('IntersectionObserver' in window)) {
  revealTargets.forEach((target) => target.classList.add('is-revealed'));
} else {
  document.documentElement.classList.add('motion-ready');
  revealTargets.forEach((target) => {
    const group = [...target.parentElement.querySelectorAll(':scope > [data-reveal]')];
    const position = group.indexOf(target);
    target.style.setProperty('--reveal-delay', `${Math.min(position, 4) * 75}ms`);
  });
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  revealTargets.forEach((target) => revealObserver.observe(target));
}

const sectionLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-25% 0px -65% 0px' });
  sectionLinks.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (section) sectionObserver.observe(section);
  });
}

let headerFrame = 0;
window.addEventListener('scroll', () => {
  if (headerFrame) return;
  headerFrame = requestAnimationFrame(() => {
    siteHeader.classList.toggle('is-scrolled', window.scrollY > 12);
    headerFrame = 0;
  });
}, { passive: true });

document.querySelector('#current-year').textContent = String(new Date().getFullYear());
