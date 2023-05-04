import os

def enable_configs_for_old_macbook():
	# Enable this if you're using an old macbook which doesn't have a powerful gpu.
	os.environ["PYTORCH_MPS_HIGH_WATERMARK_RATIO"] = "0.0"
