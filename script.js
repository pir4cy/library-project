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
var database = firebase.database();
var movieLibrary = database.ref('movieLibrary');

function Movie(title,director,ratings,watched){
    this.title = title;
    this.director = director;
    this.ratings = ratings;
    this.watched = watched; 
}
Movie.prototype.info = function() {
    return (`${this.title}<br>${this.director}<br>${this.ratings}/5<br>
    ${this.watched ? "Watched" : "Not yet"}`); 
};

function addMovie() {
    let title = document.forms["newMovie"]["movieTitle"].value;
    let director = document.forms["newMovie"]["movieAuth"].value;
    let rating = document.forms["newMovie"]["ratingsMovie"].value;
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
            movieDiv.setAttribute('class', 'grid-item');
            var dispMovie = new Movie(movie.title, movie.director, movie.ratings, movie.watched);
            movieDiv.innerHTML = dispMovie.info();
            library.appendChild(movieDiv)
        });
    });
};

formSubmit.addEventListener('click',addMovie);
renderLibrary();