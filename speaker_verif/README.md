# Speaker Identification

This folder provides a working, well-documented example for training
a speaker identification model from scratch, based on a few hours of
data. The data we use is from Mini Librispeech + OpenRIR.

There are seven files here:

* `custom_train.py`: adapted code from speech brain for training process on pretrained model.
* `custom_train.yaml`: another hyperparameters file, this time for the transfer learning, sets all parameters of execution.
* `custom_model.py`: A file containing the definition of a PyTorch module (neural network model).
* `mini_librispeech_prepare.py`: If necessary, downloads and prepares data manifests.
* `user_data_prepare.py`: Prepares raw data gathered from user.

and three json files (after training is completed):
* `test.json`: annotated test data
* `train.json`: annotated training data
* `valid.json`: annotated validation data

To train the speaker-id model, just execute the following on the command-line:

```bash
python custom_train.py custom_train.yaml
```
(Try each command with ```--device='cpu'``` if it does not work)

This will automatically download and prepare the data manifest for mini
librispeech, and then train a model with dynamically augmented samples.


