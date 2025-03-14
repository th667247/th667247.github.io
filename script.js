
document.addEventListener("DOMContentLoaded", function () {
  AOS.init(); // Initialize AOS animations

  // Select elements once to prevent duplicate declarations
  const navbar = document.getElementById("navbar");
  const logo = document.querySelector(".logo");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  // Define default values for logo text
  const fullName = "Thrisha Armstrong";
  const initials = "TA";

  // Sticky Navbar Effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
      logo.innerHTML = '<img src="Assets/YMXv.gif" alt="Animated Logo">';
    } else {
      navbar.classList.remove("scrolled");
      logo.innerHTML = fullName;
    }
  });

  // Change logo text on hover
  logo.addEventListener("mouseenter", () => {
    logo.innerText = fullName;
  });

  logo.addEventListener("mouseleave", () => {
    if (window.scrollY > 50) {
      logo.innerText = initials;
    } else {
      logo.innerText = fullName;
    }
  });

  // Fetch projects from db.json and display them
  fetch("db.json")
    .then(response => response.json())
    .then(data => {
      const projectsContainer = document.getElementById("projects-container");
      projectsContainer.innerHTML = ""; // Clear existing content

      data.projects.forEach(project => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        projectCard.innerHTML = `
          <img src="${project.image || 'placeholder.jpg'}" alt="${project.title}">
          <div class="project-overlay">
            <h3>${project.title}</h3>
            <p>${project.description || "No description available"}</p>
          </div>
        `;

        // Make the entire card clickable
        projectCard.addEventListener("click", () => {
          window.location.href = `project.html?id=${project.id}`;
        });

        projectsContainer.appendChild(projectCard);
      });
    })
    .catch(error => console.error("Error fetching projects:", error));

  // Mobile Navbar Toggle
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }
});

