const input = document.querySelector(".search-input");
const searchButton = document.querySelector("#search-btn");
const resultContainer = document.querySelector(".result-container");
const favContainer = document.querySelector(".fav-results");


const authToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzAwMzE3YzdhYTEzMjBiYTE3MjU2YzcxZjY2ZTI5NCIsIm5iZiI6MTc0MzY3NTk0NC4xNTI5OTk5LCJzdWIiOiI2N2VlNjIyODg2ODkwNjFlMWZlMTlhYjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OcCmRa9b1mQD7xcB6rCdzu_Tha8OftE-378qOvREdL8";

async function getSearchResults(query) { 
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

async function addToFav(mediaId){
    const url = 'https://api.themoviedb.org/3/account/21924020/favorite';

    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(
            { 
                media_type: 'movie',
                media_id: mediaId, 
                favorite: true 
            })
    };
    const response = await fetch(url, options);
    const result = await response.json()
    if(result.success){
        alert("Movie added successfuly");
    } else{
        alert("Some error occured");

    }
    console.log(result);
    
} 

searchButton.addEventListener('click', async ()=> {
    const inputValue = input.value;
    if(inputValue.trim()==""){
        alert("Please enter a value");
        return;
    }
    const searchData = await getSearchResults(inputValue);
    const searchResults = searchData.results; 
    
    searchResults.forEach(movie => {
        const movieTitle = movie.title;
        const id = movie.id;
        const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const div = document.createElement('div');
        div.innerHTML = `<p>${movieTitle}</p>
        <img class="abc" src=${posterPath}/>
        <button onclick='addToFav(${id})' id="add-fav-btn">Add to fav</button>
        <br>
        <br>
        <br>`;

        resultContainer.append(div);
        
        
    });

    const accountId = "21924020";

});


async function getFavMovies() {
    const url = "https://api.themoviedb.org/3/account/21924020/favorite/movies?language=en-US&page=1&sort_by=created_at.asc";

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    };
    const response = await fetch(url, options);
    console.log(response);
    
    const data = await response.json();
    const result = data.results;

    favContainer.innerHTML = "";


    result.forEach(movie => {
        const movieTitle = movie.title;
        const id = movie.id;
        const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const div = document.createElement('div');
        div.innerHTML = `<p>${movieTitle}</p>
        <img class="abc" src=${posterPath}/>
         <button onclick='removeFav(${id})' id="remove-fav-btn">Remove</button>
        <br>
        <br>
        <br>`;

        favContainer.append(div);
        
        
    });
    
 
}

async function removeFav(mediaId){
    const url = 'https://api.themoviedb.org/3/account/21924020/favorite';

    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(
            { 
                media_type: 'movie',
                media_id: mediaId, 
                favorite: false 
            })
    };
    const response = await fetch(url, options);
    const result = await response.json()
    if(result.success){
        alert("Movie removed successfuly");
    } else{
        alert("Some error occured");

    }
    console.log(result);
    
} 

getFavMovies();



