from flask import Blueprint, jsonify, request, render_template
import os

root_path = os.path.dirname(os.path.abspath(__file__))

splash = Blueprint('splash', __name__, template_folder="../templates")


@splash.route('/')
def index():
	return render_template('splash.html')