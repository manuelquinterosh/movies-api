const sinon = require('sinon'); //Les inyecta unas propiedades para determinar si fueron llamados o no

const { moviesMock, filteredMoviesMock } = require("./movies"); //Para simular que se filtro

const getAllStub = sinon.stub(); 

getAllStub.withArgs('movies').resolves(moviesMock);

const tagQuery = { tags: {$in: ['Drama']}};

getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama'));

const createStub = sinon.stub().resolves(moviesMock[0].id);

class MongoLibMock {
    getAll(collection, query) {
        return getAllStub(collection, query);
    }

    create(collection, data) {
        return createStub(collection, data);
    }
}

module.exports = {
    getAllStub,
    createStub,
    MongoLibMock
};