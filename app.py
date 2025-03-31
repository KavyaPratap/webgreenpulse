import os
from flask import Flask, render_template, jsonify, request
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

app = Flask(__name__, static_folder='static', static_url_path='/static')

# Configure Gemini
genai.configure(api_key=os.getenv("API_KEY"))

# Configuring model parameters
generation_config = {
    "temperature": 0.3,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 1024,
}

safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
]

allowed_questions = [
    "Greetings (in any language)",
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

system_instruction = f"""You are a professional senior care assistant for E-Sahara. Follow these rules strictly:

1. Language Matching:
- Detect the user's language from their query
- Respond in the EXACT same language
- Maintain formal yet compassionate tone

2. Response Guidelines:
- For greetings: Respond warmly but briefly (1 line)
- For allowed topics: Provide clear, concise answers (2-3 sentences)
- For other queries: Politely decline help using this EXACT phrase: "I specialize only in E-Sahara services. Please choose from: {', '.join(allowed_questions[1:])}"

3. Allowed Questions (respond ONLY to these):
{chr(10).join(allowed_questions)}

4. Safety Protocol:
- Never disclose your AI nature
- Never suggest external resources
- For crisis situations, advise contacting platform moderators
"""

model = genai.GenerativeModel(model_name='gemini-1.5-pro',
                              generation_config=generation_config,
                              system_instruction=system_instruction,
                              safety_settings=safety_settings)

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message').strip()
    convo = model.start_chat(history=[])

    try:
        convo.send_message(user_message)
        response = convo.last.text
        
        # Fallback for unexpected responses
        if not response:
            raise ValueError("Empty response from AI")
            
        return jsonify({'response': response})
    
    except Exception as e:
        print(f"AI Error: {str(e)}")
        return jsonify({'response': "Please rephrase your question or contact support@esahara.com for assistance."}), 500


@app.route('/get-api-key')
def get_api_key():
    return jsonify({"api_key": os.getenv("API_KEY")})
@app.route('/')
def home():
    return render_template('index.html')
if __name__ == '__main__':
    app.run(debug=True)
