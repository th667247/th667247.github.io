document.addEventListener("DOMContentLoaded", () => {
  // 🔹 Theme Toggle with Persistence
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    });
  }

  // 🔹 Load and Display Projects
  fetch("db.json")
    .then((response) => response.json())
    .then((data) => {
      window.projects = data.projects;
      renderProjects(window.projects);

      // Apply saved filter (if any)
      const savedFilter = localStorage.getItem("selectedFilter");
      if (savedFilter && document.getElementById("project-filter")) {
        document.getElementById("project-filter").value = savedFilter;
        filterProjects(savedFilter);
      }
    })
    .catch((error) => console.error("Error fetching projects:", error));

  // 🔹 Tab Navigation Handling
  const menu = document.getElementById("menu");
  if (menu) {
    menu.addEventListener("click", (event) => {
      if (event.target.matches(".tab-link")) {
        event.preventDefault();
        showTab(event.target.getAttribute("data-tab"));
      }
    });
  }

  // 🔹 Project Filtering with Persistence
  const projectFilter = document.getElementById("project-filter");
  if (projectFilter) {
    projectFilter.addEventListener("change", (event) => {
      const filter = event.target.value;
      localStorage.setItem("selectedFilter", filter);
      filterProjects(filter);
    });
  }
});

// 🔹 Function to Render Projects
function renderProjects(projects) {
  const container = document.getElementById("projects-container");
  if (!container) return console.error("Error: #projects-container not found.");
  
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

// 🔹 Function to Filter Projects
function filterProjects(filter) {
  if (!window.projects) return;

  const filteredProjects = filter === "all"
    ? window.projects
    : window.projects.filter((project) => project.type === filter);

  renderProjects(filteredProjects);
}

// 🔹 Function to Show Tabs
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
