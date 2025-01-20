$(document).ready(function () {
  const affiches = [
    { Poster: 'https://example.com/film1.jpg', Title: 'Back in action' },
    { Poster: 'https://example.com/film2.jpg', Title: 'Kraven the Hunter' },
    { Poster: 'https://example.com/film3.jpg', Title: 'Wicked' },
    { Poster: 'https://example.com/film1.jpg', Title: 'The Calendar Killer' },
    { Poster: 'https://example.com/film2.jpg', Title: 'Unstoppable' },
    { Poster: 'https://example.com/film1.jpg', Title: 'Sonic the Hedgehog 3' },
    { Poster: 'https://example.com/film2.jpg', Title: 'Film 2' },
    { Poster: 'https://example.com/film3.jpg', Title: 'Film 3' },
    { Poster: 'https://example.com/film1.jpg', Title: 'Film 1' },
    { Poster: 'https://example.com/film2.jpg', Title: 'Film 2' },
  ];

  function renderAffiches(data) {
    const $affichesDiv = $('.affiches');
    $affichesDiv.empty();

    data.forEach(film => {
      const posterUrl = film.poster_path
        ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
        : 'placeholder.jpg';

      const $affiche = $(`
        <div class="affiche">
          <img src="${posterUrl}" alt="${film.title || film.Title}">
          <div class="affiche-info">
            <h2>${film.title || film.Title}</h2>
            <button>En savoir plus</button>
          </div>
        </div>
      `);

      $affiche.find('button').on('click', function () {
        window.location.href = 'movie.html';
      });

      $affichesDiv.append($affiche);
    });
  }

  // Affiche les affiches initiales
  renderAffiches(affiches);

  // Recherche en temps réel
  $('#recherche-input').on('input', async function () {
    const recherche = $(this).val();
    if (recherche === '') {
      renderAffiches(affiches);
    } else {
      const apiKey = '3000a7d408341cdad51e422e585eb32d';
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${recherche}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // Vérifie la réponse
        if (data.results && data.results.length > 0) {
          renderAffiches(data.results);
        } else {
          $('.affiches').html('<p>Aucun résultat trouvé.</p>');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    }
  });
});