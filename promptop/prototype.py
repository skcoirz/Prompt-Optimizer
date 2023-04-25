import os
from io import BytesIO
from typing import Optional

import openai
import requests
from PIL import Image

## Params
_TEMPERATURE: float = 0.3
_OUTPUT_DIR: str = "out/"

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


def main() -> None:
    print(">>>type stop to end, type go to gen image<<<\n")
    basic_role = (
        "You're a Prompt Engineer. You help people enrich their description into "
        "Stable Diffusion Prompts. You know the pros and cons. You will provide "
        "the most precise prompts. Are you ready?"
    )
    print(f"> {basic_role}")
    response = get_chatgpt_response(basic_role.strip(), expected_tokens=5)
    print(f"AI: {response}")

    user_prompt = input(
        "> Please provide a brief description of the image you want to generate: "
    )
    refined_prompt: Optional[str] = user_prompt
    while user_prompt != "stop" and user_prompt != "go":
        if user_prompt is not None:
            refined_prompt = get_chatgpt_response(user_prompt)
        if refined_prompt is None:
            return
        print(f"AI: {refined_prompt}")
        user_prompt = input("> ")

    if user_prompt == "stop":
        print("> Bye!")
    if refined_prompt is not None:
        image_url = generate_dalle_image(refined_prompt)
        save_image(image_url, "generated_image.png")
        print("> Image saved as 'generated_image.png'")
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
