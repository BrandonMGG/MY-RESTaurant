import random
import re
import json
from flask import Flask, request, jsonify

app = Flask(__name__)

# Cargar datos de reservas desde el archivo JSON
with open('reservaciones.json', 'r') as f:
    datos_reservas = json.load(f)

# Endpoint para la sugerencia de hora
@app.route('/sugerencia_hora', methods=['POST'])
def sugerencia_hora():
    # Obtener la fecha del cuerpo de la solicitud POST
    fecha = request.json.get('fecha')
    
    # obtener el mensaje del usuario
    usrMessage = request.json.get('mensaje')
    
    # verificar si el usuario quiere una recomendacion para el fin de semana o entre semana
    if (fecha == "") and (usrMessage != ""):
        semana = detectar_semana(usrMessage)
        finde = detectar_finde(usrMessage)
        
        print(semana)
        print(finde)
        if semana: # si el usuario quiere una recomendacion para dias entre semana
            
            
            for fecha in datos_reservas["semana"]:
                # obtener la longitud de la lista finde y restarle 1
                longitudSemana = len(datos_reservas["semana"])
                longitudSemana = longitudSemana - 1
                # obtener una fecha aleatoria de la lista finde
                fecha_aleatoriaIdx = random.randint(0, longitudSemana)
                fecha = datos_reservas["semana"][fecha_aleatoriaIdx]
                horas_disponibles = datos_reservas[fecha]['horas_disponibles']
                # enviar la sugerencia
                if len(horas_disponibles) > 0:
                    return jsonify({'mensaje': "Se recomienda la primera hora de la lista para hacer la reservación", "fecha":fecha, 'horas_disponibles': horas_disponibles}), 200
            return jsonify({'mensaje': "Lo sentimos, no hay espacio disponible para reservación durante los días entre semana", "fecha":0, 'horas_disponibles': []}), 200
        
        elif finde:  # si el usuario quiere una recomendacion para el fin de semana
            for fecha in datos_reservas["finde"]:
                # obtener la longitud de la lista finde y restarle 1
                longitudFinde = len(datos_reservas["finde"])
                longitudFinde = longitudFinde - 1
                # obtener una fecha aleatoria de la lista finde
                fecha_aleatoriaIdx = random.randint(0, longitudFinde)
                fecha = datos_reservas["finde"][fecha_aleatoriaIdx]
                horas_disponibles = datos_reservas[fecha]['horas_disponibles']
                # enviar la sugerencia
                if len(horas_disponibles) > 0:
                    return jsonify({'mensaje': "Se recomienda la primera hora de la lista para hacer la reservación", "fecha":fecha, 'horas_disponibles': horas_disponibles}), 200
            return jsonify({'mensaje': "Lo sentimos, no hay espacio disponible para reservación los fines de semana", "fecha":0, 'horas_disponibles': []}), 200
        # si el mensaje no tiene "entre semana" o "fin de semana"
        else:
            return jsonify({'mensaje': 'Lo siento, no entendí tu petición. Por favor vuelve a redactar tu petición o a elegir una fecha.', "fecha":0, 'horas_disponibles': []}), 400

    elif fecha != "": # si se especifica una fecha
        # Verificar si la fecha está en la base de datos
        if (fecha not in datos_reservas):
            return jsonify({'disponible': False, 'mensaje': 'Fecha no válida'}), 400

        # Obtener horas disponibles para la fecha especificada
        horas_disponibles = datos_reservas[fecha]['horas_disponibles']

        # Verificar si hay disponibilidad
        if len(horas_disponibles) > 0:
            return jsonify({'mensaje': "Se recomienda la primera hora de la lista para hacer la reservación","fecha":fecha, 'horas_disponibles': horas_disponibles}), 200
        else:
            return jsonify({'mensaje': 'No hay horas disponibles para esta fecha o se refiere a un día que no abrimos. Por favor elige otra fecha.'}), 200
    
    else: # retornar bad request
        return jsonify({'mensaje': 'Los datos introducidos no son válidos'}), 400
    
    

    
# Funcion para detectar palabras en el texto del usuario
def detectar_semana(texto):
    # Definir las expresiones regulares para detectar "entre semana" y "fin de semana"
    patron_entre_semana = re.compile(r'\bentre\s+semana\b', re.IGNORECASE)
    
    # Buscar coincidencias en el texto
    coincidencias_entre_semana = patron_entre_semana.search(texto)
    
    # Devolver los resultados
    if coincidencias_entre_semana:
        print("Se encontró 'entre semana' en el texto.")
        return True
    else:
        print("No se encontró 'fin de semana' en el texto.")
        return False
    
# Funcion para detectar palabras en el texto del usuario
def detectar_finde(texto):
    # Definir las expresiones regulares para detectar "entre semana" y "fin de semana"
    patron_fin_de_semana = re.compile(r'\bfin\s+de\s+semana\b', re.IGNORECASE)
    
    # Buscar coincidencias en el texto
    coincidencias_fin_de_semana = patron_fin_de_semana.search(texto)
    
    # Devolver los resultados
    if coincidencias_fin_de_semana:
        print("Se encontró 'fin de semana' en el texto.")
        return True
    else:
        print("No se encontró 'fin de semana' en el texto.")
        return False

# Ejemplo de uso
#texto_ejemplo = "El restaurante está abierto el fin de semana."
#detectar_cadenas(texto_ejemplo)


if __name__ == '__main__':
    app.run(debug=True)
