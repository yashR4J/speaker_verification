#!/usr/bin/python
import os
import sys
import shutil
import glob
import subprocess
import torch
import torchaudio
from speechbrain.pretrained import EncoderClassifier, SpeakerRecognition

# src_path = "results/speaker_id/1986/save/"
# dest_path = "content/best_model/"

# if os.path.exists(dest_path):
#     shutil.rmtree(dest_path)
    
# subprocess.run(f"mkdir -p {dest_path}", shell=True)
# subprocess.run(f"cp {src_path}hparams_inference.yaml {dest_path}", shell=True)
# subprocess.run(f"cp {src_path}label_encoder.txt {dest_path}", shell=True)
# list_of_files = glob.glob(src_path + "CKPT*")
# ckpt_path = max(list_of_files, key=os.path.getctime)
# subprocess.run(f"cp {ckpt_path}/* {dest_path}", shell=True)

verifier = SpeakerRecognition.from_hparams(source="content/best_model",  hparams_file='hparams_inference.yaml', savedir="content/best_model")
classifier = EncoderClassifier.from_hparams(source="content/best_model",  hparams_file='hparams_inference.yaml', savedir="content/best_model")

# # Debug Quick Test Data
file1 = './data/LibriSpeech/train-clean-5/19/198/19-198-0000.flac'
file2 = './data/LibriSpeech/train-clean-5/32/21631/32-21631-0003.flac'
file3 = './data/LibriSpeech/train-clean-5/19/198/19-198-0002.flac'
sample = './data/sample.wav'
me = './data/user_data/raw/5317349/1/5317349-0002.wav'
me2 = './data/user_data/raw/5317349/1/5317349-0007.wav'

# score, prediction = verifier.verify_files(me, me2)
# print(score, prediction) # True = same speaker, False=Different speakers

signal, fs = torchaudio.load(sample)
emb = classifier.encode_batch(signal)
# try:
prediction = classifier.classify_batch(signal)
# except KeyError:
#     prediction = None
    
print(emb, prediction)

signal, fs = torchaudio.load(file1)
emb2 = classifier.encode_batch(signal)
try:
    prediction = classifier.classify_batch(signal)
except KeyError:
    prediction = None
    
print(emb2, prediction)
similarity = torch.nn.CosineSimilarity(dim=-1, eps=1e-8)
score = similarity(emb, emb2)
print(score, score > 0.25)
