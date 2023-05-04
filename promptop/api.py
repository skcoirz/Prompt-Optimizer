import os
import re
from enum import Enum
from pathlib import Path
from typing import Dict, List, Optional

import openai

import promptop.prompt_templates as pt

## Params
_TEMPERATURE: float = 0.3
_OUTPUT_DIR: str = "./out/"
_CONV_RECORDS: str = "conv_record.txt"

# OpenAI API: https://platform.openai.com/docs/api-reference/completions/create
openai.api_key = os.environ["OPENAI_API_KEY"]


class OpenAIModel(str, Enum):
    GPT35 = "gpt-3.5-turbo-0301"


class OpenAIApiHandler:
    def __init__(self, model: OpenAIModel) -> None:
        # TODO: add token limitation check
        self.history_context: List[Dict[str, str]] = []
        self.record_file: Path = Path(_OUTPUT_DIR + _CONV_RECORDS)
        self.record_file.parents[0].mkdir(parents=True, exist_ok=True)
        self.model: OpenAIModel = model

    def get_response_from_msg(
        self,
        message_stack: List[Dict[str, str]],
    ) -> Optional[str]:
        try:
            response = openai.ChatCompletion.create(
                # gpt-4 api is not available for developers yet.
                model=self.model,
                # messages=[{"role": "user", "content": prompt}],
                messages=message_stack,
                max_tokens=200,
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

    def _record_to_file(self, x: str) -> None:
        with self.record_file.open("a+") as f:
            f.write(x + "\n")
        return None

    def _store_human_chat(self, x: str) -> None:
        self.history_context.append({"role": "user", "content": x})
        self._record_to_file(f"Human: {x}")

    def _store_ai_chat(self, x: str) -> None:
        self.history_context.append({"role": "assistant", "content": x})
        self._record_to_file(f"AI: {x}")

    def _ask_and_store_ai(self) -> str:
        response = self.get_response_from_msg(self.history_context)
        if response is None:
            print("> No AI response received. Stopped.")
            return ""
        search_result = re.search("(AI:)?(.*)", response)
        if search_result is None:
            return ""
        prompt = search_result.group(2).strip()
        self._store_ai_chat(prompt)
        print(f"AI: {prompt}")
        return prompt

    def ask_ai(self, x: str) -> str:
        self._store_human_chat(x.strip())
        return self._ask_and_store_ai()

    def setup(self):
        self._record_to_file("\n>>new conversion begins here<<")
        print(">>>type stop to end, type go to gen image<<<\n")
        task = pt.task_description.strip()
        self.history_context.append({"role": "system", "content": task})
        self._record_to_file(f"System: {task}")
        print(f"> {task}")
        self._ask_and_store_ai()
