import os
import re
from enum import Enum
from typing import List, Optional

import openai

import promptop.prompt_templates as pt

## Params
_TEMPERATURE: float = 0.3
_OUTPUT_DIR: str = "out/"
_CONV_RECORDS: str = "conv_record.txt"

# OpenAI API: https://platform.openai.com/docs/api-reference/completions/create
openai.api_key = os.getenv("OPENAI_API_KEY")


class OpenAIModel(str, Enum):
    GPT35 = "gpt-3.5-turbo-0301"


class OpenAIApiHandler:
    def __init__(self, model: OpenAIModel) -> None:
        self.history_context: List[str] = []
        self.record_file: str = _OUTPUT_DIR + _CONV_RECORDS
        self.model: OpenAIModel = model

    def get_chatgpt_response(
        self, prompt: str, expected_tokens: int = 200
    ) -> Optional[str]:
        try:
            response = openai.ChatCompletion.create(
                # gpt-4 api is not available for developers yet.
                model=self.model,
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

    def generate_dalle_image(self, prompt: str) -> str:
        response = openai.Image.create(
            prompt=prompt,
            n=1,
            size="256x256",
        )
        return response.data[0].url
        # image_url = generate_dalle_image(refined_prompt)
        # save_image(image_url, "generated_image.png")

    # def save_image(image_url: str, file_name: str) -> None:
    #     response = requests.get(image_url)
    #     img = Image.open(BytesIO(response.content))
    #     img.save(_OUTPUT_DIR + file_name)
    #     return None

    # TODO: add token limitation check
    def get_request_prompt(self, history_chats: List[str], question: str) -> str:
        conv = "\n".join(history_chats)
        return f"Chat History: {conv}\n New Question: {question}"

    def _human_chat(self, x: str) -> None:
        self.record(f"Human: {x.strip()}")

    def _ai_chat(self, x: str, expected_tokens=200) -> str:
        response = self.get_chatgpt_response(x.strip(), expected_tokens)
        if response is None:
            print("> No AI response received. Stopped.")
            return ""
        response = response.strip()
        result = re.search("(AI:)?(.*)", response)
        if result is None:
            return ""
        response = result.group(2).strip()
        self.record(f"AI: {response}")
        print(f"AI: {response}")
        return response

    def record_to_file(self, x: str) -> None:
        with open(self.record_file, "a+") as f:
            f.write(x + "\n")
        return None

    def record(self, x: str) -> None:
        self.history_context.append(x)
        self.record_to_file(x)

    def setup(self):
        self.record_to_file("\n>>new conversion begins here<<")
        print(">>>type stop to end, type go to gen image<<<\n")
        self._human_chat(pt.basic_role)
        print(f"> {pt.basic_role.strip()}")
        self._ai_chat(pt.basic_role, expected_tokens=5)

    def ask_ai(self, x: str) -> str:
        prompt_request = self.get_request_prompt(self.history_context, x)
        self._human_chat(x)
        return self._ai_chat(prompt_request)
