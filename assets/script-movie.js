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
    const backdrop = document.getElementById("movie-backdrop"); 
    const actorsContainer = document.querySelector(".actors"); 

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

            if (data.backdrop_path) {
                backdrop.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${data.backdrop_path}')`;
                backdrop.style.backgroundSize = "cover"; 
                backdrop.style.backgroundPosition = "center";
            }

            fetchMovieActors(id);

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
            
            const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
            
            if (trailer) {
                const trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
                trailerIframe.src = trailerUrl;  
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
    
            const actorsList = data.cast.slice(0, 10); 
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
            actorsContainer.innerHTML = actorsHTML;
        } catch (error) {
            console.error("Erreur lors de la récupération des acteurs:", error);
        }
    };

    if (movieId) {
        fetchMovieDetails(movieId);
    }
});