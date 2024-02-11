from functools import partial
from flask import Flask, render_template, request
from flask_htmx import HTMX
from flask_htmx.responses import HTMXResponseClientRedirect
import json

app = Flask(__name__)
htmx = HTMX(app)

def readData(heading):
    try:
        with open("./static/data.json", "r") as f:
            data = json.load(f)
        return str(data[heading])
    except json.JSONDecodeError:
        return "0"

def addVisit():
    with open("./static/data.json", "r") as f:
        data = json.load(f)
    data["visits"] += 1
    with open("./static/data.json", "w") as f:
        f.write(json.dumps(data))

def getUser(keyword, value):
    with open("./static/userData.txt", "r") as f:
        originalData = []
        for line in f.read().split("\n"):
            try:
                originalData.append(json.loads(line))
            except:
                pass
    data = None
    for x in originalData:
        if keyword in x and x[keyword] == value:
            data = x
    return originalData, data

def updateUser(ip, code):
    originalData, data = getUser("ip",ip)
    if data:
        originalData.remove(data)
        data["visits"] += 1
    else:
        data = {"ip":ip, "visits":1}
        _, codeData = getUser("code",code)
        if codeData:
            originalData.remove(codeData)
            data = {**data, **codeData}

    originalData.append(data)
    with open("./static/userData.txt", "w") as f:
        f.write("\n".join([json.dumps(line) for line in originalData]))
    return data

def addUser(data):
    _, codeData = getUser("code",data["code"])
    if codeData:
        return
    else:
        with open("./static/userData.txt", "a+") as f:
            f.write(json.dumps(data) + "\n")

def testEggOne(ip):
    originalData, data = getUser("ip",ip)

    if "code" in data:
        originalData.remove(data)
        if "eggs" in data:
            if "1" not in data["eggs"]:
                data["eggs"] += "1"
        else:
            data["eggs"] = "1"

        originalData.append(data)
        with open("./static/userData.txt", "w") as f:
            f.write("\n".join([json.dumps(line) for line in originalData]))

@app.route("/")
def home():
    addVisit()
    code = request.args.get('q')
    userData = updateUser(request.remote_addr, code)
    if code is None:
        testEggOne(request.remote_addr)
    ##get egg count func
    ##add cool responses to shit
    name = userData["name"] if "name" in userData else "there..."
    return render_template("index.html", emails=readData("emails"), visits=readData("visits"), eggs=readData("eggs"), name=name, matrix_level=0)


# @app.route("/redirect")
# def redirect_route():
#     return HTMXResponseClientRedirect("/redirected-endpoint")

@app.route("/emails")
def emails():
    return readData("emails")

@app.route("/visits")
def visits():
    return readData("visits")

@app.route("/eggs")
def eggs():
    return readData("eggs")

@app.route("/add_data_uwodfhewiuf83ry2jueij299384010fiifjkjek", methods = ['GET', 'POST'])
def add_data():
    if request.method == 'POST':
        data = request.form
        addUser(data)
        
    return "aa"
if __name__ == "__main__":
    app.run(debug=True)