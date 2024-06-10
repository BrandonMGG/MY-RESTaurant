from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# Ruta para obtener recomendación
@app.route('/getPlatos', methods=['GET', 'OPTIONS'])
def getPlato():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200

    try:
        if request.is_json:
            # Cargar el archivo JSON
            with open('db.json', 'r') as file:
                data = json.load(file)

            return jsonify(data), 200

        else:
            return jsonify({"mensaje": "La solicitud no contiene un JSON válido."}), 400

    except FileNotFoundError:
        return jsonify({"mensaje": "El archivo de base de datos no se ha encontrado."}), 500

if __name__ == '__main__':
    app.run(debug=True)