const library = document.querySelector('#library')
const form = document.querySelector('#newMovie');
const formSubmit = document.querySelector('#submit')
let myLibrary = [];

function Movie(title,director,ratings,watched){
    this.title = title;
    this.director = director;
    this.ratings = ratings;
    this.watched = watched; 
    
    this.info = function() {
        return (`${title}<br>${director}<br>${ratings}/5<br>
        ${watched ? "Watched" : "Not yet"}`);
    }
}

function addMovie() {
    let title = document.forms["newMovie"]["movieTitle"].value;
    let director = document.forms["newMovie"]["movieAuth"].value;
    let rating = document.forms["newMovie"]["ratingsMovie"].value;
    let watched = document.forms["newMovie"]["movieWatched"].checked;
    const newMovie = new Movie (title,director,rating,watched)
    myLibrary.push(newMovie)

    const movieDiv = document.createElement('div');
    movieDiv.setAttribute('id', `movie${myLibrary.length}`);
    movieDiv.setAttribute('class', 'grid-item');
    movieDiv.innerHTML = newMovie.info();

    library.appendChild(movieDiv)
}

formSubmit.addEventListener('click',addMovie);


// Rmove this function when firebase is implemented
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);
console.log(myLibrary)