const affichesDiv = document.querySelector('.affiches');
const affiches = [
  { Poster: 'https://example.com/film1.jpg' },
  { Poster: 'https://example.com/film2.jpg' },
  { Poster: 'https://example.com/film3.jpg' },
  { Poster: 'https://example.com/film4.jpg' },
  { Poster: 'https://example.com/film5.jpg' },
  { Poster: 'https://example.com/film3.jpg' },
  { Poster: 'https://example.com/film4.jpg' },
  { Poster: 'https://example.com/film5.jpg' },
  { Poster: 'https://example.com/film3.jpg' },
  { Poster: 'https://example.com/film4.jpg' },
  { Poster: 'https://example.com/film5.jpg' },
];
affiches.forEach(film => {
    const affiche = document.createElement('div');
    affiche.className = 'affiche';
  
    const imageElement = document.createElement('img');
    imageElement.src = film.Poster;
    affiche.appendChild(imageElement);
  
    const afficheInfo = document.createElement('div');
    afficheInfo.className = 'affiche-info';
  
    const titreElement = document.createElement('h2');
    titreElement.textContent = film.Title;
    afficheInfo.appendChild(titreElement);
  
    const buttonElement = document.createElement('button');
    buttonElement.textContent = 'En savoir plus';
    buttonElement.onclick = function() {
      window.location.href = 'movie.html';
    };
    afficheInfo.appendChild(buttonElement);
  
    affiche.appendChild(afficheInfo);
    affichesDiv.appendChild(affiche);
  });

  const rechercheInput = document.getElementById('recherche-input');
  rechercheInput.addEventListener('input', async function() {
    const recherche = rechercheInput.value;
    if (recherche === '') {
      affichesDiv.innerHTML = '';
      affiches.forEach(film => {
        const affiche = document.createElement('div');
        affiche.className = 'affiche';
  
        const imageElement = document.createElement('img');
        imageElement.src = film.Poster;
        affiche.appendChild(imageElement);
  
        const afficheInfo = document.createElement('div');
        afficheInfo.className = 'affiche-info';
  
        const titreElement = document.createElement('h2');
        titreElement.textContent = film.Title;
        afficheInfo.appendChild(titreElement);
  
        const buttonElement = document.createElement('button');
        buttonElement.textContent = 'En savoir plus';
        buttonElement.onclick = function() {
          window.location.href = 'movie.html';
        };
        afficheInfo.appendChild(buttonElement);
  
        affiche.appendChild(afficheInfo);
        affichesDiv.appendChild(affiche);
      });
    } else {
      const apiKey = '3000a7d408341cdad51e422e585eb32d';
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${recherche}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length > 0) {
        affichesDiv.innerHTML = '';
        data.results.forEach(film => {
          const affiche = document.createElement('div');
          affiche.className = 'affiche';
  
          const imageElement = document.createElement('img');
          imageElement.src = `https://image.tmdb.org/t/p/w500${film.poster_path}`;
          affiche.appendChild(imageElement);
  
          const afficheInfo = document.createElement('div');
          afficheInfo.className = 'affiche-info';
  
          const titreElement = document.createElement('h2');
          titreElement.textContent = film.title;
          afficheInfo.appendChild(titreElement);
  
          const buttonElement = document.createElement('button');
          buttonElement.textContent = 'En savoir plus';
          buttonElement.onclick = function() {
            window.location.href = 'movie.html';
          };
          afficheInfo.appendChild(buttonElement);
  
          affiche.appendChild(afficheInfo);
          affichesDiv.appendChild(affiche);
        });
      }
    }
  });