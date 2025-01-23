const apiKey = "3000a7d408341cdad51e422e585eb32d";  

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    
    const movieTitle = document.getElementById("movie-title");
    const moviePoster = document.getElementById("movie-poster");
    const movieOverview = document.getElementById("movie-overview");
    const movieReleaseDate = document.getElementById("movie-release-date");
    const movieRating = document.getElementById("movie-rating");
    const trailerIframe = document.getElementById("trailer-video");

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

    if (movieId) {
        fetchMovieDetails(movieId);
    }
});