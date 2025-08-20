async function loadProjects() {
  try {
    const response = await fetch("projects.json"); // must be in same folder as index.html
    const data = await response.json();

    renderCodingProjects(data.codingProjects);
    renderArtProjects(data.artProjects);
  } catch (error) {
    console.error("Error loading projects.json:", error);
  }
}

function renderCodingProjects(codingProjects) {
  const container = document.getElementById("coding-projects");
  codingProjects.forEach((project) => {
    container.innerHTML += `
            <div class="col-lg-5 col-12">
                <div class="artists-thumb">
                    <img src="${project.img}" class="artists-image img-fluid" alt="${project.name} screenshot">
                    <div class="artists-hover">
                        <p><strong>Name:</strong> ${project.name}</p>
                        <p><strong>Date:</strong> ${project.date}</p>
                        <p><strong>Type:</strong> ${project.type}</p>
                        <hr>
                    </div>
                </div>
            </div>
        `;
  });
}

function renderArtProjects(artProjects) {
  const container = document.getElementById("art-projects");
  artProjects.forEach((project) => {
    container.innerHTML += `
            <div class="col-lg-6 col-12 mt-4 mt-lg-0">
                <div class="pricing-thumb">
                    <h3><small>${project.title}</small></h3>
                    <p>${project.description}</p>
                    <a class="link-fx-1 color-contrast-higher mt-4" href="${project.link}">
                        <span>${project.linkText}</span>
                    </a>
                </div>
            </div>
        `;
  });
}

document.addEventListener("DOMContentLoaded", loadProjects);
