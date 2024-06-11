import sys
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Configuración de las URLs de los microservicios
microservices = {
    'addHours': 'http://localhost:5001',
    'addRes': 'http://localhost:5002',
    'analyze': 'http://localhost:5003',
    'delRes': 'http://localhost:5005',
    'getAllRes': 'http://localhost:5006',
    'getHours': 'http://localhost:5007',
    'getLocal': 'http://localhost:5008',
    'getMesas': 'http://localhost:5009',
    'getPlatos': 'http://localhost:5010',
    'getRecommendation': 'http://localhost:5011',
    'getResCliente': 'http://localhost:5012',
    'sugHora': 'http://localhost:5013',
    'updateRes': 'http://localhost:5014',
}

# /<service>  ---> nombre del servicio que se quiere llamar (debe calzar con los de la lista 'microservicios')
# /<path:path> ---> el path de cada microservicio
@app.route('/<service>/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])
def gateway(service, path):
    if service not in microservices:
        return jsonify({'error': 'Service not found'}), 404
    
    url = f"{microservices[service]}/{path}"
    method = request.method

    # Reenviar la solicitud al microservicio correspondiente
    if method == 'GET':
        resp = requests.get(url, params=request.args)
    elif method == 'POST':
        resp = requests.post(url, json=request.json)
    elif method == 'PUT':
        resp = requests.put(url, json=request.json)
    elif method == 'DELETE':
        resp = requests.delete(url)
    elif method == 'DELETE':
        resp = requests.delete(url)
    else:
        return jsonify({'error': 'Method not supported'}), 405

    # Devolver la respuesta del microservicio
    return jsonify(resp.json()), resp.status_code

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5000
    app.run(port=port)
