# from scipy.io.wavfile import read


# import matplotlib.pyplot as plt

# plt.rcParams["figure.figsize"] = [7.50, 3.50]
# plt.rcParams["figure.autolayout"] = True
# input_data = read("output.wav")
# audio = input_data[1]
# plt.plot(audio[0:1024])
# plt.ylabel("Amplitude")
# plt.xlabel("Time")
# plt.show()

import librosa
import librosa.display
import matplotlib.pyplot as plt

# Load the audio file
AUDIO_FILE = './output.wav'
samples, sample_rate = librosa.load(AUDIO_FILE, sr=None)



# x-axis has been converted to time using our sample rate. 
# matplotlib plt.plot(y), would output the same figure, but with sample 
# number on the x-axis instead of seconds
# plt.figure(figsize=(14, 5))
# librosa.display.waveshow(samples, sr=sample_rate)

sgram = librosa.stft(samples)
librosa.display.specshow(sgram)

