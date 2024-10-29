const express = require('express');
const path = require('path');
const { getTopRatedMovies, getMoviesByGenre, getMovieDetailsById, selectRandomMovieId, randomNumOfMovies } = require('./utils/movieUtils');
const { Movies, Genres } = require('./utils/data');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/', (request, response) => {
    const random9Movies = randomNumOfMovies(9);
    response.render('index', { random9Movies });
});

app.get('/movie/:id', (request, response) => {
    //For use with links like: /movie/1
    const movieId = request.params.id;
});

//Add remaining routes here

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
