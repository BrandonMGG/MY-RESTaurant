from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# Ruta para agregar horas al horario
@app.route('/getHours', methods=['POST', 'OPTIONS'])
def getHours():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200

    try:
        # Log the request content type
        print(f"Content-Type: {request.content_type}")
        
        if request.is_json:
            data = request.get_json()
            print(f"Request JSON: {data}")
            
            # abre el archivo JSON
            with open('reservacionesDB.json') as f:
                reservaciones = json.load(f)
                
            # leer lo que viene en el request
            fecha = data.get('fecha')

            # verificar que la fecha esta en la base de datos
            if fecha in reservaciones["reservaciones"]:
                return jsonify({"horas": reservaciones["reservaciones"][fecha]["disponibles"]}), 200
            else:
                return jsonify({"horas": []}), 200
        else:
            return jsonify({"error": "Invalid content type, expected application/json"}), 415
    except FileNotFoundError:
        return jsonify({"respuesta": "El archivo de reservaciones no se ha encontrado."}), 404

if __name__ == '__main__':
    app.run(debug=True)