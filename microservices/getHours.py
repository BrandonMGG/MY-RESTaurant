
from flask import Flask, jsonify, request
import json

app = Flask(__name__)


# Ruta para agregar horas al horario
@app.route('/getHours', methods=['GET'])
def getHours():
    try:
        # abre el archivo JSON
        with open('reservacionesDB.json') as f:
            reservaciones = json.load(f)
        # leer lo que viene en el request
        fecha = request.json.get('fecha')

        # verificar que la fecha esta en la base de datos
        if fecha in reservaciones["reservaciones"]:      
            response = jsonify({"horas" : reservaciones["reservaciones"][fecha]["disponibles"]}), 200
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
            return response
        else: # en caso de que no este la fecha, agregarla
            return jsonify({"horas" : []}), 200
    except FileNotFoundError:
        response = jsonify({"respuesta":"El archivo de reservaciones no se ha encontrado."}), 404
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response
    

if __name__ == '__main__':
    app.run(debug=True)