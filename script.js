/* =========================================================
   ROMUALD IT — SCRIPT.JS
   ========================================================= */


/* =========================================================
   1. RÉCUPÉRATION DES ÉLÉMENTS HTML
========================================================= */

const menuButton = document.getElementById("menuButton");

const navbar = document.getElementById("navbar");

const contactForm = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");


/* =========================================================
   2. MENU MOBILE
========================================================= */

function closeMobileMenu() {
    if (!navbar || !menuButton) return;

    navbar.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Ouvrir le menu");
}

if (menuButton && navbar) {
    menuButton.addEventListener("click", function () {
        const isOpen = navbar.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Fermer le menu" : "Ouvrir le menu"
        );
    });

    navbar.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", function (event) {
        const clickedInsideNavbar = navbar.contains(event.target);
        const clickedMenuButton = menuButton.contains(event.target);

        if (!clickedInsideNavbar && !clickedMenuButton) {
            closeMobileMenu();
        }
    });
}

/* =========================================================
   5. FORMULAIRE DE CONTACT
   Envoi via FormSubmit
========================================================= */

if (contactForm && formMessage) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalButtonText = submitButton
            ? submitButton.innerHTML
            : "";

        formMessage.textContent = "Envoi de ton message en cours...";
        formMessage.style.color = "#64748b";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Envoi en cours...";
        }

        try {
            const response = await fetch(
                "https://formsubmit.co/ajax/romualdit.officiel@gmail.com",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        name: contactForm.elements["name"].value,
                        email: contactForm.elements["email"].value,
                        subject: contactForm.elements["subject"].value,
                        message: contactForm.elements["message"].value,
                        _subject: "Nouveau message — ROMUALD IT",
                        _template: "table"
                    })
                }
            );

            const result = await response.json();

            if (!response.ok || String(result.success) !== "true") {
                throw new Error(
                    result.message || "L'envoi n'a pas abouti."
                );
            }

            formMessage.textContent =
                "Message envoyé avec succès ! Merci de m'avoir contacté.";

            formMessage.style.color = "#15803d";

            contactForm.reset();

        } catch (error) {
    console.error("Erreur du formulaire :", error);

    formMessage.textContent =
        "Erreur : " + error.message;

    formMessage.style.color = "#b91c1c";
    
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        }
    });
}

/* =========================================================
   6. ANNÉE AUTOMATIQUE DU FOOTER
========================================================= */

const currentYear =
    new Date().getFullYear();


const copyright =
    document.querySelector(".copyright");


if (copyright) {

    copyright.textContent =
        "© " +
        currentYear +
        " Romuald IT. Tous droits réservés.";

}


/* =========================================================
   7. ANIMATION LORS DU DÉFILEMENT
========================================================= */

const animatedElements =
    document.querySelectorAll(
        ".skill-card, .project-card, .about-card, .timeline-item"
    );


const observerOptions = {

    threshold: 0.15

};


const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show-element"
                    );

                }

            });

        },
        observerOptions
    );


animatedElements.forEach(
    function (element) {

        observer.observe(element);

    }
);


/* =========================================================
   8. EFFET DE TYPING DANS LE TERMINAL
========================================================= */

const terminalStatus = document.getElementById("terminalStatus");

if (terminalStatus) {

    const statuses = [
        "BUILDING...",
        "LEARNING...",
        "CODING...",
        "SECURING..."
    ];

    let statusIndex = 0;

    setInterval(() => {

        statusIndex =
            (statusIndex + 1) % statuses.length;

        terminalStatus.style.opacity = "0";

        setTimeout(() => {

            terminalStatus.textContent =
                statuses[statusIndex];

            terminalStatus.style.opacity = "1";

        }, 180);

    }, 2500);
}

/* =========================================================
   9. CONSOLE DE DÉVELOPPEUR
========================================================= */

console.log(
    "===================================="
);

console.log(
    "        ROMUALD IT PORTFOLIO"
);

console.log(
    "===================================="
);

console.log(
    "Bienvenue dans le code de Romuald IT 🚀"
);

console.log(
    "HTML + CSS + JavaScript"
);

console.log(
    "Status : BUILDING..."
);


/* =========================================================
   10. SKILLS V2 — CARTES INTERACTIVES
========================================================= */

const skillToggleButtons = document.querySelectorAll(".skill-toggle");

skillToggleButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const detailsId = button.getAttribute("aria-controls");
        const details = document.getElementById(detailsId);

        if (!details) {
            return;
        }

        const isExpanded =
            button.getAttribute("aria-expanded") === "true";

        // Ouvrir ou fermer les détails
        details.hidden = isExpanded;

        button.setAttribute(
            "aria-expanded",
            String(!isExpanded)
        );

        // Modifier le texte du bouton
        const buttonText = button.childNodes[0];

        if (buttonText && buttonText.nodeType === Node.TEXT_NODE) {
            buttonText.textContent = isExpanded
                ? "Explorer mon parcours "
                : "Masquer le parcours ";
        }

    });

});

/* =========================================================
   11. PROJECTS V2 — DÉTAILS INTERACTIFS
========================================================= */

const projectToggleButtons =
    document.querySelectorAll(".project-toggle");

projectToggleButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const detailsId =
            button.getAttribute("aria-controls");

        const details =
            document.getElementById(detailsId);

        const label =
            button.querySelector(".project-toggle-label");

        if (!details || !label) {
            return;
        }

        const isExpanded =
            button.getAttribute("aria-expanded") === "true";

        // Inverser l'état d'affichage
        details.hidden = isExpanded;

        button.setAttribute(
            "aria-expanded",
            String(!isExpanded)
        );

        // Mettre à jour le texte
        label.textContent = isExpanded
            ? "Découvrir le projet"
            : "Masquer les détails";

    });

});

/* =========================================================
   FIN DU JAVASCRIPT
========================================================= */

