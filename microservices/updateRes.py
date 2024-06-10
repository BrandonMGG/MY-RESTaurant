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
                                                            "hora":hora,
                                                            "mesa": mesa,
                                                            "personas": personas,
                                                            "seleccionado": sel,
                                                            "local" : local}
        
        # Escribir los datos modificados de nuevo en el archivo
        with open('reservacionesDB.json', 'w') as archivo:
            json.dump(reservaciones, archivo, indent=4)
        
        return jsonify("Los datos de la reservacion han sido actualizados.")
        
    except FileNotFoundError:
        return "El archivo de reservaciones no se ha encontrado.", 404



if __name__ == '__main__':
    app.run(debug=True)
