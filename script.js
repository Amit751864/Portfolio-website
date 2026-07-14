
// =========================
// LOADER
// =========================

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
    loader.style.transition = "0.5s";
  }, 800);
});

// =========================
// DARK / LIGHT MODE
// =========================

const body = document.body;
const themeBtn = document.getElementById("theme-btn");
const themeIcon = themeBtn.querySelector("i");

if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
}

themeBtn.addEventListener("click", () => {
  body.classList.toggle("light");

  if (body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    localStorage.setItem("theme", "dark");
    themeIcon.classList.replace("fa-sun", "fa-moon");
  }
});

// =========================
// TYPING EFFECT
// =========================

const typing = document.getElementById("typing");

const words = [
  "Aspiring Data Analyst",
  "Python Developer",
  "SQL Enthusiast",
  "Power BI Learner",
  "Problem Solver"
];

let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeEffect() {
  const current = words[wordIndex];

  if (!deleting) {
    typing.textContent =
      current.substring(0, letterIndex + 1);

    letterIndex++;

    if (letterIndex === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    typing.textContent =
      current.substring(0, letterIndex - 1);

    letterIndex--;

    if (letterIndex === 0) {
      deleting = false;
      wordIndex =
        (wordIndex + 1) % words.length;
    }
  }

  setTimeout(
    typeEffect,
    deleting ? 70 : 120
  );
}

typeEffect();

// =========================
// MOBILE MENU
// =========================

const menuBtn =
  document.getElementById("menu-btn");

const navLinks =
  document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document
.querySelectorAll(".nav-links a")
.forEach(link => {

  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });

});

// =========================
// PARTICLES
// =========================

const particles =
  document.getElementById("particles");

for (let i = 0; i < 40; i++) {

  const particle =
    document.createElement("span");

  particle.classList.add("particle");

  particle.style.left =
    Math.random() * 100 + "%";

  particle.style.top =
    Math.random() * 100 + "%";

  particle.style.width =
    Math.random() * 6 + 4 + "px";

  particle.style.height =
    particle.style.width;

  particle.style.position =
    "absolute";

  particle.style.borderRadius =
    "50%";

  particle.style.background =
    "rgba(59,130,246,0.6)";

  particle.style.animation =
    `float ${Math.random() * 15 + 10}s linear infinite`;

  particles.appendChild(particle);
}

// =========================
// SKILL BARS
// =========================

const bars =
  document.querySelectorAll(".bar span");

const barObserver =
  new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.style.width =
          entry.target.dataset.width;
      }

    });

  });

bars.forEach(bar =>
  barObserver.observe(bar)
);

// =========================
// PROJECT FILTERS
// =========================

const filters =
  document.querySelectorAll(".filter");

const cards =
  document.querySelectorAll(".project-card");

filters.forEach(btn => {

  btn.addEventListener("click", () => {

    filters.forEach(x =>
      x.classList.remove("active")
    );

    btn.classList.add("active");

    const filter =
      btn.dataset.filter;

    cards.forEach(card => {

      if (
        filter === "all" ||
        card.classList.contains(filter)
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }

    });

  });

});

// =========================
// COUNTER ANIMATION
// =========================

const counters =
  document.querySelectorAll(".stat-box h4");

function runCounter(counter) {

  const target =
    parseInt(counter.innerText);

  let count = 0;

  const timer = setInterval(() => {

    count++;

    counter.innerText =
      count + "+";

    if (count >= target) {
      clearInterval(timer);
    }

  }, 150);
}

const counterObserver =
  new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        runCounter(entry.target);

        counterObserver.unobserve(
          entry.target
        );

      }

    });

  });

counters.forEach(counter =>
  counterObserver.observe(counter)
);

// =========================
// BACK TO TOP
// =========================

const topBtn =
  document.getElementById("top-btn");

window.addEventListener("scroll", () => {

  if (window.scrollY > 400) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }

});

topBtn.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});

// =========================
// GITHUB REPOSITORIES
// =========================

fetch(
  "https://api.github.com/users/Amit751864/repos"
)
.then(res => res.json())
.then(data => {

  const container =
    document.getElementById(
      "github-projects"
    );

  data
    .sort(
      (a, b) =>
        b.stargazers_count -
        a.stargazers_count
    )
    .slice(0, 6)
    .forEach(repo => {

      container.innerHTML += `
        <div class="project-card">

          <div style="padding:25px">

            <h3>${repo.name}</h3>

            <p>
              ${
                repo.description ||
                "No description available"
              }
            </p>

            <a
              href="${repo.html_url}"
              target="_blank"
              style="
                color:#3b82f6;
                text-decoration:none;
                font-weight:600;
              "
            >
              View Repository
            </a>

          </div>

        </div>
      `;

    });

})
.catch(error => {
  console.log(error);
});

// =========================
// SCROLL REVEAL
// =========================

const revealItems =
  document.querySelectorAll(
    ".section, .skill-card, .project-card, .timeline-card"
  );

function reveal() {

  const trigger =
    window.innerHeight - 100;

  revealItems.forEach(item => {

    const top =
      item.getBoundingClientRect().top;

    if (top < trigger) {
      item.style.opacity = "1";
      item.style.transform =
        "translateY(0)";
    }

  });

}

window.addEventListener("scroll", reveal);
reveal();

// =========================
// INITIAL STYLES
// =========================

revealItems.forEach(item => {

  item.style.opacity = "0";

  item.style.transform =
    "translateY(60px)";

  item.style.transition =
    "all 0.8s ease";

});

// =========================
// EMAILJS
// =========================

// Replace these values
// with your EmailJS IDs.

emailjs.init("ubZZs8qPuSGQA7GTT");

const form =
  document.getElementById(
    "contact-form"
  );

form.addEventListener(
  "submit",
  function (e) {

    e.preventDefault();

    const params = {
      name:
        document.getElementById(
          "name"
        ).value,

      email:
        document.getElementById(
          "email"
        ).value,

      message:
        document.getElementById(
          "message"
        ).value
    };

    emailjs.send(
      "service_h1fyn7h",
      "template_yi6mqeo",
      params
    )
    .then(() => {

      alert(
        "Message Sent Successfully 🚀"
      );

      form.reset();

    })
    .catch(() => {

      alert(
        "Something went wrong."
      );

    });

  }
);

// =========================
// CONSOLE MESSAGE
// =========================

console.log(
  "Welcome to Amit Kumar Gupta's Portfolio 🚀"
);

