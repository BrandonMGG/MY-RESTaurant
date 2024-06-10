
from flask import Flask, jsonify, request
import json

app = Flask(__name__)

# Ruta para eliminar reservaciones
@app.route('/delete', methods=['DELETE'])
def eliminar_reservaciones():
    try:
        # abre el archivo JSON
        with open('reservacionesDB.json') as f:
            reservaciones = json.load(f)
        #obtener el ID
        idRes = request.json.get('id')
        idRes = str(idRes)
        # recorrer cada fecha buscando el id y borra la reservacion
        for date in reservaciones["reservaciones"]:
            for res in reservaciones["reservaciones"][date]:
                if res == idRes:
                    # obtener la fecha para liberar en disponibles
                    del reservaciones["reservaciones"][date][idRes]
                    break
        # Escribir los datos modificados de nuevo en el archivo
        with open('reservacionesDB.json', 'w') as archivo:
            json.dump(reservaciones, archivo, indent=4)
        return jsonify("Los datos de la reservacion han sido eliminados.")
    except FileNotFoundError:
        return jsonify({"respuesta":"El archivo de reservaciones no se ha encontrado."}), 404


if __name__ == '__main__':
    app.run(port=6000)