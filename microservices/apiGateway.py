from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Configuración de las URLs de los microservicios
microservices = {
    'service1': 'http://localhost:5001',
    'service2': 'http://localhost:5002',
    'service3': 'http://localhost:5003'
}

# /<service>  ---> nombre del servicio que se quiere llamar (debe calzar con los de la lista 'microservicios')
# /<path:path> ---> el path de cada microservicio
@app.route('/<service>/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE'])
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
    else:
        return jsonify({'error': 'Method not supported'}), 405

    # Devolver la respuesta del microservicio
    return jsonify(resp.json()), resp.status_code

if __name__ == '__main__':
    app.run(port=5000)
