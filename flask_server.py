from flask import Flask, session
from flask_session import Session

from promptop.api import OpenAIApiHandler, OpenAIModel
from promptop.img import PipeContainer, RepoID
from promptop.config import enable_configs_for_old_macbook

app = Flask(__name__)

app.config["SESSION_PERMANENT"] = False
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)


@app.route('/init')
def init():
    handler = OpenAIApiHandler(OpenAIModel.GPT35)
    handler.setup()

    session['handler'] = handler

    return 'Please provide a brief description of the image you want to generate'

@app.route('/iterate-prompt/<user_prompt>')
def iterate_prompt(user_prompt):
    handler = session.get('handler')

    if not handler or user_prompt == '':
        return 'bad request!', 400

    refined_prompt = handler.ask_ai(user_prompt)

    return refined_prompt

@app.route('/generate-image/<prompt>')
def generate_image(prompt):
    return 'Not yet implemented', 500

    # img_name = "output"

    # pipe = PipeContainer(RepoID.SD21).set_img_name(img_name).gen_and_save_image(
    #     prompt=prompt, neg_prompt="lowres, bad anotomy"
    # )

    # pipe.open()
