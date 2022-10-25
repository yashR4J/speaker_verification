# import sys, os
# import pyaudio
# import wave

# FRAMES_PER_BUFFER = 3200
# FORMAT = pyaudio.paInt16
# CHANNELS = 1
# RATE = 16000

# devnull = os.open(os.devnull, os.O_WRONLY)
# old_stderr = os.dup(2)
# sys.stderr.flush()
# os.dup2(devnull, 2)
# os.close(devnull)

# p = pyaudio.PyAudio()
# os.dup2(old_stderr, 2)
# os.close(old_stderr)

# p.get_default_input_device_info()
# exit(0)
# stream = p.open(
#     format=FORMAT,
#     channels=CHANNELS,
#     rate = RATE,
#     input = True,
#     frames_per_buffer =FRAMES_PER_BUFFER
# )

# print('start recording')
# seconds = 5
# frames = []
# for i in range(0, int(RATE/FRAMES_PER_BUFFER * seconds)):
#     frames.append(stream.read(FRAMES_PER_BUFFER))

# stream.stop_stream()
# stream.close()
# p.terminate()

# obj = wave.open('output.wav', 'wb')
# obj.setnchannels(CHANNELS)
# obj.setsampwidth(RATE)
# obj.writeframes(b"".join(frames))
# obj.close()

import sounddevice as sd
from scipy.io.wavfile import write

fs = 44100  # Sample rate
seconds = 3  # Duration of recording

myrecording = sd.rec(int(seconds * fs), samplerate=fs, channels=2)
sd.wait()  # Wait until recording is finished
write('output.wav', fs, myrecording)  # Save as WAV file 