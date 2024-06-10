import json

def buscar_recomendacion(params):
    # Cargar el archivo JSON
    with open('foodDB.json', 'r') as file:
        data = json.load(file)
    
    # Filtrar recomendaciones basadas en los parámetros proporcionados
    recomendaciones = data["RECOMMENDATIONS"]
    for recomendacion in recomendaciones:
        if (params["food"] == "" or params["food"] == recomendacion["food"]) and \
           (params["dessert"] == "" or params["dessert"] == recomendacion["dessert"]) and \
           (params["drink"] == "" or params["drink"] == recomendacion["drink"]):
            return recomendacion
    
    return None

# Ejemplo de uso
parametros = {"food": "Deditos de pollo", "dessert": "", "drink": ""}
recomendacion = buscar_recomendacion(parametros)
if recomendacion:
    print("Recomendación encontrada:")
    print(recomendacion)
else:
    print("No se encontró ninguna recomendación que coincida con los parámetros proporcionados.")

