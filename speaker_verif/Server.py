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
        path = os.path.join(dataFolder, user)
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
    files = request.files
    file = files.get('file')
    
    path = 'data/verify/' + file.filename
    file.save(path)

    # result = verifySpeaker(token,path)
    result=token
    print(token)
    response = jsonify("File received and saved!")
    response.headers.add('Access-Control-Allow-Origin', '*')

    return dumps({'result': result})


if __name__ == "__main__":
    APP.run(port = 5050)
    