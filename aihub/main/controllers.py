from flask import Blueprint


main = Blueprint('main', __name__, template_folder="../templates")


@main.route('/')
def index():
    return "bananas"

@main.route("/test")
def getChat():
	return "test"

# @main.route("/chat/<string:message>/")
# def getChat(message):
# 	return message
    