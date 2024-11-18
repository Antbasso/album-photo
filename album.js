console.log("Bienvenue dans mon album photo !");

let titre1 = document.getElementById('fleurs');
titre1.style.color = 'red';

let titre2 = document.getElementById('insectes');
titre2.style.color = 'green';

let titre3 = document.getElementById('lacs');
titre3.style.color = 'yellow';

let like_off = document.getElementById('like_off');
let like_on = document.getElementById('like_on');

function like_switch_on(element) {
    element.src = "icons/like_on.png";
    element.onclick = function () { like_switch_off(element); };
  }
  
  function like_switch_off(element) {
    element.src = "icons/like_off.png";
    element.onclick = function () { like_switch_on(element); };
  }
  

document.addEventListener("DOMContentLoaded", function() {
    const titreAlbum = document.querySelectorAll("main h2");

    titreAlbum.forEach(title => {
        const album = title.nextElementSibling;
        const nbrImage = album.querySelectorAll("img").length;
            title.textContent += ` (${nbrImage/2} images)`;
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Initialiser la carte dans le conteneur avec l'ID "carte"
    const map = L.map('carte').setView([46.0, 6.5], 6);

    // Ajouter une couche de tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Ajouter des marqueurs pour chaque photo avec des coordonnées réalistes
    const photos = [
        // Fleurs
        { lat: 44.57678812270809, lng: 6.357929706573487, title: "img_fleur_01.jpg" }, // Alpes-Maritimes, Nice
        { lat: 45.830254, lng: 6.865661, title: "img_fleur_02.jpg" }, // Parc de Merlet, Chamonix
        { lat: 48.208174, lng: 2.412215, title: "img_fleur_03.jpg" }, // Jardin des Plantes, Paris

        // Insectes
        { lat: 47.174787, lng: 2.276737, title: "img_insecte_01.jpg" }, // Réserve naturelle de la Brière (Loire-Atlantique)
        { lat: 45.902484, lng: 4.747369, title: "img_insecte_02.jpg" }, // Parc de la Tête d'Or, Lyon
        { lat: 46.749658, lng: 4.838542, title: "img_insecte_03.jpg" }, // Forêt de Troncais, Allier

        // Lacs
        { lat: 45.866743, lng: 6.860803, title: "img_lac_01.jpg" }, // Lac d'Annecy, Haute-Savoie
        { lat: 45.905899, lng: 6.129133, title: "img_lac_02.jpg" }, // Lac Léman, Genève
        { lat: 45.480348, lng: 6.674142, title: "img_lac_03.jpg" }, // Lac de Tignes, Savoie
        { lat: 44.859212, lng: 6.635555, title: "img_lac_04.jpg" }, // Lac de Serre-Ponçon, Alpes-de-Haute-Provence
        { lat: 44.543472, lng: 6.991681, title: "img_lac_05.jpg" }, // Lac de Vens, Alpes-Maritimes
        { lat: 43.774519, lng: 6.952944, title: "img_lac_06.jpg" }, // Lac de Sainte-Croix, Var
        { lat: 45.935899, lng: 6.523748, title: "img_lac_07.jpg" }, // Lac du Bourget, Savoie
        { lat: 47.064744, lng: 6.838773, title: "img_lac_08.jpg" }, // Lac de Neuchâtel, Suisse
        { lat: 46.416174, lng: 6.047867, title: "img_lac_09.jpg" }, // Lac de Morat, Suisse
    ];

    // Ajouter chaque photo avec son marqueur
    photos.forEach(photo => {
        L.marker([photo.lat, photo.lng])
            .addTo(map)
            .bindPopup(`<strong>${photo.title}</strong><br>Latitude: ${photo.lat}<br>Longitude: ${photo.lng}`);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const commentForm = document.getElementById("commentForm");
    const commentInput = document.getElementById("commentInput");
    const commentsContainer = document.getElementById("commentsContainer");

    // Charger les commentaires du localStorage à l'ouverture de la page
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    displayComments();

    // Soumission du formulaire pour ajouter un commentaire
    commentForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche la soumission du formulaire

        const commentText = commentInput.value.trim(); // Récupère et nettoie le commentaire
        if (commentText) {
            const timestamp = new Date().toLocaleString(); // Récupère la date et l'heure actuelle
            const comment = { text: commentText, time: timestamp }; // Structure du commentaire
            comments.unshift(comment); // Ajoute le commentaire en premier dans la liste
            localStorage.setItem("comments", JSON.stringify(comments)); // Enregistre dans le localStorage
            commentInput.value = ""; // Réinitialise le champ de saisie
            displayComments(); // Actualise l'affichage
        }
    });

    // Fonction pour afficher les commentaires dans l'ordre inverse
    function displayComments() {
        commentsContainer.innerHTML = ""; // Vide le conteneur avant de l'actualiser
        comments.forEach(comment => {
            const commentElement = document.createElement("div");
            commentElement.style.marginBottom = "10px";

            const textElement = document.createElement("p");
            textElement.textContent = comment.text;
            textElement.style.margin = "0";

            const timeElement = document.createElement("small");
            timeElement.textContent = `Posté le : ${comment.time}`;
            timeElement.style.color = "#555";

            commentElement.appendChild(textElement);
            commentElement.appendChild(timeElement);
            commentsContainer.appendChild(commentElement);
        });
    }
});

