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

//Fade in Page

function fadeInPage() {
  if (!window.AnimationEvent) {
    return;
  }
  var fader = document.getElementById("fader");
  fader.classList.add("fade-out");
}

fadeInPage();

document.addEventListener("DOMContentLoaded", function () {
  if (!window.AnimationEvent) {
    return;
  }
  var anchors = document.getElementsByTagName("a");

  for (var idx = 0; idx < anchors.length; idx += 1) {
    if (
      anchors[idx].hostname !== window.location.hostname ||
      anchors[idx].pathname === window.location.pathname
    ) {
      continue;
    }
    anchors[idx].addEventListener("click", function (event) {
      var fader = document.getElementById("fader"),
        anchor = event.currentTarget;

      var listener = function () {
        window.location = anchor.href;
        fader.removeEventListener("animationend", listener);
      };
      fader.addEventListener("animationend", listener);

      event.preventDefault();
      fader.classList.add("fade-in");
    });
  }
});

// Apply fade effect when navigating back/forward (pageshow event)
window.addEventListener("pageshow", function (event) {
  var fader = document.getElementById("fader");

  // If the page is restored from the cache (e.g., after back/forward), apply fade-out
  if (event.persisted) {
    fader.classList.remove("fade-in");
    fader.classList.add("fade-out");
  }
});

//Course Filter

document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".cat-filter-btn");
  const courseItems = document.querySelectorAll(".course");

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  function updateUrl(category) {
    const url = new URL(window.location);
    if (category === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", category);
    }
    window.history.pushState({}, "", url);
  }

  function applyFilter(category) {
    filterBtns.forEach((btn) => btn.classList.remove("cat-filter-btn-active"));

    if (category === "all" || !category) {
      document
        .querySelector('.cat-filter-btn[data-category="all"]')
        .classList.add("cat-filter-btn-active");
    } else {
      const activeButton = document.querySelector(
        `.cat-filter-btn[data-category="${category}"]`
      );
      if (activeButton) {
        activeButton.classList.add("cat-filter-btn-active");
      }
    }

    courseItems.forEach((courseItem) => {
      if (!category || category === "all") {
        courseItem.classList.remove("hidden1");
      } else {
        if (courseItem.getAttribute("data-category") === category) {
          courseItem.classList.remove("hidden1");
        } else {
          courseItem.classList.add("hidden1");
        }
      }
    });
  }

  const initialCategory = getQueryParam("category") || "all";
  applyFilter(initialCategory);

  filterBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      applyFilter(category);
      updateUrl(category);
    });
  });

  window.addEventListener("popstate", () => {
    const category = getQueryParam("category") || "all";
    applyFilter(category);
  });
});


//Course Page Accordion

var acc = document.getElementsByClassName("course-page-btn");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}