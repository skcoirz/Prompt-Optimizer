from setuptools import setup, find_packages

from engine._version import __version__

with open('README.md') as f:
    readme = f.read()

setup(
    name='prompt_optimizer',
    python_requires=">3.11",
    version=__version__,
    url='https://github.com/skcoirz/Prompt-Optimizer',
    description="Use GPT to optimize Stable Diffusion prompts",
    long_description=readme,
    long_description_content_type='text/markdown',
    author='Skcoirz',
    install_requires=[
        "openai",
        "Pillow",
    ],
    packages=find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3.11",
        "Topic :: Artificial Intelligence",
        "Topic :: Scientific/Engineering",
        "Topic :: Software Development",
    ],
)

