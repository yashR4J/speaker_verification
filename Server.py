from flask import Flask, request, redirect, url_for, jsonify
from flask_cors import CORS
from json import dumps
import os
import base64

APP = Flask(__name__)
CORS(APP)

@APP.route("/train", methods=['POST'])
def train():
    files = request.files
    file = files.get('file')
    # file2 = files.get('file2')

    print("OIIIIII")
    print(file.filename)
    
    token = request.headers.get('Authorization')
    print(token)
    file.save("data/" +token +'/' + file.filename)

    response = jsonify("File received and saved!")
    response.headers.add('Access-Control-Allow-Origin', '*')

    return dumps({})


@APP.route("/register", methods=['POST'])
def register():
    print("PP")    
    user = request.headers.get('Authorization')
    print(user)
    if (os.path.exists(os.path.join('data', user))):
        print("AIGHT")
        count = len(os.listdir(os.path.join('data', user)))
    else:
        parent_dir = "data"
        path = os.path.join(parent_dir, user)
        # for some reason making directory causes a page reload on the 
        # fetch request????
        os.mkdir(path)
        count = 0

    return dumps({'count': count})


if __name__ == "__main__":
    APP.run(port = 5050)
