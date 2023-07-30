import json
import os
import sys
from random import randint

import requests
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("chat.html")


@app.route("/parse", methods=["POST", "GET"])
def extract():
    text = str(request.form.get("value1"))
    payload = json.dumps({"sender": "user", "message": text})
    headers = {"Content-type": "application/json", "Accept": "text/plain"}
    response = requests.request(
        "POST",
        url="http://bhel-rasa:5005/webhooks/rest/webhook",
        headers=headers,
        data=payload,
    )
    response = response.json()
    # print("Response from Rasa:", response)
    resp = []
    for i in range(len(response)):
        try:
            resp.append(response[i]["text"])
        except:
            continue
    result = resp
    print("result type: ", type(result))
    # return render_template("chat.html", result=result, text=text)
    return result


if __name__ == "__main__":
    app.run(debug=True,  port=8000)
