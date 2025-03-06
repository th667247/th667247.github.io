document.addEventListener("DOMContentLoaded", () => {
  fetch("db.json")
    .then((response) => response.json())
    .then((data) => {
      window.projects = data.projects; // Store projects globally for filtering
      renderProjects(window.projects);
    })
    .catch((error) => console.error("Error fetching projects:", error));

  showTab("home"); // Set default view to Home

  // Ensure sidebar is hidden when the page loads
  const sidebar = document.getElementById("project-sidebar");
  sidebar.style.right = "-1200px";
  sidebar.style.visibility = "hidden";
});

function renderProjects(projects) {
  const projectsContainer = document.getElementById("projects-container");
  projectsContainer.innerHTML = ""; // Clear previous content

  projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("card");
    projectCard.dataset.id = project.id; // Assign unique project ID

    // Click event to open project details
    projectCard.addEventListener("click", () => viewProject(project.id));

    projectCard.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="card-image">
      <div class="card-info">
        <h3>${project.title}</h3>
      </div>
    `;

    projectsContainer.appendChild(projectCard);
  });
}

function viewProject(id) {
  const project = window.projects.find((p) => p.id === id);
  if (!project) {
    alert("Project not found!");
    return;
  }

  // Populate project details inside the sidebar
  document.getElementById("project-title").innerText = project.title;
  document.getElementById("project-description").innerText =
    project.description;
  document.getElementById("project-tech").innerText = project.tech;
  document.getElementById("project-demo").href = project.demo || "#";
  document.getElementById("project-github").href = project.github || "#";

  // Show sidebar
  const sidebar = document.getElementById("project-sidebar");
  sidebar.style.right = "0";
  sidebar.style.visibility = "visible";
}

document.getElementById("close-sidebar").addEventListener("click", () => {
  const sidebar = document.getElementById("project-sidebar");

  // Move sidebar completely off-screen and hide it
  sidebar.style.right = "-1200px";
  sidebar.style.visibility = "hidden";

  // Ensure all project cards reappear
  document.querySelectorAll(".card").forEach((card) => {
    card.style.display = "inline-block";
  });
});

// Tab Switching Logic
function openSidebarTab(tabName) {
  document.querySelectorAll(".sidebar-tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  document.getElementById(tabName).classList.add("active");

  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.remove("active");
  });

  const tabButton = document.querySelector(
    `[onclick="openSidebarTab('${tabName}')"]`
  );
  if (tabButton) {
    tabButton.classList.add("active");
  }
}

function showTab(tabName) {
  document.querySelectorAll(".tab-content").forEach((section) => {
    section.style.display = "none";
  });

  document.getElementById(tabName).style.display = "block";
}
