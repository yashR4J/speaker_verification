#!/usr/bin/python
import os
import sys
import shutil
import glob
import subprocess
from speechbrain.pretrained import SpeakerRecognition

src_path = "results/speaker_id/1986/save/"
dest_path = "content/best_model/"

# if os.path.exists(dest_path):
#     shutil.rmtree(dest_path)
    
# subprocess.run(f"mkdir -p {dest_path}", shell=True)
# subprocess.run(f"cp {src_path}label_encoder.txt {dest_path}", shell=True)
# list_of_files = glob.glob(src_path + "CKPT*")
# ckpt_path = max(list_of_files, key=os.path.getctime)
# subprocess.run(f"cp {ckpt_path}/* {dest_path}", shell=True)

verification = SpeakerRecognition.from_hparams(source = 'content/best_model/', hparams_file='/hparams_inference.yaml', savedir="content/best_model/")

# # Debug Quick Test Data
# file1 = './data/LibriSpeech/train-clean-5/19/198/19-198-0000.flac'
# file2 = './data/LibriSpeech/train-clean-5/32/21631/32-21631-0003.flac'
# file3 = './data/LibriSpeech/train-clean-5/19/198/19-198-0002.flac'

me = './data/user_data/raw/5317349/1/5317349-0009.wav'
me2 = './data/user_data/raw/5317349/1/5317349-0009.wav'

score, prediction = verification.verify_files(me, me2)

print(score)
print(prediction) # True = same speaker, False=Different speakers
