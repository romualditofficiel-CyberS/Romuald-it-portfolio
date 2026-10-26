document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("businessContactForm");

    // Cette page peut être chargée sans formulaire business.
    if (!form) return;

    const status = document.getElementById("businessFormStatus");
    const submitButton = document.getElementById("businessSubmitButton");

    if (!status || !submitButton) {
        console.error("Le formulaire business est incomplet : statut ou bouton manquant.");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!form.reportValidity()) return;

        status.textContent = "Envoi de votre demande en cours...";
        submitButton.disabled = true;

        const data = Object.fromEntries(new FormData(form).entries());
        data._subject = "Nouvelle demande — Romuald IT Web Creation";

        try {
            const response = await fetch(
                "https://formsubmit.co/ajax/romualdit.officiel@gmail.com",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );

            const result = await response.json();
            const succeeded = result.success === true ||
                String(result.success).toLowerCase() === "true";

            if (!response.ok || !succeeded) {
                throw new Error("L'envoi n'a pas été confirmé.");
            }

            status.textContent =
                "Demande envoyée ! Merci. Je vous répondrai par e-mail.";
            form.reset();
        } catch (error) {
            status.textContent =
                "L'envoi n'a pas pu être confirmé. Réessayez ou contactez romualdit.officiel@gmail.com directement.";
        } finally {
            submitButton.disabled = false;
        }
    });
});

