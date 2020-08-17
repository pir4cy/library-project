const firebaseConfig = {
    apiKey: "AIzaSyAjRXAXk7h8E6N--hNQ7W-_LHfKflXSHAA",
    authDomain: "libray-odin.firebaseapp.com",
    databaseURL: "https://libray-odin.firebaseio.com",
    projectId: "libray-odin",
    storageBucket: "libray-odin.appspot.com",
    messagingSenderId: "1033906900315",
    appId: "1:1033906900315:web:e6d8351dc985aedbf2de7e",
    measurementId: "G-KQDBVJKH5J"
  };
  firebase.initializeApp(firebaseConfig);

const library = document.querySelector('#library');
const form = document.querySelector('#newMovie');
const formSubmit = document.querySelector('#submit');
const buttonWatch = document.querySelector('#watched');
var database = firebase.database();
var movieLibrary = database.ref('movieLibrary');


var sliderOutput = document.getElementById("ratingsOutput")
var slider = document.getElementById("myRange");
sliderOutput.innerHTML = slider.value;

slider.oninput = function() {
    sliderOutput.innerHTML = this.value;
  } 
class Movie {
    constructor(title, director, ratings, watched) {
        this.title = title;
        this.director = director;
        this.ratings = ratings;
        this.watched = watched;
    }
    info() {
        return (`<div class="card-body">
    <h5 class="card-title">${this.title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${this.director}</h6>
    <a href="#" class="card-link">${this.ratings}/10</a>
    <p class="card-text">${this.watched ? "Watched" : "Not yet"}</p>
    </div>`);
    }
}

function addMovie() {
    let title = document.forms["newMovie"]["movieTitle"].value;
    let director = document.forms["newMovie"]["movieAuth"].value;
    let rating = slider.value;
    let watched = document.forms["newMovie"]["movieWatched"].checked;
    
    const newMovie = new Movie (title,director,rating,watched)
    movieLibrary.push().set(newMovie);
}

// Rendering movie library
function renderLibrary(){
    movieLibrary.on('value', function(snapshot) {
        library.innerHTML = ''
        snapshot.forEach(function(userSnapshot){
            let movie = userSnapshot.val();
            var movieDiv = document.createElement('div');
            movieDiv.setAttribute('id', `movie${userSnapshot.val().title}`);
            movieDiv.setAttribute('class', 'grid-item card');
            var dispMovie = new Movie(movie.title, movie.director, movie.ratings, movie.watched);
            movieDiv.innerHTML = dispMovie.info();
            library.appendChild(movieDiv)
        });
    });
};

formSubmit.addEventListener('click',addMovie);
renderLibrary();