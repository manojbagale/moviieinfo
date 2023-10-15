document.addEventListener("DOMContentLoaded", () => {
    const welcomeContainer = document.querySelector(".welcome-container");
    const searchContainer = document.querySelector(".search-container");
    const continueBtn = document.getElementById("continue-btn");
    const searchBtn = document.getElementById("search-btn");
    const movieSearch = document.getElementById("movie-search");
    const movieDetails = document.getElementById("movie-details");
    const suggestionsList = document.getElementById("suggestions-list");
  
    continueBtn.addEventListener("click", () => {
      welcomeContainer.style.display = "none";
      searchContainer.classList.remove("hidden");
    });
  
    movieSearch.addEventListener("input", async () => {
      const searchTerm = movieSearch.value;
  
      if (searchTerm.length > 2) {
        suggestionsList.innerHTML = "";
  
        try {
          const tmdbApiKey = '6ea0f467801a890c0c3de9d6187494e1';
          const tmdbSearchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${tmdbApiKey}`;
          const tmdbResponse = await fetch(tmdbSearchUrl);
          const tmdbData = await tmdbResponse.json();
  
          if (tmdbData.results.length > 0) {
            tmdbData.results.forEach(movie => {
              const suggestionItem = document.createElement("li");
              suggestionItem.textContent = movie.title;
              suggestionItem.addEventListener("click", () => {
                movieSearch.value = movie.title;
                suggestionsList.innerHTML = "";
              });
              suggestionsList.appendChild(suggestionItem);
            });
          }
        } catch (error) {
          console.error("Error fetching movie suggestions:", error);
        }
      } else {
        suggestionsList.innerHTML = "";
      }
    });
  
    searchBtn.addEventListener("click", async () => {
      const searchTerm = movieSearch.value;
  
      try {
        const tmdbApiKey = '6ea0f467801a890c0c3de9d6187494e1';
        const tmdbApiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${tmdbApiKey}`;
        const tmdbResponse = await fetch(tmdbApiUrl);
        const tmdbData = await tmdbResponse.json();
  
        if (tmdbData.results.length > 0) {
          const movieId = tmdbData.results[0].id;
  
          try {
            const omdbApiKey = '6135d9b8';
            const omdbApiUrl = `https://www.omdbapi.com/?i=${movieId}&apikey=${omdbApiKey}`;
            const omdbResponse = await fetch(omdbApiUrl);
            const omdbData = await omdbResponse.json();
  
            const moviePoster = document.getElementById("movie-poster");
            const movieTitle = document.getElementById("movie-title");
            const imdbRating = document.getElementById("imdb-rating");
            const releaseDate = document.getElementById("release-date");
            const director = document.getElementById("director");
            const shortIntro = document.getElementById("short-intro");
  
            moviePoster.src = `https://image.tmdb.org/t/p/w300/${tmdbData.results[0].poster_path}`;
            movieTitle.textContent = tmdbData.results[0].title;
            releaseDate.textContent = tmdbData.results[0].release_date;
            imdbRating.textContent = omdbData.imdbRating;
            director.textContent = omdbData.Director;
            shortIntro.textContent = tmdbData.results[0].overview;
  
            movieDetails.classList.remove("hidden");
          } catch (error) {
            console.error("Error fetching IMDb rating:", error);
          }
        } else {
          console.error("No movie found.");
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    });
  });
  