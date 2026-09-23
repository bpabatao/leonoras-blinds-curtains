const projects = [
  {
    image: 'assets/images/office-zebra-blinds.jpg',
    alt: 'Zebra blinds fitted in a Calamba office',
    category: 'Zebra blinds',
    title: 'Executive office, tailored to fit',
    location: 'Calamba, Laguna',
  },
  {
    image: 'assets/images/grey-living-room-curtains.jpg',
    alt: 'Grey pleated curtains and white sheers in a living room',
    category: 'Curtains',
    title: 'A soft frame for a modern living room',
    location: 'Calamba, Laguna',
  },
  {
    image: 'assets/images/gym-zebra-blinds.jpg',
    alt: 'Zebra blinds installed across gym windows',
    category: 'Zebra blinds',
    title: 'Privacy and light control for a home gym',
    location: 'Calamba, Laguna',
  },
  {
    image: 'assets/images/stairwell-curtains.jpg',
    alt: 'Layered grey curtains and sheers surrounding a stairwell',
    category: 'Curtains',
    title: 'Layered curtains through the stairwell',
    location: 'Calamba, Laguna',
  },
  {
    image: 'assets/images/marble-room-roller-blind.jpg',
    alt: 'Light roller blind mounted against a marble tiled wall',
    category: 'Roller blinds',
    title: 'A crisp finish for a marble-lined room',
    location: 'Calamba, Laguna',
  },
  {
    image: 'assets/images/warm-bedroom-curtains.jpg',
    alt: 'Warm neutral curtains and sheers in a bedroom',
    category: 'Curtains',
    title: 'Warm neutrals, made for rest',
    location: 'Calamba, Laguna',
  },
  {
    image: 'assets/images/bedroom-curtains.jpg',
    alt: 'Neutral curtains and sheers layered around a bedroom window',
    category: 'Curtains',
    title: 'A bedroom window, softly finished',
    location: 'Calamba, Laguna',
  },
  {
    image: 'assets/images/corner-room-curtains.jpg',
    alt: 'Curtains and sheers arranged around a corner room',
    category: 'Curtains',
    title: 'A complete curtain treatment for corner windows',
    location: 'Calamba, Laguna',
  },
];

const galleryImage = document.querySelector('#gallery-image');
const galleryCategory = document.querySelector('#gallery-category');
const galleryTitle = document.querySelector('#gallery-title');
const galleryLocation = document.querySelector('#gallery-location');
const currentSlide = document.querySelector('#current-slide');
const projectTabs = [...document.querySelectorAll('[data-project]')];
const previousProject = document.querySelector('#previous-project');
const nextProject = document.querySelector('#next-project');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
let selectedProject = 0;

function showProject(index) {
  selectedProject = (index + projects.length) % projects.length;
  const project = projects[selectedProject];

  galleryImage.src = project.image;
  galleryImage.alt = project.alt;
  galleryCategory.textContent = project.category;
  galleryTitle.textContent = project.title;
  galleryLocation.textContent = project.location;
  currentSlide.textContent = String(selectedProject + 1).padStart(2, '0');

  projectTabs.forEach((tab, tabIndex) => {
    tab.setAttribute('aria-selected', String(tabIndex === selectedProject));
  });
}

projectTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showProject(index));
});

previousProject.addEventListener('click', () => showProject(selectedProject - 1));
nextProject.addEventListener('click', () => showProject(selectedProject + 1));

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  siteNav.classList.toggle('is-open', !isOpen);
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('is-open');
  });
});
