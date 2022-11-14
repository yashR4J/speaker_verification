from flask import Flask, request, redirect, url_for, jsonify
from flask_cors import CORS
from json import dumps
import os
import base64
from custom_train import trainModel
from inference import verifySpeaker


APP = Flask(__name__)
CORS(APP)

dataFolder = "data/user_data/raw/"

@APP.route("/addSample", methods=['POST'])
def addSample():
    files = request.files
    file = files.get('file')
    
    token = request.headers.get('Authorization')
    file.save(dataFolder + '/' +token +'/' + token+'-batchno-1/' + file.filename)

    response = jsonify("File received and saved!")
    response.headers.add('Access-Control-Allow-Origin', '*')

    return dumps({})


@APP.route("/register", methods=['POST'])
def register():
    user = request.headers.get('Authorization')
    if (os.path.exists(os.path.join(os.path.join(dataFolder, user), user+'-batchno-1'))):
        count = len(os.listdir(os.path.join(os.path.join(dataFolder, user), user+'-batchno-1')))
    else:
        parent_dir = "data/raw"
        path = os.path.join(parent_dir, user)
        # for some reason making directory causes a page reload on the 
        # fetch request????
        os.mkdir(path)
        os.mkdir(os.path.join(path,user))
        count = 0

    return dumps({'count': count})


@APP.route("/train", methods=['POST'])
def train():
    token = request.headers.get('Authorization')
    
    trainModel(token)
    
    response = jsonify("File received and saved!")
    response.headers.add('Access-Control-Allow-Origin', '*')

    return dumps({})

@APP.route("/verify", methods=['POST'])
def verify():
    token = request.headers.get('Authorization')
    result = verifySpeaker(token)
    
    response = jsonify("File received and saved!")
    response.headers.add('Access-Control-Allow-Origin', '*')

    return dumps({'result': result})


if __name__ == "__main__":
    APP.run(port = 5050)
    