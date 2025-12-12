/***** HERO DATE *****/
function showCurrentDate() {
  const el = document.getElementById('currentDate');
  if (!el) return;
  const today = new Date();
  el.textContent = today.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/***** SLIDE STATE *****/
const slideIndices = { coding: 1, art: 1 };

/* Inline SVG placeholder (no extra file needed) */
const PLACEHOLDER = encodeURI(
  'data:image/svg+xml;utf8,' +
    "<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'>" +
    "<rect width='100%' height='100%' fill='#888'/>" +
    "<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='32'>Image not found</text>" +
    '</svg>'
);

/***** LOAD PROJECTS (from projects.json, with fallback) *****/
async function loadProjects() {
  try {
    // projects.json is next to index.html
    const res = await fetch('./projects.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log('Loaded projects.json', data);
    useData(data);
  } catch (err) {
    console.warn(
      'Could not load projects.json, using fallback data. Reason:',
      err
    );

    const fallback = {
      codingProjects: [
        {
          name: 'Nightly iOS App',
          date: 'Dec 11, 2025',
          type: 'Nightly Home Page',
          img: 'images/nightlyhomepage.png',
        },
        {
          name: 'Forensic Nursing Web App',
          date: 'Nov 24, 2023',
          type: 'Web Application Screen',
          img: 'images/forensicnursingscreen.png',
        },
        {
          name: 'Forensic Nursing Web App',
          date: 'Nov 24, 2023',
          type: 'Diagnosis Screen',
          img: 'images/forensicnursingdiagnosis.png',
        },
        {
          name: 'Forensic Nursing Web App',
          date: 'Nov 24, 2023',
          type: 'Decision Tree',
          img: 'images/forensicnursingdecisontree.png',
        },
        {
          name: 'Enigma',
          date: 'Apr 24, 2024',
          type: 'Decision Tree',
          img: 'images/enigmadecisiontree.png',
        },
        {
          name: 'Enigma',
          date: 'Apr 24, 2024',
          type: 'Horror Game',
          img: 'images/enigma.png',
        },
        {
          name: 'Enigma',
          date: 'Apr 24, 2024',
          type: 'Horror Game',
          img: 'images/enigma2.png',
        },
        {
          name: 'Enigma',
          date: 'Apr 24, 2024',
          type: 'Horror Game',
          img: 'images/enigma3.png',
        },
      ],
      artProjects: [
        {
          title: 'Gesso Magazine',
          description:
            'Arts 403 Final Project: A magazine featuring my favorite artists Doris Salcedo and Jean Michel Basquiat.',
          link: 'images/teleki_julia_arts403_magazine_spreads.pdf',
          linkText: 'View Magazine',
          img: 'images/teleki_julia_arts403-mockup1.png',
        },
        {
          title: 'Acrylic Paintings',
          description:
            '2019-2025 collection featuring fantasy themes, original works, and studies.',
          link: 'images/Paintings.pdf',
          linkText: 'View Paintings',
          img: 'images/sunset.jpg',
        },
      ],
    };

    useData(fallback);
  }
}

function useData(data) {
  buildCarousel('coding', data.codingProjects || []);
  buildCarousel('art', data.artProjects || []);
}

/***** BUILD CAROUSEL *****/
function buildCarousel(type, projects = []) {
  const container = document.getElementById(`${type}-carousel`);
  const dotsContainer = document.getElementById(`${type}-dots`);
  if (!container || !dotsContainer) {
    console.error(`Missing containers for ${type} carousel`);
    return;
  }

  // NOTE: we do NOT set a global minHeight here anymore.

  const nextBtn = container.querySelector('.slide-next');

  projects.forEach((project, i) => {
    const title = project.name || project.title || 'Untitled';
    const imgSrc = project.img || PLACEHOLDER;

    const slide = document.createElement('div');
    slide.className = 'mySlides';
    slide.innerHTML = `
      <div class="numbertext">${i + 1} / ${projects.length}</div>
      <img src="${imgSrc}" alt="${title}" style="width:100%"
           onerror="this.onerror=null; this.src='${PLACEHOLDER}'">
      <div class="text">
        ${title}
        ${project.date ? ` - ${project.date}` : ''}
        ${project.type ? ` · ${project.type}` : ''}
        ${
          project.description
            ? `<div class="mt-1">${project.description}</div>`
            : ''
        }
        ${
          project.link
            ? `<div class="mt-1"><a class="link-fx-1" href="${
                project.link
              }"><span>${project.linkText || 'View'}</span></a></div>`
            : ''
        }
      </div>
    `;

    if (nextBtn) container.insertBefore(slide, nextBtn);
    else container.appendChild(slide);

    // Dot
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.addEventListener('click', () => currentSlide(i + 1, type));
    dotsContainer.appendChild(dot);

    // When the image loads, if this slide is visible, adjust the container height
    const img = slide.querySelector('img');
    img.addEventListener('load', () => {
      if (slide.style.display !== 'none') {
        container.style.height = slide.offsetHeight + 'px';
      }
    });
  });

  if (projects.length > 0) {
    showSlides(1, type);
  } else {
    console.warn(`No slides for ${type}`);
  }
}

/***** NAVIGATION *****/
function plusSlides(n, type) {
  showSlides((slideIndices[type] += n), type);
}
function currentSlide(n, type) {
  showSlides((slideIndices[type] = n), type);
}

/***** SHOW / HIDE SLIDES *****/
function showSlides(n, type) {
  const slideWrap = document.getElementById(`${type}-carousel`);
  const dotWrap = document.getElementById(`${type}-dots`);
  if (!slideWrap || !dotWrap) return;

  const slides = slideWrap.getElementsByClassName('mySlides');
  const dots = dotWrap.getElementsByClassName('dot');
  const count = slides.length;
  if (!count) return;

  if (n > count) slideIndices[type] = 1;
  if (n < 1) slideIndices[type] = count;

  // Hide all slides, deactivate all dots
  for (let i = 0; i < count; i++) slides[i].style.display = 'none';
  for (let i = 0; i < dots.length; i++)
    dots[i].className = dots[i].className.replace(' active', '');

  // Show current slide
  const current = slides[slideIndices[type] - 1];
  current.style.display = 'block';

  // Activate current dot
  if (dots[slideIndices[type] - 1]) {
    dots[slideIndices[type] - 1].className += ' active';
  }

  // Adjust container height to current slide (works with CSS transition)
  slideWrap.style.height = current.offsetHeight + 'px';
}

/***** BOOT *****/
document.addEventListener('DOMContentLoaded', () => {
  showCurrentDate();
  loadProjects();
});
