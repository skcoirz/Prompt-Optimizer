import os
import subprocess
from io import BytesIO
from typing import List, Optional

import openai
import requests
from PIL import Image

from promptop.img import PipeContainer, RepoID

## Params
_TEMPERATURE: float = 0.3
_OUTPUT_DIR: str = "out/"
_CONV_RECORDS: str = "conv_record.txt"

# OpenAI API: https://platform.openai.com/docs/api-reference/completions/create
openai.api_key = os.getenv("OPENAI_API_KEY")


def get_chatgpt_response(prompt: str, expected_tokens: int = 200) -> Optional[str]:
    try:
        response = openai.ChatCompletion.create(
            # gpt-4 api is not available for developers yet.
            model="gpt-3.5-turbo-0301",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=expected_tokens,
            n=1,
            temperature=_TEMPERATURE,
        )
        return response.choices[0].message.content.strip()
    except openai.error.RateLimitError:
        print("> Caught RateLimitError but we don't have retry feature yet.")
        return None
    except Exception as err:
        print(f"> Unexpected {err=}, {type(err)=}")
        raise


def generate_dalle_image(prompt: str) -> str:
    response = openai.Image.create(
        prompt=prompt,
        n=1,
        size="256x256",
    )
    return response.data[0].url


def save_image(image_url: str, file_name: str) -> None:
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content))
    img.save(_OUTPUT_DIR + file_name)
    return None


# TODO: add token limitation check
def get_request_prompt(history_chats: List[str], question: str) -> str:
    history_context = "\n".join(history_chats)
    return f"Chat History: {history_context}\n New Question: {question}"


def main() -> None:
    def to_human(x: str) -> str:
        return f"Human: {x}"

    def to_ai(x: str) -> str:
        return f"AI: {x}"

    def record_to_file(x: str) -> None:
        with open(record_file, "a+") as f:
            f.write(x + "\n")
        return None

    def record(x: str) -> None:
        history_context.append(x)
        record_to_file(x)

    history_context: List[str] = []
    record_file: str = _OUTPUT_DIR + _CONV_RECORDS
    record_to_file("\n>>new conversion begins here<<")

    print(">>>type stop to end, type go to gen image<<<\n")
    basic_role = (
        "You're a Prompt Engineer. You enrich their description into "
        "Stable Diffusion Prompts. Are you ready?"
    )
    record(to_human(basic_role))
    print(f"> {basic_role}")
    response = get_chatgpt_response(basic_role.strip(), expected_tokens=5)
    if response is None:
        print("> No AI response received. Stopped.")
        return
    record(to_ai(response))
    print(f"AI: {response}")

    user_prompt = input(
        "> Please provide a brief description of the image you want to generate: "
    )
    refined_prompt: Optional[str] = None
    while user_prompt != "stop" and user_prompt != "go":
        record(to_human(user_prompt))
        if user_prompt is not None:
            prompt_request = get_request_prompt(history_context, user_prompt)
            refined_prompt = get_chatgpt_response(prompt_request)
        if refined_prompt is None:
            print("> No AI response received. Stopped.")
            return
        print(refined_prompt)
        user_prompt = input("> ")
        record(to_ai(refined_prompt))

    if user_prompt == "stop":
        print("> Bye!")
    if refined_prompt is not None:
        # image_url = generate_dalle_image(refined_prompt)
        # save_image(image_url, "generated_image.png")
        image = PipeContainer(RepoID.PASTEL).gen_image(
            prompt=refined_prompt, neg_prompt=""
        )
        image.save("generated_image.png")
        # TODO avoid overriding.
        print("> Image saved as 'generated_image.png'")
        subprocess.run(["open", "generated_image.png"])
    else:
        print("> Skipped. Emptry refined_prompt")

    # while True:
    #     feedback = input(
    #         "Do you want to refine the image based on your feedback? (yes/no): "
    #         ).lower()
    #     if feedback == "yes":
    #         user_feedback = input("Please provide your feedback: ")
    #         refined_prompt = get_chatgpt_response(
    #             refined_prompt + " | " + user_feedback)
    #         image_url = generate_dalle_image(refined_prompt)
    #         save_image(image_url, "generated_image.png")
    #         print("Image updated and saved as 'generated_image.png'")
    #     else:
    #         print("Thank you for using the image generation tool.")
    #         break


if __name__ == "__main__":
    main()
