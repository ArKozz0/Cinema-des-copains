document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "3000a7d408341cdad51e422e585eb32d";  // Ta clé API TMDb

    // Récupérer l'ID du film depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    
    // Élément où afficher les détails du film
    const movieTitle = document.getElementById("movie-title");
    const moviePoster = document.getElementById("movie-poster");
    const movieOverview = document.getElementById("movie-overview");
    const movieReleaseDate = document.getElementById("movie-release-date");
    const movieRating = document.getElementById("movie-rating");

    // Fonction pour récupérer les détails du film
    const fetchMovieDetails = async (id) => {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            // Mettre à jour le DOM avec les informations du film
            movieTitle.textContent = data.title;
            moviePoster.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
            movieOverview.textContent = data.overview;
            movieReleaseDate.textContent = `Date de sortie : ${data.release_date}`;
            movieRating.textContent = `Note : ${data.vote_average} / 10`;
        } catch (error) {
            console.error("Erreur lors de la récupération des détails du film:", error);
        }
    };

    // Appeler la fonction pour récupérer les détails du film
    if (movieId) {
        fetchMovieDetails(movieId);
    }
});