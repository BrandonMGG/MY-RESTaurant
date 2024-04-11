from flask import Flask, request, jsonify
from google.cloud import language_v1
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    client = language_v1.LanguageServiceClient()
    text = request.json.get('text', '')

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    document = language_v1.Document(content=text, type_=language_v1.Document.Type.PLAIN_TEXT)
    sentiment = client.analyze_sentiment(request={'document': document}).document_sentiment
    message = "" # variable para cargar el mensaje respuesta del sentimiento relacionado al feedback
    
    if(sentiment.score <= -0.6): # El texto tiene un sentimiento muy negativo
        message = "Lamentamos profundamente que tu experiencia no haya estado a la altura de tus expectativas. Nos tomamos muy en serio tus comentarios y nos conprometemos a ofrecer un mejor servicio la próxima vez. 😢" ## expresar sentimiento de tristeza por recibir este feedback
    elif(sentiment.score <= -0.2): # El texto tiene un sentimiento ligeramente negativo
        message = "Gracias por compartir tu opinión con nosotros. Parece que hubo aspectos de tu experiencia que no fueron completamente de tu agrado. Estamos comprometidos a mejorar y valoraríamos cualquier sugerencia adicional que pudieras tener. 😔" ## expresar sentimiento de tristeza por el mal feedback
    elif(sentiment.score <= 0.2): # El texto es emocionalmente neutral.
        message = "Gracias por tomarte el tiempo de dejarnos tu opinión. Si hay algo específico que crees que podríamos hacer mejor, nos encantaría escuchar tus sugerencias. 👍"
    elif(sentiment.score <= 0.6): # El texto tiene un sentimiento ligeramente positivo.
        message = "¡Nos alegra saber que tu experiencia fue en general positiva! Esperamos mejorar aún más nuestros servicios para tu póxima visita. 🙂"
    elif(sentiment.score <= 1): # El texto tiene un sentimiento muy positivo.
        message = "¡Estamos encantados de escuchar que disfrutaste tu experiencia con nosotros! Agradecemos mucho tus comentarios positivos. Si tienes amigos o familiares que disfrutarían de una experiencia similar, agradeceríamos tu recomendación. ¡Te esperamos pronto! 😄"
    
    print(sentiment.score)

    response = {
        'score': sentiment.score,
        'magnitude': sentiment.magnitude,
        'mensaje': message
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)


'''
Ejemplos de Interpretación
score = -0.8: El texto tiene un sentimiento muy negativo.
score = -0.3: El texto tiene un sentimiento ligeramente negativo.
score = 0: El texto es emocionalmente neutral.
score = 0.3: El texto tiene un sentimiento ligeramente positivo.
score = 0.8: El texto tiene un sentimiento muy positivo.


Dirección: http://localhost:5000/analyze
'''