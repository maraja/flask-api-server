from flask import Flask, Blueprint, g
from aihub.main.controllers import main
from aihub.admin.controllers import admin
from aihub.test_ml_model.controllers import test_ml_model
from aihub.splash.controllers import splash

from aihub.config.controllers import DevelopmentConfig

# root_path = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)

# print("root path")
# print(root_path)

# app.config['GOOGLE_APPLICATION_CREDENTIALS'] = root_path + "/speechrecognition/SpeechRecOrsie-acbf7fb34165.json"
# g['GOOGLE_APPLICATION_CREDENTIALS'] = root_path + "/speechrecognition/SpeechRecOrsie-acbf7fb34165.json"

app.register_blueprint(main, url_prefix='/')
app.register_blueprint(admin, url_prefix='/admin')
app.register_blueprint(test_ml_model, url_prefix='/test_ml_model')

app.register_blueprint(splash, url_prefix='/splash')

# app.register_blueprint(Blueprint('splash', __name__, template_folder="templates"), url_prefix="/splash")
app.config.from_object(DevelopmentConfig)

# enable jinja2 extensions - i.e. continue in for loops
app.jinja_env.add_extension('jinja2.ext.loopcontrols')