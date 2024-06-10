
from flask import Flask, jsonify, request
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Ruta para obtener las reservaciones
@app.route('/getAllRes', methods=['GET'])
def obtener_reservaciones():
    try:
        # abre el archivo JSON
        with open('reservacionesDB.json') as f:
            reservaciones = json.load(f)
        # filtrar cada espacio para cada fecha donde se tenga el atributo disponibles
        datos = reservaciones["reservaciones"]
        listaRes = []
        for date in datos:
            for res in datos[date]:
                if res != "disponibles":
                    listaRes.append(datos[date][res])
        if len(listaRes)>0:
            response = jsonify({"reservas": listaRes})
            # Agregar encabezados CORS
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
            return response
        else: 
            # Crear respuesta JSON
            response = jsonify("El usuario solicitado no cuenta con reservaciones.")
            # Agregar encabezados CORS
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
            return response
    except FileNotFoundError:
        # Enviar respuesta con el código de estado 404 si el archivo no se encuentra
        response = jsonify({"respuesta":"El archivo de reservaciones no se ha encontrado."})
        response.status_code = 404
        return response

if __name__ == '__main__':
    app.run(port=5000)
