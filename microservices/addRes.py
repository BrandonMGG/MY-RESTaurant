
from flask import Flask, jsonify, request
import json

app = Flask(__name__)

# Ruta para agregar horas al horario
@app.route('/addReservation', methods=['POST'])
def agregar_reserva():
    try:
        # abre el archivo JSON
        with open('reservacionesDB.json') as f:
            reservaciones = json.load(f)
        # leer lo que viene en el request
        fecha = request.json.get('fecha')
        hora = request.json.get('hora')
        mesa = request.json.get('mesa')
        personas = request.json.get('personas')
        cliente = request.json.get('cliente')
        seleccionado = "false"
        restaurant = request.json.get('local')
        # calcular el id (este es el que sigue)
        ident = reservaciones["idx"]
        # updeate id
        reservaciones["idx"] = ident+1
        
        datos = {"cliente": cliente,
                "hora": hora,
                "mesa": mesa,
                "personas": personas,
                "seleccionado": seleccionado,
                "local" : restaurant}
        
        # verificar que la fecha esta en la base de datos
        if fecha in reservaciones["reservaciones"]:
            reservaciones["reservaciones"][fecha][ident] = datos
        else: # en caso de que no este la fecha, agregarla
            reservaciones["reservaciones"][fecha] = {"disponibles": []}
            reservaciones["reservaciones"][fecha][ident] = datos
        
        
        with open('reservacionesDB.json', 'w') as archivo:
            json.dump(reservaciones, archivo, indent=4)
        # devuelve la lista de reservas realizadas para cada fecha
        return  jsonify("Datos actualizados con exito!") ### DEVOLVER LISTA SIN LAS DISPONIBLES ---------------------------------------
    except FileNotFoundError:
        return jsonify({"respuesta":"El archivo de reservaciones no se ha encontrado."}), 404



if __name__ == '__main__':
    app.run(debug=True)