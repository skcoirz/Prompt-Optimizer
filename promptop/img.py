import subprocess
from enum import Enum
from typing import Self

import torch
from diffusers import StableDiffusionPipeline  # type: ignore
from PIL import Image

_MODEL_DIR = "models/"
_IMG_PATH = "./output.png"


class RepoID(str, Enum):
    PASTEL = "andite/pastel-mix"
    SD21 = "stabilityai/stable-diffusion-2-1"


class PipeContainer:
    _img_dir: str = "out/"
    _img_name: str = "output"
    _img_postfix: str = ".png"

    def _get_pipe_from_model(self, repo_id: RepoID) -> StableDiffusionPipeline:
        pipe = StableDiffusionPipeline.from_pretrained(
            repo_id.value, torch_dtype=torch.float32
        )
        pipe = pipe.to("mps")  # enable optimization for mac silicone
        # Recommended if your computer has < 64 GB of RAM
        pipe.enable_attention_slicing()
        return pipe

    def __init__(self, repo_id: RepoID):
        self.pipe = self._get_pipe_from_model(repo_id)

    def set_img_name(self, img_name: str) -> Self:
        self._img_name = img_name
        return self

    # parameters: https://github.com/huggingface/diffusers/blob/v0.16.0/src/diffusers/pipelines/stable_diffusion/pipeline_stable_diffusion.py#L532-L551
    # prompt: Union[str, List[str]] = None,
    # height: Optional[int] = None,
    # width: Optional[int] = None,
    # num_inference_steps: int = 50,
    # guidance_scale: float = 7.5,
    # negative_prompt: Optional[Union[str, List[str]]] = None,
    # num_images_per_prompt: Optional[int] = 1,
    # eta: float = 0.0,
    # generator: Optional[Union[torch.Generator, List[torch.Generator]]] = None,
    # latents: Optional[torch.FloatTensor] = None,
    # prompt_embeds: Optional[torch.FloatTensor] = None,
    # negative_prompt_embeds: Optional[torch.FloatTensor] = None,
    # output_type: Optional[str] = "pil",
    # return_dict: bool = True,
    # callback: Optional[Callable[[int, int, torch.FloatTensor], None]] = None,
    # callback_steps: int = 1,
    # cross_attention_kwargs: Optional[Dict[str, Any]] = None,
    def gen_image(self, prompt: str, neg_prompt: str) -> Image.Image:
        return self.pipe(
            prompt=prompt,
            negative_prompt=neg_prompt,
            num_inference_steps=25,
            guidance_scale=7,
        ).images[0]

    def gen_and_save_image(self, prompt: str, neg_prompt: str) -> Self:
        image = self.gen_image(prompt, neg_prompt)
        print(type(image))
        image.save(_IMG_PATH)
        return self

    def open(self) -> None:
        _img_paths = [self._img_dir, self._img_name, self._img_postfix]
        _img_path = "".join(_img_paths)
        subprocess.run(["open", _img_path])


PipeContainer(RepoID.PASTEL).gen_and_save_image("1girl", "")
