import sys
from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# Ruta para eliminar reservaciones
@app.route('/delete', methods=['DELETE', 'OPTIONS'])
def eliminar_reservaciones():
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
            # obtener el ID
            idRes = data.get('id')
            idRes = str(idRes)
            # recorrer cada fecha buscando el id y borra la reservacion
            for date in reservaciones["reservaciones"]:
                if idRes in reservaciones["reservaciones"][date]:
                    # eliminar la reservacion
                    del reservaciones["reservaciones"][date][idRes]
                    break
            # Escribir los datos modificados de nuevo en el archivo
            with open('reservacionesDB.json', 'w') as archivo:
                json.dump(reservaciones, archivo, indent=4)
            return jsonify("Los datos de la reservacion han sido eliminados."), 200
        else:
            return jsonify({"error": "Invalid content type, expected application/json"}), 415
    except FileNotFoundError:
        return jsonify({"respuesta":"El archivo de reservaciones no se ha encontrado."}), 404

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5000
    app.run(port=port)