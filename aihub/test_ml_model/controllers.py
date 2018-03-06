from flask import Blueprint, jsonify, request, render_template

# import your inference function from your model here
# for example, if you have a chatbot, you should have an inference function
# which hooks into your model and takes a string as a parameter to test it.
from .inference import inference


test_ai_model = Blueprint('test_ai_model', __name__, template_folder="../templates")


# you can get to this route by typing /test_ai_model/ in your browser
@test_ai_model.route('/')
def index():
    return inference("hello")


# example of a POST call.
# you can get to this route by typing /test_ai_model/chat in your browser
@joeychatbot.route('/chat', methods = ['POST'])
def chat():
	if request.method == 'POST':
		# you can use <user_id>, which is a str but could
		# changed to be int or whatever you want, along
		# with your lxml knowledge to make the required
		# changes
		data = request.json # a multidict containing POST data
		message = data['message']

		reply = inference(message)
		return jsonify({
			"message": "successfully chatted!",
			"result": reply
		})
