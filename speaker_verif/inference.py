from speechbrain.pretrained import SpeakerRecognition
verification = SpeakerRecognition.from_hparams(source="speechbrain/spkrec-ecapa-voxceleb", savedir="pretrained_models/spkrec-ecapa-voxceleb")

file1 = './data/LibriSpeech/train-clean-5/19/198/19-198-0000.flac'
file2 = './data/LibriSpeech/train-clean-5/32/21631/32-21631-0003.flac'
file3 = './data/LibriSpeech/train-clean-5/19/198/19-198-0002.flac'

score, prediction = verification.verify_files(file1, file2)

print(score)
print(prediction) # True = same speaker, False=Different speakers

# import torch
# import tqdm
# import speechbrain as sb
# from speechbrain.core import Stage
# from speechbrain.dataio import dataloader

# def transcribe_dataset(
#         self,
#         dataset, # Must be obtained from the dataio_function
#         min_key, # We load the model with the lowest WER
#         loader_kwargs # opts for the dataloading
#     ):

#     # If dataset isn't a Dataloader, we create it. 
#     if not isinstance(dataset, dataloader):
#         loader_kwargs["ckpt_prefix"] = None
#         dataset = self.make_dataloader(
#             dataset, Stage.TEST, **loader_kwargs
#         )


#     self.on_evaluate_start(min_key=min_key) # We call the on_evaluate_start that will load the best model
#     self.modules.eval() # We set the model to eval mode (remove dropout etc)

#     # Now we iterate over the dataset and we simply compute_forward and decode
#     with torch.no_grad():

#         transcripts = []
#         for batch in tqdm(dataset, dynamic_ncols=True):

#             # Make sure that your compute_forward returns the predictions !!!
#             # In the case of the template, when stage = TEST, a beam search is applied 
#             # in compute_forward(). 
#             out = self.compute_forward(batch, stage=sb.Stage.TEST) 
#             p_seq, wav_lens, predicted_tokens = out

#             # We go from tokens to words.
#             predicted_words = self.tokenizer(
#                 predicted_tokens, task="decode_from_list"
#             )
#             transcripts.append(predicted_words)

#     return transcripts

# if __name__ == "__main__":
#   pass