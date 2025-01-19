document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "3000a7d408341cdad51e422e585eb32d";  
    const filmsList = document.getElementById("films-list");  
    
    const fetchTendanceFilms = async () => {
        const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            const films = data.results.slice(0, 10); 
            
            filmsList.innerHTML = "";
            
            films.forEach(film => {
                const filmElement = document.createElement("div");
                filmElement.classList.add("film");
                
               
                const filmLink = document.createElement("a");
                filmLink.href = `movie.html?id=${film.id}`;  
                
                filmLink.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" alt="${film.title}" class="film-poster">
                    <h4>${film.title}</h4>
                    <p>${film.release_date}</p> 
                `;
                
                filmElement.appendChild(filmLink); 
                filmsList.appendChild(filmElement);
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des films:", error);
        }
    };

    fetchTendanceFilms();
});