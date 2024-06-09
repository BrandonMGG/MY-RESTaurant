import datetime
from flask import Flask, jsonify, request
from datetime import datetime
import json
import re
import random

app = Flask(__name__)


# Ruta para obtener el horario
@app.route('/getSchedule', methods=['GET'])
def get_horas():
    try:
        # abre el archivo JSON
        with open('reservacionesDB.json') as f:
            reservaciones = json.load(f)
        return jsonify({"horas":reservaciones["horario"]})
    except FileNotFoundError:
        return jsonify({"respuesta":"El archivo de reservaciones no se ha encontrado."}), 404
    
    
if __name__ == '__main__':
    app.run(debug=True)