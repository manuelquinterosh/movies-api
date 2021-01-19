const express = require('express');
//const { moviesMock } = require('../utils/mocks/movies'); //Archivos de datos falsos
const MoviesService = require('../services/movies');

const {
   movieIdSchema,
   createMovieSchema,
   updateMovieSchema
} = require('../utils/schemas/movies');

const validationHandler = require('../utils/middleware/validationHandler');

const cacheResponse = require('../utils/cacheResponse');

const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time');

function moviesApi(app) { //Va recibir una aplicacion de express y nos permite ser dinamicos y tener control sobre que aplicacion va consumir nuestra ruta
    const router = express.Router(); 
    app.use("/api/movies", router); //le decimos a la aplicacion que vamos a pasar como parametro

    const moviesService = new MoviesService();

router.get("/", async function(req, res, next) { //Alimentamos el router con las otras rutas
    
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    
    const { tags } = req.query;
    
    try {
        //como este codigo es un array debemos envolverlo en una promesa para que podamos hacer uso de nuestro codigo asincrono con la palabra await
        const movies = await moviesService.getMovies({ tags });
      //  throw new Error('Error getting movies');

        res.status(200).json({ //El status es 200, porque va ser OK
            data: movies,
            message: 'movies listed'
        });
    } catch (err) {
       next(err);
    }
    });

    router.get("/:movieId", validationHandler({ movieId: movieIdSchema }, 'params'), async function(req, res, next) { //Alimentamos el router con las otras rutas
        
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);

        const { movieId } = req.params;
        try {
            //como este codigo es un array debemos envolverlo en una promesa para que podamos hacer uso de nuestro codigo asincrono con la palabra await
            const movies = await moviesService.getMovie({ movieId }) //devolvemos la primera pelicula
            res.status(200).json({ //El status es 200, porque va ser OK
                data: movies,
                message: 'movie retrieved'
            });
        } catch (err) {
           next(err);
        }
        });

        //Para crear
        router.post("/", validationHandler(createMovieSchema), async function(req, res, next) { //Alimentamos el router con las otras rutas
           const { body: movie } =req;
            try {
                //como este codigo es un array debemos envolverlo en una promesa para que podamos hacer uso de nuestro codigo asincrono con la palabra await
                const createdMovieId = await moviesService.createMovie({ movie });
                res.status(201).json({ //El status es 200, porque va ser OK
                    data: createdMovieId,
                    message: 'movie created'
                });
            } catch (err) {
               next(err);
            }
            });

            router.put("/:movieId",  validationHandler({ movieId: movieIdSchema}, 'params'), validationHandler(updateMovieSchema), async function(req, res, next) { //Alimentamos el router con las otras rutas
                const { body: movie } =req;
                const { movieId } = req.params;
                try {
                    //como este codigo es un array debemos envolverlo en una promesa para que podamos hacer uso de nuestro codigo asincrono con la palabra await
                    const updatedMovieId = await moviesService.updateMovie({ movieId, movie });
                    res.status(200).json({ //El status es 200, porque va ser OK
                        data: updatedMovieId,
                        message: 'movie updated'
                    });
                } catch (err) {
                   next(err);
                }
                });


              /**   router.patch("/:movieId", async function(req, res, next) { //Alimentamos el router con las otras rutas
                    const { body: movie } =req;
                    const { movieId } = req.params;
                    try {
                        //como este codigo es un array debemos envolverlo en una promesa para que podamos hacer uso de nuestro codigo asincrono con la palabra await
                        const patchMovieId = await moviesService.patchMovie({ movieId, movie });
                        res.status(200).json({ //El status es 200, porque va ser OK
                            data: patchMovieId,
                            message: 'movie patched'
                        });
                    } catch (err) {
                       next(err);
                    }
                    });
    **/

                router.delete("/:movieId",  validationHandler({ movieId: movieIdSchema}, 'params'), async function(req, res, next) { //Alimentamos el router con las otras rutas
                    const { movieId } = req.params;
                    try {
                        //como este codigo es un array debemos envolverlo en una promesa para que podamos hacer uso de nuestro codigo asincrono con la palabra await
                        const deletedMovieId = await moviesService.deleteMovie({ movieId });
                        res.status(200).json({ //El status es 200, porque va ser OK
                            data: deletedMovieId,
                            message: 'movie deleted'
                        });
                    } catch (err) {
                       next(err);
                    }
                    });
}

module.exports = moviesApi; //Exportamos la ruta