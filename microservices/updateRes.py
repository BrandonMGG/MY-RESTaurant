from flask import Flask, jsonify, request
import json

app = Flask(__name__)



# Ruta para actualizar reservaciones
@app.route('/update', methods=['PUT'])
def actualizar_reservaciones():
    try:
        # abre el archivo JSON
        with open('reservacionesDB.json') as f:
            reservaciones = json.load(f)
            
        for res in request.json:
            #obtener el ID
            idRes = res.get('id')
            idRes = str(idRes)
            fecha = res.get('fecha')
            hora = res.get('hora')
            personas = res.get('personas')
            mesa = res.get('mesa')
            sel = 'seleccionado'
            local = res.get('local')
            
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
        
        response = jsonify("Los datos de la reservacion han sido actualizados.")
        # Agregar encabezados CORS
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response
        
    except FileNotFoundError:
        response = jsonify("El archivo de reservaciones no se ha encontrado.")
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response



if __name__ == '__main__':
    app.run(debug=True)
