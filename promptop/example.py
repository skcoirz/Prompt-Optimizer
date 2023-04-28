from typing import Optional

from promptop.api import OpenAIApiHandler, OpenAIModel
from promptop.img import PipeContainer, RepoID


def example() -> None:
    handler = OpenAIApiHandler(OpenAIModel.GPT35)
    handler.setup()

    user_prompt = input(
        "> Please provide a brief description of the image you want to generate: "
    )
    refined_prompt: Optional[str] = None
    while user_prompt != "stop" and user_prompt != "go":
        refined_prompt = handler.ask_ai(user_prompt)
        if refined_prompt == "":
            return
        user_prompt = input("> ")

    if user_prompt == "stop":
        print("> Bye!")
        return
    if refined_prompt is not None:
        img_name = "output"
        # TODO avoid overriding.
        pipe = PipeContainer(RepoID.SD21).set_img_name(img_name).gen_and_save_image(
            prompt=refined_prompt, neg_prompt="lowres, bad anotomy"
        )
        print("> Image saved as \'{img_name}\'")
        pipe.open()
    else:
        print("> Skipped. No prompt received.")

example()
