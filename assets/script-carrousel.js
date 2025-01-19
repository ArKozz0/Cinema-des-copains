const apiKey = "3000a7d408341cdad51e422e585eb32d"; 
const filmIds = ["558449", "912649", "634649", "539972", "202879","93405"]; 
let currentIndex = 0;

async function fetchFilmDetails(tmdbID) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${tmdbID}?api_key=${apiKey}&language=fr`);
        const data = await response.json();
        if (response.ok) {
            updateFilmDetails(data);
        } else {
            console.error("Erreur API TMDb :", data.status_message);
        }
    } catch (error) {
        console.error("Erreur de connexion :", error);
    }
}

function updateFilmDetails(data) {
    document.getElementById("titre-film").textContent = data.title;
    document.getElementById("description-film").textContent = data.overview;
    document.getElementById("genre").textContent = data.genres.map(genre => genre.name).join(", ");
    document.getElementById("note").textContent = `${data.vote_average} / 10`;

    const backdropUrl = data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : "./assets/images/default-background.png";
    const navigation = document.querySelector(".navigation");

    navigation.style.backgroundImage = `
        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url("${backdropUrl}")
    `;
}

function startFilmRotation() {
    fetchFilmDetails(filmIds[currentIndex]);
    currentIndex++;
    if (currentIndex === filmIds.length) {
        currentIndex = 0;  
    }
}

setInterval(startFilmRotation, 5000);
startFilmRotation(); 