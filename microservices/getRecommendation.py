from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# Ruta para obtener recomendación
@app.route('/getRecommendation', methods=['POST', 'OPTIONS'])
def buscar_recomendacion():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200

    try:
        if request.is_json:
            req = request.get_json()

            # Cargar el archivo JSON
            with open('foodDB.json', 'r') as file:
                data = json.load(file)

            food = req.get('food', "")
            dessert = req.get('dessert', "")
            drink = req.get('drink', "")

            # Filtrar recomendaciones basadas en los parámetros proporcionados
            recomendaciones = data["RECOMMENDATIONS"]
            for recomendacion in recomendaciones:
                if (food == "" or food == recomendacion["food"]) and \
                   (dessert == "" or dessert == recomendacion["dessert"]) and \
                   (drink == "" or drink == recomendacion["drink"]):
                    return jsonify(recomendacion), 200

            return jsonify({"mensaje": "No se encontró ninguna recomendación que coincida con los parámetros proporcionados."}), 200

        else:
            return jsonify({"mensaje": "La solicitud no contiene un JSON válido."}), 400

    except FileNotFoundError:
        return jsonify({"mensaje": "El archivo de base de datos no se ha encontrado."}), 500

if __name__ == '__main__':
    app.run(debug=True)
