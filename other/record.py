# import sys, os
# import pyaudio
# import wave

# FRAMES_PER_BUFFER = 3200
# FORMAT = pyaudio.paInt16
# CHANNELS = 1
# RATE = 16000

import sounddevice as sd
from scipy.io.wavfile import write

fs = 44100  # Sample rate
seconds = 2  # Duration of recording

myrecording = sd.rec(int(seconds * fs), samplerate=fs, channels=1)
sd.wait()  # Wait until recording is finished
write('output.wav', fs, myrecording)  # Save as WAV file 