/* © Copyright 2025 AnonymusTheGreat
 All Rights Reserved. Tous Droits Réservés.*/
document.getElementById("textToTranslate").addEventListener("input", debounce(translateText, 300));

function translateText() {
    var text = document.getElementById("textToTranslate").value;
    var sourceLang = document.getElementById("sourceLang").value;
    var targetLang = document.getElementById("targetLang").value;

    if (!text) {
        document.getElementById("resultText").innerText = "La traduction va apparaître ici...";
        return;
    }

    // Remplacer les multiples ponctuations excessives par un seul caractère tout en les gardant.
    text = text.replace(/([?!])\1+/g, '$1');
    
    // Assurez-vous que le texte est bien formaté et envoyé correctement à l'API.
    var apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

    axios.get(apiUrl)
        .then(response => {
            var translatedText = '';
            // L'API retourne parfois plusieurs segments, on les combine.
            response.data[0].forEach(segment => {
                translatedText += segment[0] + " ";
            });
            document.getElementById("resultText").innerText = translatedText.trim();
        })
        .catch(error => {
            console.error("Erreur de traduction :", error);
            document.getElementById("resultText").innerText = "Erreur de traduction. Veuillez réessayer ou rafraîchir la page.";
        });
}

function switchLanguages() {
    var sourceLang = document.getElementById("sourceLang").value;
    var targetLang = document.getElementById("targetLang").value;
    document.getElementById("sourceLang").value = targetLang;
    document.getElementById("targetLang").value = sourceLang;
    translateText();
}

// Fonction de décalage pour limiter les appels API rapides
function debounce(func, delay) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
}
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    if (navLinks.style.display === 'block') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'block';
    }
}

//JavaScript pour les thèmes sombre et clair

document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

        // Vérification si le bouton et l'icône existent
        if (!themeToggle || !themeIcon) {
            console.error("Les éléments du bouton ou de l'icône ne sont pas trouvés !");
            return;
        }

    // Éléments à changer de thème
    const boxes = document.querySelectorAll('.box');
    const textareas = document.querySelectorAll('textarea');
    const results = document.querySelectorAll('.result');
    const selects = document.querySelectorAll('.languages select');
    const footer = document.querySelector('footer');
    const header = document.querySelector('.header');

    // Par défaut, appliquer le thème sombre
    document.body.classList.add("dark");
    header.classList.add("dark");
    boxes.forEach(box => box.classList.add("dark"));
    textareas.forEach(textarea => textarea.classList.add("dark"));
    results.forEach(result => result.classList.add("dark"));
    selects.forEach(select => select.classList.add("dark"));
    footer.classList.add("dark");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");

    // Fonction pour changer le thème
    themeToggle.addEventListener("click", function() {
        // Basculer entre les thèmes sombre et clair
        document.body.classList.toggle("dark");
        document.body.classList.toggle("light");
        header.classList.toggle("dark");
        header.classList.toggle("light");
        footer.classList.toggle("dark");
        footer.classList.toggle("light");

        // Basculer les classes sur les autres éléments
        boxes.forEach(box => {
            box.classList.toggle("dark");
            box.classList.toggle("light");
        });
        textareas.forEach(textarea => {
            textarea.classList.toggle("dark");
            textarea.classList.toggle("light");
        });
        results.forEach(result => {
            result.classList.toggle("dark");
            result.classList.toggle("light");
        });
        selects.forEach(select => {
            select.classList.toggle("dark");
            select.classList.toggle("light");
        });

        // Changer l'icône en fonction du thème
        if (document.body.classList.contains("dark")) {
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
            localStorage.setItem("theme", "dark"); // Enregistrer le thème dans localStorage
        } else {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
            localStorage.setItem("theme", "light"); // Enregistrer le thème dans localStorage
        }
    });

    // Restaurer le thème au chargement de la page
    window.onload = function() {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            document.body.classList.add("dark");
            document.body.classList.remove("light");
            header.classList.add("dark");
            footer.classList.add("dark");
            boxes.forEach(box => box.classList.add("dark"));
            textareas.forEach(textarea => textarea.classList.add("dark"));
            results.forEach(result => result.classList.add("dark"));
            selects.forEach(select => select.classList.add("dark"));
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
        } else {
            document.body.classList.add("light");
            document.body.classList.remove("dark");
            header.classList.add("light");
            footer.classList.add("light");
            boxes.forEach(box => box.classList.add("light"));
            textareas.forEach(textarea => textarea.classList.add("light"));
            results.forEach(result => result.classList.add("light"));
            selects.forEach(select => select.classList.add("light"));
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        }
    };
});
