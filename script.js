document.getElementById("messageForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const message = document.getElementById("message").value;
    //web storage api
    // Trouver une clé unique
    let index = 1;
    while (localStorage.getItem(`userMessage${index}`)) {
        index++;
    }

    // Enregistrer le message
    localStorage.setItem(`userMessage${index}`, message);

    // Réinitialiser le formulaire et rafraîchir l'affichage
    document.getElementById("messageForm").reset();
    afficherMessages();
});

function afficherMessages() {
    const container = document.getElementById("savedMessage");
    container.innerHTML = "<strong>Messages enregistrés :</strong><ul>";

    // Trier les clés pour un affichage ordonné
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("userMessage")) {
            keys.push(key);
        }
    }
    keys.sort();

    // Affichage
    keys.forEach((key) => {
        const value = localStorage.getItem(key);
        container.innerHTML += `
           <br>  <li>
               <strong>${key} :</strong> ${value}
                <button onclick="supprimerMessage('${key}')">Supprimer</button> 
            </li>
        `;
    });

    container.innerHTML += "</ul>";
}

function supprimerMessage(key) {
    localStorage.removeItem(key);
    afficherMessages();
}

// Affichage au chargement
window.onload = afficherMessages;
