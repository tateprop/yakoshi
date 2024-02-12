from functools import partial
from flask import Flask, render_template, request, redirect, make_response, send_from_directory
from flask_htmx import HTMX
from flask_htmx.responses import HTMXResponseClientRedirect
import json
import os

app = Flask(__name__)
htmx = HTMX(app)

def readData(heading):
    try:
        with open("./static/data.json", "r") as f:
            data = json.load(f)
        return str(data[heading])
    except json.JSONDecodeError:
        return "0"

def addSiteData(keyword):
    with open("./static/data.json", "r") as f:
        data = json.load(f)
    data[keyword] += 1
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

def addEgg(ip, eggNumber):
    originalData, data = getUser("ip",ip)

    originalData.remove(data)
    eggNumberString = str(eggNumber)
    change = False
    if "eggs" in data:
        if eggNumberString not in data["eggs"]:
            change = True
            data["eggs"] += eggNumberString
    else:
        change = True
        data["eggs"] = eggNumberString

    if change:
        addSiteData("emails")
        if eggNumber == 1:
            data["fright"] == True

    originalData.append(data)
    with open("./static/userData.txt", "w") as f:
        f.write("\n".join([json.dumps(line) for line in originalData]))

def handleCookies(request):
    if "egg" in request.cookies:
        if request.cookies.get("egg") == "68934a3e9455fa72420237eb05902327":
            addEgg(request.remote_addr, 5)

def removeFright(userData):
    originalData, data = getUser("ip","")
    originalData.remove(userData)
    del userData["fright"]

    originalData.append(userData)
    with open("./static/userData.txt", "w") as f:
        f.write("\n".join([json.dumps(line) for line in originalData]))

def getName(userData):
    if "fright" in userData:
        removeFright(userData)
        return userData["name"] + "I'll always remember you..." if "name" in userData else "there..."
    return userData["name"] if "name" in userData else "there..."

@app.route("/")
def home():
    addSiteData("visits")
    code = request.args.get('q')
    userData = updateUser(request.remote_addr, code)
    if code is None and "code" in userData:
        addEgg(request.remote_addr, 1)
    
    handleCookies(request)
    name = getName(userData)
    resp = make_response(render_template("index.html", emails=readData("emails"), visits=readData("visits"), eggs=readData("eggs"), name=name, matrix_level=0))
    resp.set_cookie('egg', 'b326b5062b2f0e69046810717534cb09')
    return resp

@app.route("/add_egg_923785rufhrejg93")
def jsEgg():
    addEgg(request.remote_addr, 2)
    return "success"

@app.route("/robots.txt")
def robots():
    return("User-agent: *<br>Disallow: /secret8928941")

@app.route("/secret8928941")
def secretLink():
    addEgg(request.remote_addr, 3)
    return redirect("/", code=302)

@app.route("/admin", methods = ['GET', 'POST'])
def wordpress():
    if request.method == 'POST':
        addEgg(request.remote_addr, 4)
        style = "<style> p{font-family:monospace;white-space: pre;} </style>"
        with open("./templates/egg.txt", "r") as f:
            egg = "<br>".join(f.read().split("\n"))
        return f"{style}Seriously... did you really believe i used wordpess :/<br>I'm offended... <br>but anyway here's an egg<br><br><p>{egg}</p>"
    return render_template("wordpress.html")

@app.route("/emails")
def emails():
    return readData("emails")

@app.route("/visits")
def visits():
    return readData("visits")

@app.route("/eggs")
def eggs():
    return readData("eggs")

@app.route("/egg_counter")
def eggCounter():
    ip = request.remote_addr
    _, data = getUser("ip",ip)
    if "eggs" in data:
        eggs = data["eggs"]
        total = "5" if "code" in data else "4"
        return f"Eggs found: {str(len(eggs))}/{total}"
    return ""

@app.route("/matrix_level")
def matrixLevel():
    ip = request.remote_addr
    _, data = getUser("ip",ip)
    if "eggs" in data:
        eggs = data["eggs"]
        return str(len(eggs))
    return "0"

@app.route("/add_data_uwodfhewiuf83ry2jueij299384010fiifjkjek", methods = ['GET', 'POST'])
def add_data():
    if request.method == 'POST':
        addSiteData("emails")
        data = request.form
        addUser(data)
        
    return "success"

@app.route('/uploads/<path:filename>', methods=['GET', 'POST'])
def download(filename):
    print("a")
    print()
    
    uploads = "./uploads"
    print(send_from_directory(uploads, filename))
    return send_from_directory(uploads, filename)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5938)


# Logic to add
# 1 - merge json if ip first then code - DONE
# 2 - i still remeber you... -DONE
# 2.5 - write eggs - DONE
# 3 - count eggs -- and add fright - DONE
# 4 - egg amount if code  - DONE
# 4.5 - 
# 5 - spam prevention ??
