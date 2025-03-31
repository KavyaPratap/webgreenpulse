import os
from flask import Flask, render_template, jsonify, request
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

app = Flask(__name__, static_folder='static', static_url_path='/static')

# Configure Gemini
genai.configure(api_key=os.getenv("API_KEY"))

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    
    allowed_questions = [
        "Greetings",
        "What is E-sahara?",
        "How does this platform help prevent loneliness?",
        "Is the platform free to use?",
        "Who can join this platform?",
        "How can I sign up?",
        "Is my personal information safe?",
        "Can family members sign up on behalf of elderly individuals?",
        "What kind of activities are available?",
        "How can I volunteer to help elderly individuals?",
        "What should I do if I or someone I know is feeling extremely lonely or depressed?"
    ]

    model = genai.GenerativeModel('gemini-2.0-flash')
    
    try:
        response = model.generate_content(
            f"As a senior care assistant, respond ONLY to these questions about E-Sahara and also answer greetings and give answers in user's question's language...: {', '.join(allowed_questions)}. "
            f"For greetings, respond briefly. For any other queries, say: 'I can only answer questions about E-Sahara's services. "
            f"Please ask one of the listed questions.' Current query: {user_message}"
        )
        return jsonify({'response': response.text})
    except Exception as e:
        print(f"AI Error: {str(e)}")
        return jsonify({'response': "Sorry, I'm having trouble responding right now. Please try again later."}), 500

@app.route('/get-api-key')
def get_api_key():
    return jsonify({"api_key": os.getenv("API_KEY")})
@app.route('/')
def home():
    return render_template('index.html')
if __name__ == '__main__':
    app.run(debug=True)
