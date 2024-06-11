import datetime
import sys
from flask import Flask, jsonify, request
import json
import re
import random

app = Flask(__name__)


# Ruta para obtener los espacios disponibles para reservar
@app.route('/sugHora', methods=['POST'])
def obtener_disponibles():
    try:
        # abre el archivo JSON
        with open('reservacionesDB.json') as f:
            datos_reservas = json.load(f)
        
        #obtener la lista de horarios disponibles para la fecha indicada
        fecha = request.json.get('fecha') # obtener la fecha dada por el usuario
        
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
                    # si la fecha esta en reservacion devuelva las horas disponibles 
                    if (fecha in datos_reservas["reservaciones"]):
                        horas_disponibles = datos_reservas["reservaciones"][fecha]['disponibles']
                    # else > devolver horario general
                    else:
                        horas_disponibles = datos_reservas["horario"]
                    # enviar la sugerencia
                    if len(horas_disponibles) > 0:
                        return jsonify({'mensaje': "Se recomienda este dia entre semana, preferiblemente la primera hora de la lista para hacer la reservación", "fecha":fecha, 'horas_disponibles': horas_disponibles}), 200
                return jsonify({'mensaje': "Lo sentimos, no hay espacio disponible para reservación durante los días entre semana", "fecha":0, 'horas_disponibles': []}), 200
            elif finde:  # si el usuario quiere una recomendacion para el fin de semana
                for fecha in datos_reservas["finde"]:
                    # obtener la longitud de la lista finde y restarle 1
                    longitudFinde = len(datos_reservas["finde"])
                    longitudFinde = longitudFinde - 1
                    # obtener una fecha aleatoria de la lista finde
                    fecha_aleatoriaIdx = random.randint(0, longitudFinde)
                    fecha = datos_reservas["finde"][fecha_aleatoriaIdx]
                    # si la fecha esta en reservacion devuelva las horas disponibles 
                    if (fecha in datos_reservas["reservaciones"]):
                        horas_disponibles = datos_reservas["reservaciones"][fecha]['disponibles']
                    # else > devolver horario general
                    else:
                        horas_disponibles = datos_reservas["horario"]
                    # enviar la sugerencia
                    if len(horas_disponibles) > 0:
                        return jsonify({'mensaje': "Se recomienda este dia el fin de semana, preferiblemente la primera hora de la lista para hacer la reservación", "fecha":fecha, 'horas_disponibles': horas_disponibles}), 200
                return jsonify({'mensaje': "Lo sentimos, no hay espacio disponible para reservación los fines de semana", "fecha":0, 'horas_disponibles': []}), 200
            # si el mensaje no tiene "entre semana" o "fin de semana"
            else:
                return jsonify({'mensaje': 'Lo siento, no entendí tu petición. Por favor vuelve a redactar tu petición o a elegir una fecha.', "fecha":0, 'horas_disponibles': []}), 200

        elif fecha != "": # si se especifica una fecha
            if(get_current_date() > fecha):
                return jsonify({'mensaje': 'La fecha introducida no son válida'}), 200
            # Verificar si la fecha está en la base de datos
            if (fecha not in datos_reservas["reservaciones"]):
                horas_disponibles = datos_reservas["horario"]
                return jsonify({'mensaje': "Se recomienda la primera hora de la lista para hacer la reservación","fecha":fecha, 'horas_disponibles': horas_disponibles}), 200

            # Obtener horas disponibles para la fecha especificada
            horas_disponibles = datos_reservas["reservaciones"][fecha]['disponibles']

            # Verificar si hay disponibilidad
            if len(horas_disponibles) > 0:
                return jsonify({'mensaje': "Se recomienda la primera hora de la lista para hacer la reservación","fecha":fecha, 'horas_disponibles': horas_disponibles}), 200
            else:
                return jsonify({'mensaje': 'No hay horas disponibles para esta fecha o se refiere a un día que no abrimos. Por favor elige otra fecha.'}), 200
        
        else: # retornar bad request
            return jsonify({'mensaje': 'Los datos introducidos no son válidos'}), 200
        
    except FileNotFoundError:
        return "El archivo de reservaciones no se ha encontrado.", 404


# funcion para verificar la fecha actual
def get_current_date():
  """Returns the current date in YYYY-MM-DD format."""
  now = datetime.datetime.now()
  return now.strftime('%Y-%m-%d')

# Funcion para detectar palabras en el texto del usuario
def detectar_semana(texto):
  # Definir las expresiones regulares para detectar "entre semana" y "fin de semana"
  patron_entre_semana = re.compile(r'\bentre\s+semana\b', re.IGNORECASE)
  patronLun = re.compile(r'\bluenes\b', re.IGNORECASE)
  patronMar = re.compile(r'\bmartes\b', re.IGNORECASE)
  patronMie = re.compile(r'\bmiercoles\b', re.IGNORECASE)
  patronjue = re.compile(r'\bjueves\b', re.IGNORECASE)
  patronVie = re.compile(r'\bviernes\b', re.IGNORECASE)
  # Buscar coincidencias en el texto
  coincidencias_entre_semana = patron_entre_semana.search(texto)
  
  # Devolver los resultados
  if coincidencias_entre_semana or patronLun or patronMar or patronMie or patronjue or patronVie:
    print("Se encontró 'entre semana' en el texto.")
    return True
  else:
    print("No se encontró 'fin de semana' en el texto.")
    return False
    
# Funcion para detectar palabras en el texto del usuario
def detectar_finde(texto):
  # Definir las expresiones regulares para detectar "entre semana" y "fin de semana"
  patron_fin_de_semana = re.compile(r'\bfin\s+de\s+semana\b', re.IGNORECASE)
  patronDom = re.compile(r'\bsabado\b', re.IGNORECASE)
  patronSab = re.compile(r'\bdomingo\b', re.IGNORECASE)
  
  # Buscar coincidencias en el texto
  coincidencias_fin_de_semana = patron_fin_de_semana.search(texto)
  
  # Devolver los resultados
  if coincidencias_fin_de_semana or patronDom or patronSab:
    print("Se encontró 'fin de semana' en el texto.")
    return True
  else:
    print("No se encontró 'fin de semana' en el texto.")
    return False

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5000
    app.run(port=port)
