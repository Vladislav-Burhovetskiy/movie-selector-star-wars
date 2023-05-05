const EPISODE_ORDER = [0, 4, 5, 6, 1, 2, 3];

const searchField = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", search);

async function search() {
  try {
    const apiResult = await (
      await fetch(`https://swapi.dev/api/films/?search=${searchField.value}`)
    ).json();
    const { count, results } = apiResult;

    const movies = document.getElementById("movies-container");
    results.forEach((movie) => {
      const movieResult = createElement("div");
      movieResult.classList.add("movie");
      const poster = createElement("img");
      poster.setAttribute(
        "src",
        `https://starwars-visualguide.com/assets/img/films/${EPISODE_ORDER.indexOf(
          movie.episode_id
        )}.jpg`
      );
      poster.setAttribute("alt", `${movie.title} poster`);

      const title = createElement("p");
      title.classList.add("movie-title");
      title.innerText = movie.title;
      const link = createElement("a");
      link.setAttribute("href", "https://www.starwars.com/films");

      link.appendChild(poster);
      movieResult.appendChild(link);
      movieResult.appendChild(title);
      movies.appendChild(movieResult);

      const defaultInfo = document.querySelector(".defoult-info");
      defaultInfo.classList.add("hidden");

      // movies.innerHTML += `
      //   <div class="movie">
      //     <img src="" alt=${movie.director}>
      //     <p class="movie-title">${movie.title}</p>
      //   </div>
      // `;
    });
  } catch (e) {
    console.log("handle network errors", e);
  }
}

function createElement(selector) {
  return document.createElement(selector);
}
