/* =========================================================
   SYNXEX — JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const navbar = document.querySelector(".navbar");


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

function setTheme(theme) {

    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("synxex-theme", theme);


    if (theme === "dark") {

        themeIcon.textContent = "☀";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    } else {

        themeIcon.textContent = "☾";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );
    }
}


/* =========================================================
   LOAD SAVED THEME
========================================================= */

const savedTheme = localStorage.getItem("synxex-theme");


if (savedTheme) {

    setTheme(savedTheme);

} else {

    const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;


    if (prefersDark) {

        setTheme("dark");

    } else {

        setTheme("light");

    }
}


/* =========================================================
   THEME TOGGLE
========================================================= */

themeToggle.addEventListener("click", function () {

    const currentTheme =
        document.documentElement.getAttribute("data-theme");


    if (currentTheme === "dark") {

        setTheme("light");

    } else {

        setTheme("dark");

    }

});


/* =========================================================
   MOBILE MENU
========================================================= */

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");


    if (navLinks.classList.contains("active")) {

        menuToggle.textContent = "✕";

        menuToggle.setAttribute(
            "aria-label",
            "Close menu"
        );

    } else {

        menuToggle.textContent = "☰";

        menuToggle.setAttribute(
            "aria-label",
            "Open menu"
        );

    }

});


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICKING LINK
========================================================= */

const navigationLinks =
    document.querySelectorAll(".nav-links a");


navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute(
            "aria-label",
            "Open menu"
        );

    });

});


/* =========================================================
   NAVBAR SHADOW ON SCROLL
========================================================= */

function handleNavbarScroll() {

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    handleNavbarScroll
);


handleNavbarScroll();


/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".product-card, .feature-text, .feature-panel, .security-card, .network-item"
    );


revealElements.forEach(function (element) {

    element.classList.add("reveal");

});


const observer =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(function (element) {

    observer.observe(element);

});


/* =========================================================
   ESC KEY — CLOSE MOBILE MENU
========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        navLinks.classList.remove("active");

        menuToggle.textContent = "☰";

    }

});


/* =========================================================
   PREVENT BROKEN HASH JUMP
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");


        if (
            targetId &&
            targetId !== "#"
        ) {

            const target =
                document.querySelector(targetId);


            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }

    });

});