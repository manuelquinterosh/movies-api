//const { moviesMock } = require('../utils/mocks/movies');
const MongoLib = require('../lib/mongo');


class MoviesService {
    constructor() {
        this.collection = 'movies';
        this.mongoDB = new MongoLib();
    }
    async getMovies({ tags } = {}) { //devuelve todas las peliculas
        const query = tags && { tags: { $in: tags }};
        const movies = await this.mongoDB.getAll(this.collection, query);
        return movies || [];
    }

    async getMovie({ movieId }) { //devuelve una sola pelicula
        const movie = await this.mongoDB.get(this.collection, movieId);
        return movie || {};
    }

    async createMovie({ movie }) {
        const createMovieId = await this.mongoDB.create(this.collection, movie);
        return createMovieId || [];
    }

    async updateMovie({ movieId, movie} = {}) {
        const updateMovieId = await this.mongoDB.update(this.collection, movieId, movie);
        return updateMovieId || [];
    }

    /**async patchMovie({ movieId }) {
        const patchMovieId = await Promise.resolve(moviesMock[0].id);
        return patchMovieId;
    }**/

    async deleteMovie({ movieId }) {
        const deleteMovieId = await this.mongoDB.delete(this.collection, movieId);
        return deleteMovieId || [];
    }
}

module.exports = MoviesService;
