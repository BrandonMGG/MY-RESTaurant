import datetime
from flask import Flask, jsonify, request
import json
import re
import random

app = Flask(__name__)

# Ruta para obtener las reservaciones de un cliente en especifico
# AGREGAR NUMERO DE RESERVA Y FECHA
@app.route('/getResCliente', methods=['GET'])
def obtener_resCliente():
    try:
        # abre el archivo JSON
        with open('reservacionesDB.json') as f:
            reservaciones = json.load(f)
        # obtener el id del cliente
        cliente = request.json.get('cliente')
        # lista de reservaciones del cliente
        if cliente is None:
            return jsonify("Debe proporcionar el ID del cliente en los parámetros de la URL."), 400

        # Lista de reservaciones del cliente
        listaRes = []

        # Filtrar cada espacio para cada fecha donde se tenga el atributo disponibles
        datos = reservaciones["reservaciones"]
        for date in datos:
            for res in datos[date]:
                if res != "disponibles":
                    if datos[date][res]["cliente"] == cliente:
                        # Agregar a la lista y seguir buscando reservaciones a nombre del cliente
                        datos[date][res]["fecha"] = date
                        datos[date][res]["numeroReserva"] = int(res)
                        listaRes.append(datos[date][res])

        # Si hay reservaciones para el cliente
        if len(listaRes) > 0:
            # Crear respuesta JSON
            response = jsonify({"reservas": listaRes})
            # Agregar encabezados CORS
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
            return response
        else:
            # Devuelve la lista de reservas realizadas para cada fecha
            response = jsonify("El usuario solicitado no cuenta con reservaciones.")
            # Agregar encabezados CORS
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
            return response
    except FileNotFoundError:
        # Enviar respuesta con el código de estado 404 si el archivo no se encuentra
        response = jsonify({"respuesta": "El archivo de reservaciones no se ha encontrado."})
        response.status_code = 404
        return response
    
if __name__ == '__main__':
    app.run(debug=True)
