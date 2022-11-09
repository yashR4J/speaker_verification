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
    file.save("data/owwwwwww.wav")

    response = jsonify("File received and saved!")
    response.headers.add('Access-Control-Allow-Origin', '*')

    return dumps({})
    # print(file)
    # data = request.get_json()
    # print("CHicken")
    # print(data['files'])
    # uploaded_file = request.files['files']
    # print("BBBBBBBBBB")
    # if uploaded_file.filename != '':
    #     uploaded_file.save(uploaded_file.filename)
    # data = request.get_json()
    # ret = register_user(data['username'], data['password'])
    # return redirect(url_for('index'))

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
        os.mkdir(path)

    return dumps({'count': count})


if __name__ == "__main__":
    APP.run(port = 5050)
