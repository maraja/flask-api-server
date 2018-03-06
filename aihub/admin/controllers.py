
from flask import Blueprint, render_template
from random import randint


admin = Blueprint('admin', __name__, template_folder="../templates")


@admin.route('/')
def index():
    return "Admin"

@admin.route("/<string:name>/")
def getMember(name):

    # return render_template('test.html',name=name)

    quotes = [ "'If people do not believe that mathematics is simple, it is only because they do not realize how complicated life is.' -- John Louis von Neumann ",
           "'Computer science is no more about computers than astronomy is about telescopes' --  Edsger Dijkstra ",
           "'To understand recursion you must first understand recursion..' -- Unknown",
           "'You look at things that are and ask, why? I dream of things that never were and ask, why not?' -- Unknown",
           "'Mathematics is the key and door to the sciences.' -- Galileo Galilei",
           "'Not everyone will understand your journey. Thats fine. Its not their journey to make sense of. Its yours.' -- Unknown"  ]
    randomNumber = randint(0,len(quotes)-1) 
    quote = quotes[randomNumber]

    # this code will allow us to return all the variables within scope
    return render_template('quote.html', **locals())

@admin.route("/<string:name>/books/")
def getBooks(name):

    books = {
	    "Learn Python The Hard Way": {
	        "author": "Shaw, Zed",
	        "rating": "3.92",
	        "image": "ef0ceaab-32a8-47fb-ba13-c0b362d970da.jpg"
	    }
    }

    # passing data to the template
    return render_template("books.html", **locals())

@admin.route("/chat/<string:message>/")
def getChat(message):
  return message