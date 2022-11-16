#!/usr/bin/python

import os
import shutil
import glob
from random import shuffle
from torch.nn import CosineSimilarity 
from torchaudio import load as load_signal
from speechbrain.pretrained import EncoderClassifier

src_path = "results/speaker_id/1986/save/"  # Path to trained network checkpoints
dest_path = "content/best_model/"           # Path to store most recently trained model information 

# if os.path.exists(dest_path):
#     shutil.rmtree(dest_path)

# os.mkdir(dest_path)
# shutil.copy2("./hparams_inference.yaml", dest_path)
# shutil.copy2(src_path + "label_encoder.txt", dest_path)
# os.rename(dest_path + "label_encoder.txt", dest_path + "label_encoder.ckpt")
# ckpt_files = glob.glob(src_path + "CKPT*")
# if not ckpt_files:
#     print("No trained checkpoints")
#     exit(1)
# latest_ckpt_path = max(ckpt_files, key=os.path.getctime)
# for file in glob.glob(latest_ckpt_path + "/*"):
#     shutil.copy2(file, dest_path)

# Debug Quick Test Data
file1 = './data/user_data/raw/19/198/19-198-0000.flac'
file2 = './data/user_data/raw/3947/13262/3947-13262-0002.flac'
file3 = './data/user_data/raw/19/198/19-198-0002.flac'
sample = './data/sample.wav'
me = './data/user_data/raw/5317349/1/5317349-0002.wav'
me2 = './data/user_data/raw/5317349/1/5317349-0007.wav'

# DEFINE Variables
test_signal_path = file1 # "./data/sample.wav" # # #  REPLACE WITH ACTUAL SAMPLE WAV FILE PATH
spk_id = "5317349"

# Build Classifier
classifier = EncoderClassifier.from_hparams(source="content/best_model",  hparams_file='hparams_inference.yaml', savedir="content/best_model")

# Cosine Similarity
similarity = CosineSimilarity(dim=-1, eps=1e-8) # dim=-1 refers to the last dimension (i.e. the embedding dimension)

def extract_audio_embeddings(model, wav_audio_file_path: str) -> tuple:
    """Feature extractor that embeds audio into a vector."""
    signal, _ = load_signal(wav_audio_file_path)  # Reformat audio signal into a tensor
    try:
        output_probs, score, index, text_lab = model.classify_batch(signal)
        print("Possible user_ids", score, text_lab)
    except KeyError:
        text_lab = []
    embeddings = model.encode_batch(
        signal
    )  # Pass tensor through pretrained neural net and extract representation
    return embeddings, text_lab

def verify(s1, s2):
    global similarity
    score = similarity(s1, s2) # resulting tensor has scores = embedding dimensionality 
    for s in score: 
        if s > 0.25: return True
    return False

test_emb, possible_ids = extract_audio_embeddings(classifier, test_signal_path)

if spk_id in possible_ids: 
    print("User Verified")
    exit(0)

spk_samples = glob.glob(f"data/user_data/raw/{spk_id}/*/*.wav")
shuffle(spk_samples)
for sample_path in spk_samples[:5]: # test on up to 5 random samples
    print(f"Testing sample against {sample_path}")
    sample_emb = extract_audio_embeddings(classifier, sample_path)
    if verify(test_emb, sample_emb):
        print("User Verified")
        exit(0)

print("Suspicious User - Access Denied")

