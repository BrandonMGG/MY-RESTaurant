import datetime
from flask import Flask, jsonify, request
from datetime import datetime
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


# Ruta para agregar horas al horario
@app.route('/addHours', methods=['POST', 'OPTIONS'])
def agregar_horas():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    
    try:
        print(f"Content-Type: {request.content_type}")
        
        if request.is_json:
            data = request.get_json()
            print(f"Request JSON: {data}")
            # abre el archivo JSON
            with open('reservacionesDB.json') as f:
                reservaciones = json.load(f)
            # leer lo que viene en el request
            fecha = data.get('fecha')
            hora = data.get('hora')

            # verificar que la fecha esta en la base de datos
            if fecha in reservaciones["reservaciones"]:
                if (hora in reservaciones["reservaciones"][fecha]["disponibles"]):
                    return jsonify({"respuesta":"La hora ya ha sido agregada previamente."}), 200
                reservaciones["reservaciones"][fecha]["disponibles"].append(hora)
                horario = reservaciones["reservaciones"][fecha]["disponibles"]
                horario.sort(key=lambda x: datetime.strptime(x, "%I:%M %p"))
         
            else: # en caso de que no este la fecha, agregarla
                reservaciones["reservaciones"][fecha] = {"disponibles": []}
                reservaciones["reservaciones"][fecha]["disponibles"].append(hora)
                horario = reservaciones["reservaciones"][fecha]["disponibles"]
                horario.sort(key=lambda x: datetime.strptime(x, "%I:%M %p"))

            
            
            with open('reservacionesDB.json', 'w') as archivo:
                json.dump(reservaciones, archivo, indent=4)
            # devuelve la lista de reservas realizadas para cada fecha
            return  jsonify({"respuesta":"Datos actualizados con exito! para la fecha indicada"}), 200 ### DEVOLVER LISTA SIN LAS DISPONIBLES ---------------------------------------
        else:
            return jsonify({"error": "Invalid content type, expected application/json"}), 415
    except FileNotFoundError:
        return jsonify({"respuesta":"El archivo de reservaciones no se ha encontrado."}), 404
    

if __name__ == '__main__':
    app.run(debug=True)