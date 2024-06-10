
from flask import Flask, jsonify
import json

app = Flask(__name__)


# Ruta para agregar horas al horario
@app.route('/getLocal', methods=['GET'])
def getLocal():
    try:
        # abre el archivo JSON
        with open('reservacionesDB.json') as f:
            reservaciones = json.load(f)
        
        return jsonify({"localidades" : reservaciones["localidades"]}), 200
    
    except FileNotFoundError:
        return jsonify({"respuesta":"El archivo de reservaciones no se ha encontrado."}), 404
    

if __name__ == '__main__':
    app.run(debug=True)