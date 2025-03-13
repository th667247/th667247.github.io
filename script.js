document.addEventListener("DOMContentLoaded", function() {
  AOS.init(); // Initialize AOS animations

  // Sticky Navbar Effect
  window.addEventListener("scroll", function() {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
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

        // Make the entire card clickable
        projectCard.addEventListener("click", () => {
          window.location.href = `project.html?id=${project.id}`;
        });

        projectCard.innerHTML = `
          <img src="${project.image || 'placeholder.jpg'}" alt="${project.title}">
          <div class="project-overlay">
            <h3>${project.title}</h3>
            <p>${project.description || "No description available"}</p>
          </div>
        `;

        projectsContainer.appendChild(projectCard);
      });
    })
    .catch(error => console.error("Error fetching projects:", error));

    const logo = document.getElementById("logo");
    const navbar = document.getElementById("navbar");
    
    // Store Full Name and Initials in Data Attributes
    const fullName = logo.dataset.fullname;
    const initials = logo.dataset.initials;
  
    // Change logo text on hover
    logo.addEventListener("mouseenter", () => {
      logo.innerText = fullName;
    });
  
    logo.addEventListener("mouseleave", () => {
      if (window.scrollY > 50) {
        logo.innerText = initials;
      }
    });
  
    // Change logo on scroll
    window.addEventListener("scroll", function() {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
        logo.innerText = initials;
      } else {
        navbar.classList.remove("scrolled");
        logo.innerText = fullName;
      }
    });
  });

