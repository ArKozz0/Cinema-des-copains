import { apiKey } from './cle-api.js';

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    
    const movieTitle = document.getElementById("movie-title");
    const moviePoster = document.getElementById("movie-poster");
    const movieOverview = document.getElementById("movie-overview");
    const movieReleaseDate = document.getElementById("movie-release-date");
    const movieRating = document.getElementById("movie-rating");
    const trailerIframe = document.getElementById("trailer-video");
    const backdrop = document.getElementById("movie-backdrop"); // Ajout de l'élément pour le fond d'écran
    const actorsContainer = document.querySelector(".actors"); // Container pour les acteurs

    const fetchMovieDetails = async (id) => {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=fr`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            movieTitle.textContent = data.title;
            moviePoster.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
            movieOverview.textContent = data.overview;
            movieReleaseDate.textContent = `Date de sortie : ${data.release_date}`;
            movieRating.textContent = `Note : ${data.vote_average} / 10`;

            // Récupérer et afficher le fond d'écran
            if (data.backdrop_path) {
                backdrop.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${data.backdrop_path}')`;
                backdrop.style.backgroundSize = "cover"; // S'assurer que l'image couvre bien toute la surface
                backdrop.style.backgroundPosition = "center"; // Centrer l'image
            }

            // Appel pour récupérer les acteurs du film
            fetchMovieActors(id);

            // Appel de la fonction pour récupérer la bande-annonce
            fetchMovieTrailer(id);
        } catch (error) {
            console.error("Erreur lors de la récupération des détails du film:", error);
        }
    };

    const fetchMovieTrailer = async (id) => {
        const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=fr`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            // Vérifier s'il existe une bande-annonce sur YouTube
            const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
            
            if (trailer) {
                const trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
                trailerIframe.src = trailerUrl;  // Insérer l'URL de la bande-annonce dans l'iframe
            } else {
                console.log('Aucune bande-annonce trouvée.');
            }
        } catch (error) {
            console.error("Erreur lors de la récupération de la bande-annonce:", error);
        }
    };

    const fetchMovieActors = async (id) => {
        const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=fr`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
    
            // Créer un élément HTML pour afficher les acteurs dans un tableau
            const actorsList = data.cast.slice(0, 10); // Limiter à 10 acteurs pour la présentation
            let actorsHTML = "<table><thead><tr><th>Acteur</th><th>Image</th></tr></thead><tbody>";
            
            actorsList.forEach(actor => {
                actorsHTML += `
                    <tr>
                        <td>${actor.name}</td>
                        <td><img src="https://image.tmdb.org/t/p/w500${actor.profile_path}" alt="${actor.name}" class="actor-image"></td>
                    </tr>
                `;
            });
    
            actorsHTML += "</tbody></table>";
            actorsContainer.innerHTML = actorsHTML; // Insérer la liste des acteurs dans la section .actors
        } catch (error) {
            console.error("Erreur lors de la récupération des acteurs:", error);
        }
    };

    if (movieId) {
        fetchMovieDetails(movieId);
    }
});