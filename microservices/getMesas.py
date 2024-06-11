import sys
from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017/')  # Conexión a la instancia local de MongoDB
db = client['soaDB']  # Reemplaza 'tu_base_de_datos' por el nombre de tu base de datos
collection = db['dataBase']  # Reemplaza 'tu_coleccion' por el nombre de tu colección en MongoDB

@app.route('/getMesas', methods=['GET'])
def get_mesas():
    try:
        datos = list(collection.find({}, {'_id': 0}))  # Recuperar todas las reservaciones
        print(datos[0]["mesas"])
        response = jsonify({"mesas": datos[0]["mesas"]})
        # Agregar encabezados CORS
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response
    except Exception as e:
        response = jsonify({"respuesta": f"Error al obtener las reservaciones: {str(e)}"}), 500
        # Agregar encabezados CORS
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5000
    app.run(port=port)
