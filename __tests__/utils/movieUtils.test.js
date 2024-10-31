const { getMoviesByGenre, getTopRatedMovies, getMovieDetailsById, formatMovieData, getRandomGenre, generateMovieReport } = require("../../utils/movieUtils");

describe('Movie Utility Functions', () => {
    describe('getMoviesByGenre', () => {
        it('should return x movies from the specified genre', () => {
            const genre = "Action"; // Replace with a genre from your Genres object
            const x = 3;
            const result = getMoviesByGenre(genre, x);
            expect(result.length).toBe(x);
            result.forEach(movie => {
                expect(movie.genre).toBe(genre);
            });
        });

        it('should return an appropriate response if no movies exist for the genre', () => {
            const genre = "NonExistentGenre"; // Assuming this genre doesn't exist
            const x = 3;
            const result = getMoviesByGenre(genre, x);
            expect(result).toEqual([]); // Assuming function returns an empty array
        });
    });

    describe('getTopRatedMovies', () => {
        it('should return the correct number of movies ordered by rating', () => {
            const x = 5;
            const result = getTopRatedMovies(x);
            expect(result.length).toBe(x);
            const sortedByRating = [...result].sort((a, b) => b.rating - a.rating);
            expect(result).toEqual(sortedByRating); // Check if the result is sorted
        });
    });

    describe('getMovieDetailsById', () => {
        it('should return a valid movie for a valid ID', () => {
            const validId = 1; // Replace with a valid ID from your Movies data
            const result = getMovieDetailsById(validId);
            expect(result).toEqual(expect.objectContaining({ id: validId })); // Check if it contains the ID
        });
    
        it('should return an appropriate response for an invalid ID', () => {
            const invalidId = 999; // Assuming this ID does not exist
            const result = getMovieDetailsById(invalidId);
            expect(result).toBeUndefined(); // Adjust this based on how your function handles invalid IDs
        });
    });
    describe('selectRandomMovieId', () => {

    });
});


//getRandomMoviesByGenre