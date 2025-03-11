document.addEventListener("DOMContentLoaded", () => {
  fetch("db.json")
    .then((response) => response.json())
    .then((data) => {
      window.projects = data.projects;
      renderProjects(window.projects);
    })
    .catch((error) => console.error("Error fetching projects:", error));

  showTab("home");

  document.getElementById("menu").addEventListener("click", (event) => {
    if (event.target.matches(".tab-link")) {
      event.preventDefault();
      showTab(event.target.getAttribute("data-tab"));
    }
  });
});

function renderProjects(projects) {
  const container = document.getElementById("projects-container");
  if (!container) {
    console.error("Error: #projects-container not found.");
    return;
  }

  container.innerHTML = "";

  projects.forEach((project) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", project.id);
    card.addEventListener("click", () => {
      window.location.href = `project.html?id=${project.id}`;
    });

    card.innerHTML = `
      <div class="card-front">
        <img src="${project.image}" alt="${project.title}">
        <h3>${project.title}</h3>
      </div>
    `;

    container.appendChild(card);
  });
}

function showTab(tabName) {
  document.querySelectorAll(".tab-content").forEach((section) => {
    section.style.display = "none";
    section.classList.remove("active");
  });

  const tab = document.getElementById(tabName);
  if (tab) {
    tab.style.display = "block";
    tab.classList.add("active");
  }
}
