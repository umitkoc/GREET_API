from flask import Flask,render_template
import os

app = Flask(__name__,template_folder="templates")

@app.route('/')
def home():
    folders=os.listdir("./templates")
    step=0
    li=""
    for i in folders:
        if i.startswith("web"):
            step+=1
            li+=f"<li><a href='./{i}/index.html' target='_blank'>{i}</a></li>"
    m="""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <ul>
            contentos
            </ul>
        </body>
        </html>
        """
    m=m.replace("contentos",li)
    file=open("./templates/index.html","w",encoding="utf-8")
    file.write(m)
    file.close()
    return render_template("web_design_1/index.html")


if __name__=='__main__':
    app.run(debug=True)


   