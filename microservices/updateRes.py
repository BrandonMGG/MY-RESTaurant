
from flask import Flask, jsonify, request
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Ruta para actualizar reservaciones
@app.route('/update', methods=['PUT', 'OPTIONS'])
def actualizar_reservaciones():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'OK'}), 200
    try:
        if request.is_json:
            data = request.get_json()
            print(f"Request JSON: {data}")
            
            with open('reservacionesDB.json') as f:
                reservaciones = json.load(f)
                

            #obtener el ID
            idRes = data.get('id')
            idRes = str(idRes)
            fecha = data.get('fecha')
            hora = data.get('hora')
            personas = data.get('personas')
            mesa = data.get('mesa')
            sel = 'seleccionado'
            local = data.get('local')
            
            # recorrer cada fecha buscando el id y borra la reservacion
            for date in reservaciones["reservaciones"]:
                for res in reservaciones["reservaciones"][date]:
                    if res == idRes:
                        # obtener el cliente 
                        cliente = reservaciones["reservaciones"][date][idRes]["cliente"]
                        # obtener la fecha para liberar en disponibles
                        del reservaciones["reservaciones"][date][idRes]
                        break
            # crear la nueva reservacion
            reservaciones["reservaciones"][fecha][idRes] = {"id": idRes,
                                                            "cliente":cliente,
                                                            "fecha" : fecha,
                                                            "hora":hora,
                                                            "mesa": mesa,
                                                            "personas": personas,
                                                            "seleccionado": sel,
                                                            "local" : local}
            
            # Escribir los datos modificados de nuevo en el archivo
            with open('reservacionesDB.json', 'w') as archivo:
                json.dump(reservaciones, archivo, indent=4)
            
            return jsonify("Los datos de la reservacion han sido actualizados."), 200
        
    except FileNotFoundError:
        return jsonify("El archivo de reservaciones no se ha encontrado.")



if __name__ == '__main__':
    app.run(debug=True)
