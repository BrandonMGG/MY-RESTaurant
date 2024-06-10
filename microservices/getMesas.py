
from flask import Flask, jsonify
import json

app = Flask(__name__)

app = Flask(__name__)

# Ruta para agregar horas al horario
@app.route('/getMesas', methods=['GET'])
def get_mesas():
    try:
        # abre el archivo JSON
        with open('reservacionesDB.json') as f:
            reservaciones = json.load(f)
        response = jsonify({"mesas":reservaciones["mesas"]})
        # Agregar encabezados CORS
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response
    except FileNotFoundError:
        
        response = jsonify({"respuesta":"El archivo de reservaciones no se ha encontrado."}), 404
        # Agregar encabezados CORS
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

if __name__ == '__main__':
    app.run(debug=True)
