
from flask import Flask, jsonify
import json
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

app = Flask(__name__)

# Ruta para agregar horas al horario
@app.route('/getMesas', methods=['GET'])
def get_mesas():
    try:
        # abre el archivo JSON
        with open('reservacionesDB.json') as f:
            reservaciones = json.load(f)
        return jsonify({"mesas":reservaciones["mesas"]})
    except FileNotFoundError:
        return jsonify({"respuesta":"El archivo de reservaciones no se ha encontrado."}), 404

if __name__ == '__main__':
    app.run(debug=True)
