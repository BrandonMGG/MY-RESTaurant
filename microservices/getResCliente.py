
from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# Ruta para obtener las reservaciones de un cliente en especifico
# AGREGAR NUMERO DE RESERVA Y FECHA
@app.route('/getResCliente', methods=['GET', 'OPTIONS'])
def obtener_resCliente():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    try:
        if request.is_json:
            data = request.get_json()
            # abre el archivo JSON
            with open('reservacionesDB.json') as f:
                reservaciones = json.load(f)
            # obtener el id del cliente
            cliente = data.get('cliente')
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
                return jsonify({"reservas": listaRes}), 200
            else:
                return jsonify("El usuario solicitado no cuenta con reservaciones."), 200
    except FileNotFoundError:
        # Enviar respuesta con el código de estado 404 si el archivo no se encuentra
        return jsonify({"respuesta": "El archivo de reservaciones no se ha encontrado."}), 404
    
if __name__ == '__main__':
    app.run(debug=True)
