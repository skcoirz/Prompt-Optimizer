# Prompt-Optimizer

Provide a way using GPT to optimize prompts for Stable Diffusion usage.



Plan & Progress

- ~~Use GPT to generate prompts based on initial user input.~~

- ~~Generate image with DALL-E with the prompt provided by GPT.~~

- ~~(Iteration) Use GPT to optimize prompts in an interactive way.~~

- Make Prompt more accurate.

- (Evaluation) Evaluate how good the prompt is.

- (Feedbacks) Make the result more convenient to the user by adding new features, such as A/B variants.

- (Output Variants) Hook up with local Stable Diffusion model.

- (Distribution) Make it a python package. Make it possible to be integrated with other packagies. 

- (Distribution) Make it a python package. Make it possible to be integrated with other packagies. 

- (Web UI) Provide a Web UI for better interaction.

- (Deploy) Deploy on Gradio.



### April 24, 2023

- Initial prototype ready.

- GPT can convert a user description into a prompt and send it to DALL-E.

- Image is saved on local.

- Added memotry feature. (TODO: need to consider token limitation)



> ![](./example.png)
