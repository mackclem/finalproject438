import { html, render } from "lit-html";

function saveInput(e) {
  let foodIngredient = document.getElementById("food").value;
  let alcIngredient = document.getElementById("alc").value;
  let movieGen = document.getElementById("movie").value;
  console.log(foodIngredient, alcIngredient, movieGen);
//   alert(movieGen + " " + alcIngredient + " " + foodIngredient);
  getFood(foodIngredient);
  getAlc(alcIngredient);
  getMovie(movieGen);

}

document.getElementById("generate").addEventListener("click", saveInput);

function getFood(food) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "5f1bcea3b6mshae9e99957d58d19p1c4151jsn67493961f466",
      "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    },
  };

  fetch(
    "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=" + food,
    options
  )
    .then((response) => response.json())
    //.then((data) => console.log(data.results[2].slug))
    .then((data) => {
      console.log(data);
      let r = Math.floor(Math.random() * 11);
      let recipewhole = data.results[r];
      console.log(recipewhole);
      if (recipewhole == undefined) {
        let recipe;
        recipe = html`<div class="recipe">
            <h2>Try a different ingredient, no recipes found</h2>
        </div>`;
        render(recipe, document.getElementById("foodResult"));
      } else {
      let recipeurl = data.results[r].slug;
      let recipename = data.results[r].name;
      console.log(recipename);
      console.log(recipeurl);
      let recipe;
      let url = "https://tasty.co/recipe/" + recipeurl;
      recipe = html`<div class="recipe">
        <h2>${recipewhole.name}</h2>
        <a href=${url} target="_blank" rel="noopener noreferrer">Link to recipe!</a>
      </div>`;
      render(recipe, document.getElementById("foodResult"));
    }});
}

function getAlc(drink) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5f1bcea3b6mshae9e99957d58d19p1c4151jsn67493961f466',
            'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
        }
    };
    if (drink == "mocktail") {
        let recipe2;
        let drinkurl = ('https://www.townandcountrymag.com/leisure/drinks/how-to/g785/best-mocktail-recipes/');
        recipe2 = html`<div class="recipe2">
            <h2>Best Mocktails</h2>
            <a href=${drinkurl} target="_blank" rel="noopener noreferrer">Link to drink recipes!</a>
            </div>`;
        render(recipe2, document.getElementById("drinkResult"));

    } else {
        fetch('https://the-cocktail-db.p.rapidapi.com/search.php?s='+drink, options)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                let r = Math.floor(Math.random() * 5);
                let recipedrink = data.drinks[r];
                console.log(recipedrink);
                let drinkid = data.drinks[r].idDrink;
                console.log(drinkid);
                let drinkname = data.drinks[r].strDrink;
                console.log(drinkname);
                let recipe2;
                let drinkurl = ('https://www.thecocktaildb.com/drink/'+ drinkid);
                recipe2 = html`<div class="recipe2">
                    <h2>${recipedrink.strDrink}</h2>
                    <a href=${drinkurl} target="_blank" rel="noopener noreferrer">Link to drink recipe!</a>
                    </div>`;
                render(recipe2, document.getElementById("drinkResult"));
            });
    }
        
}

function getMovie(genre) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5f1bcea3b6mshae9e99957d58d19p1c4151jsn67493961f466',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };
    
    fetch('https://online-movie-database.p.rapidapi.com/title/v2/get-popular-movies-by-genre?genre='+genre+'&limit=10', options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let r = Math.floor(Math.random() * 5);
            let movies = data[r];
            console.log(movies);
            let moviecode= movies.substr(7, 10);
            console.log(moviecode);
            let movieurl = ('https://online-movie-database.p.rapidapi.com/title/get-details?tconst=' +moviecode);
            fetch(movieurl, options)
                .then(response => response.json())
                .then(data => {
                    let movietitle = data.title;
                    let movieyear = data.year;
                    let movie = html`<div class="movie">
                        <h2>${movietitle}</h2>
                        <a>${movieyear}</a>
                        </div>`;
                    render(movie, document.getElementById("movieResult"));
                });
        });
}