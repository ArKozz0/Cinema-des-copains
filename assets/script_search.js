import { apiKey } from './cle-api.js';


$(document).ready(function () {
  let pageActuel = 1; 
  let rechercheActuel = ''; 
  let enChargement = false; 

  async function fetchFilms(page, query = '') {
    const url = query
      ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${page}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des films :', error);
      return [];
    }
  }

  function renderAffiches(data, append = false) {
    const $affichesDiv = $('.affiches');
    if (!append) $affichesDiv.empty();
    if (data.length === 0) {
      if (!append) $affichesDiv.html('<p>Aucun résultat trouvé.</p>');
      return;
    }
    data.forEach(film => {
      let posterUrl;
      if (film.poster_path) {
        if (film.poster_path.endsWith('.jpg') && !film.poster_path.startsWith('http')) {
          posterUrl = `https://image.tmdb.org/t/p/w500${film.poster_path}`;
        } else {
          posterUrl = film.poster_path;
        }
      } else {
        posterUrl = 'placeholder.jpg';
      }

      const title = film.title || 'Titre inconnu';
      const $affiche = $(`
        <div class="affiche">
          <img src="${posterUrl}" alt="${title}">
          <div class="affiche-info">
            <h2>${title}</h2>
          </div>
        </div>
      `);
      $affiche.find('img').on('click', function () {
        window.location.href = `movie.html?id=${film.id}`;
      });
      $affichesDiv.append($affiche);
    });
  }

  async function chargerFilm(query = '', append = false) {
    if (enChargement) return; 
    enChargement = true;
    const movies = await fetchFilms(pageActuel, query);
    renderAffiches(movies, append);
    enChargement = false;
  }

  async function chargerPlusDeFilm() {
    if (enChargement) return; 
    pageActuel += 1; 
    await chargerFilm(rechercheActuel, true); 
  }

  chargerFilm();
  $('#plus-de-films-btn').on('click', chargerPlusDeFilm);
  $('#recherche-input').on('input', async function () {
    rechercheActuel = $(this).val(); 
    pageActuel = 1; 
    await chargerFilm(rechercheActuel); 
  });
});
