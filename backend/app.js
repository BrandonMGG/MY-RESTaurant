import fs from 'fs'
import axios from 'axios'
import express from 'express'
import cors from 'cors'
const app = express();


// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());
app.use(cors())

/*funcion backend esta funcion : Esta función será el núcleo de la lógica de la aplicación.
Deberá manejar las solicitudes del frontend, procesarlas y proporcionar respuestas
adecuadas. Además, integrará la función de recomendación de comida y sugerencia de
hora. esta funcion es accedida por medio de gets desde el fronted o cualquier cliente
 */
export const backend = async (req, res) => {

    //se setean los parametros para posibles problemas de cors
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');


    const database = JSON.parse(fs.readFileSync('./database.json'))
    // Procesar la solicitud del frontend
    //se procesa el get a la direccion origen
    if (req.method === 'GET' && req.url === "/") {
        res.status(200).json(database);

    }
    //se procesa el get a la direccion reservacion 
    if (req.method === 'GET' && req.url.startsWith("/reservacion")) {
        console.log("gettte")
        console.log("query", req.query)
        const url = 'https://us-central1-proyect2soa.cloudfunctions.net/sugerencia-hora'
        const reservacion = async () => {
            try {
                //se realiza la peticion a la funcion de sugerencia de hora
                const response = await axios.post(url, {
                    mensaje: req.query.mensaje,
                    fecha: req.query.fecha
                })
                res.send(response.data)
            }
            catch (error) {
                res.status(error.response.status).json(error.response.data)
            }
        }
        reservacion()
    }
    // se procesa la solicitud de get con la ruta /feadback
    if (req.url.startsWith("/feedback") && req.method === "GET") {

        //se maneja los posibles errores en caso de llegue el parametro de mensaje vacio 
        if (req.query.mensaje === "") {
            const data = { mensaje: "Ingresa tu opinion para poder analizar tu experiencia en nuestro restaurante" }
            res.status(200).json(data)

        }
        else {
            
            const url = 'https://us-central1-proyect2soa.cloudfunctions.net/analyze-sentiment'
            const feedback = async () => {
                try {
                    console.log(req.body)
                    //se realiza un post a la funcion de analisis de sentimiento para extraer los datos
                    const response = await axios.post(url, {
                        text: req.query.mensaje
                    })
                    // se retornan los datos 
                    res.send(response.data)
                }
                catch (error) {
                    console.error(error)
                    res.status(error.response.status).json(error.response.data)
                }


            }
            feedback()
        }
    }
    // se procesa la solicitud get a la ruta menu esta devuelve las recomendaciones para el usuario
    if (req.url.startsWith("/menu") && req.method==="GET" ) {
        //
        const url = 'https://us-south1-proyect2soa.cloudfunctions.net/food-recommendation'
        const menu = async () => {
            try {
               // se realiza una peticion post a la funcion recomendacion de platos, postres, bebidas 

                const response = await axios.post(url, {
                    food: req.query.platoPrincipal,
                    drink: req.query.bebidas,
                    dessert: req.query.postres

                })
                // se estructura la respuesta para mandarsela al usuario
                const data={
                    platoPrincipal:response.data.food,
                    bebidas:response.data.drink,
                    postres:response.data.dessert
                }
                res.send(data)


            }
            //captura de error
            catch (error) {

                const errorO = { error: error.response.data }
                res.status(200).json(errorO)
            }


        }
        menu()
    }


}                  