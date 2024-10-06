//Sidebar

function showSidebar() {
  const sidebar = document.getElementById("side-bar");
  sidebar.classList.add("show");
}

function hideSidebar() {
  const sidebar = document.getElementById("side-bar");
  sidebar.classList.remove("show");
}

//EnterAnimation

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

//Footer Year
const currentYear = new Date().getFullYear();
const ftYear = document.getElementById("footer-year");
ftYear.textContent = currentYear;
ftYear.style.color = "white";