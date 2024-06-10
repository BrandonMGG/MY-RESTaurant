
from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# Ruta para agregar horas al horario
@app.route('/addReservation', methods=['POST','OPTIONS'])
def agregar_reserva():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    try:
        if request.is_json:
            data = request.get_json()
            print(f"Request JSON: {data}")
            # abre el archivo JSON
            with open('reservacionesDB.json') as f:
                reservaciones = json.load(f)
            # leer lo que viene en el request
            fecha = data.get('fecha')
            hora = data.get('hora')
            mesa = data.get('mesa')
            personas = data.get('personas')
            cliente = data.get('cliente')
            seleccionado = "false"
            restaurant = data.get('local')
            # calcular el id (este es el que sigue)
            ident = reservaciones["idx"]
            ident = str(ident)
            # updeate id
            reservaciones["idx"] = ident+1
            
            datos = {
                    "id": ident,
                    "cliente": cliente,
                    "fecha" : fecha,
                    "hora": hora,
                    "mesa": mesa,
                    "personas": personas,
                    "seleccionado": False,
                    "local" : restaurant}
            
            # verificar que la fecha esta en la base de datos
            if fecha in reservaciones["reservaciones"]:
                reservaciones["reservaciones"][fecha][ident] = datos
            else: # en caso de que no este la fecha, agregarla
                reservaciones["reservaciones"][fecha] = {"disponibles": []}
                reservaciones["reservaciones"][fecha][ident] = datos
            
            
            with open('reservacionesDB.json', 'w') as archivo:
                json.dump(reservaciones, archivo, indent=4)
            
            return jsonify("Datos actualizados con exito!")
        else:
            return jsonify({"error": "Invalid content type, expected application/json"}), 415
    except FileNotFoundError:
        return jsonify("El archivo de reservaciones no se ha encontrado.")



if __name__ == '__main__':
    app.run(debug=True)