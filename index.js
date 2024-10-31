const express = require('express');
const path = require('path');
const {
  getTopRatedMovies,
  getMoviesByGenre,
  getMovieDetailsById,
  selectRandomMovieId,
  randomNumOfMovies,
} = require('./utils/movieUtils');
const { Movies, Genres } = require('./utils/data');

const app = express();
const router = express.Router();

// Route for top-rated movies
router.get('/topRated', (req, res) => {
  const topRatedMovies = getTopRatedMovies(15);
  res.render('topRatedMovies', { movies: topRatedMovies });
});

// Route to movie details
router.get('/movie/:id', (req, res) => {
  const movieId = req.params.id;
  const movie = Movies.find(m => m.id === parseInt(movieId));

  if (movie) {
    // Find movies of the same genre, excluding the current one
    const recommendedMovies = Movies.filter(
      m => m.genre === movie.genre && m.id !== movie.id
    );

    // Shuffle and pick 3 random recommendations
    const shuffled = recommendedMovies.sort(() => 0.5 - Math.random());
    const recommendations = shuffled.slice(0, 3);

    // Get a random movie for the header
    const randomMovie = selectRandomMovieId();
    res.render('movieDetail', { randomMovie }); // Replace 'yourPage' with your template, like 'movieDetail' or 'index'

    res.render('movieDetail', { movie, recommendations, randomMovie }); // Pass everything to the view
  } else {
    res.status(404).send('Movie not found');
  }
});
// To get a Random Movie.
router.get('/randomMovie', (req, res) => {
  const randomMovieId = selectRandomMovieId();
  const movie = Movies.find(m => m.id === randomMovieId);

  if (movie) {
    // Get 3 random recommendations for the same genre
    const recommendedMovies = Movies.filter(
      m => m.genre === movie.genre && m.id !== movie.id
    );
    const recommendations = recommendedMovies
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    res.render('movieDetail', { movie, recommendations });
  } else {
    res.status(404).send('Random movie not found');
  }
});

// Route for upcoming movies
router.get('/upcomingMovies', (req, res) => {
  const upcomingMovies = Movies.filter(movie => movie.releaseYear > 2024); // Update year as needed
  res.render('upcomingMovies', { movies: upcomingMovies });
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/randomMovie', (req, res) => {
  // Select a random movie
  const randomIndex = Math.floor(Math.random() * Movies.length);
  const randomMovie = Movies[randomIndex];

  // Redirect to the movie detail page
  res.redirect(`/movie/${randomMovie.id}`);
});

// Brings 9 random movies to the index (home) page on every refresh 
app.get('/', (request, response) => {
  const random9Movies = randomNumOfMovies(9);
  response.render('index', { random9Movies });
});

app.get('/movies/genre/:genre', (req, res) => {
    const genre = req.params.genre;
    const moviesByGenre = getMoviesByGenre(genre);
    res.render('moviesByGenre', { movies: moviesByGenre });
});


// app.get('/movie/:id', (request, response) => {
//   //For use with links like: /movie/1
//   const movieId = request.params.id;
// });

//Add remaining routes here
app.use('/', router);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
