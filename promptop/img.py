from diffusers import StableDiffusionPipeline
import torch
import subprocess

_MODEL_DIR = "models/"
_IMG_PATH = "./output.png"

class REPO_ID:
	PASTEL = "andite/pastel-mix"
	SD21 = "stabilityai/stable-diffusion-2-1"

class PipeContainer:
	_img_dir = "./"
	_img_name = "output"
	_img_postfix = ".png"

	def get_pipe_from_model(self, repo_id):
		pipe = StableDiffusionPipeline.from_pretrained(repo_id, torch_dtype=torch.float32, variant="better-vae")
		pipe = pipe.to("mps") # enable optimization for mac silicone
		# Recommended if your computer has < 64 GB of RAM
		pipe.enable_attention_slicing()
		return pipe

	def __init__(self, repo_id):
		self.pipe = self.get_pipe_from_model(repo_id)

	def set_img_name(self, img_name):
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
	def get_image(self, prompt, neg_prompt):
		image = self.pipe(
			prompt=prompt,
			negative_prompt=neg_prompt,
			num_inference_steps=25,
			guidance_scale=7,
			).images[0]
		image.save(_IMG_PATH)
		return self

	def open(self):
		_img_paths = [self._img_dir, self._img_name, self._img_postfix]
		_img_path = "".join(_img_paths)
		subprocess.run(["open", _img_path])


_PROMPT = "mksks style, masterpiece, best quality, upper body, 1girl, looking at viewer, red hair, medium hair, purple eyes, demon horns, black coat, indoors, dimly lit"
_NEG = "lowres, ((bad anatomy)), ((bad hands)), text, missing finger, extra digits, fewer digits, blurry, ((mutated hands and fingers)), (poorly drawn face), ((mutation)), ((deformed face)), (ugly), ((bad proportions)), ((extra limbs)), extra face, (double head), (extra head), ((extra feet)), monster, logo, cropped, worst quality, low quality, normal quality, jpeg, humpbacked, long body, long neck, ((jpeg artifacts))"
p = PipeContainer(REPO_ID.PASTEL).get_image(_PROMPT, _NEG).open()
