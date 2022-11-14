import matplotlib
matplotlib.use('WebAgg')
import matplotlib.pyplot as plt 
import re

with open("speaker_verif/results/speaker_id/1986/train_log.txt", "r+") as LOG_FILE:
    logs = LOG_FILE.readlines()
    
ckpt1 = []
idx = None
for x in range(len(logs)):
    ckpt1.append(logs[x])
    if not logs[x].startswith('Epoch:'):
        idx = x + 1
        break;    
if idx is not None: ckpt2 = logs[idx:-1]

def ckpt_metrics(ckpt):
    ckpt_metrics = [[], []]
    for x in ckpt:
        field = 'train loss'
        m = re.search(fr'{field}: .*? ', x)
        tl = None
        if m:
            tl = float(m.group(0)[len(field)+2:-1])
        
        field = 'valid loss'
        m = re.search(fr'{field}: .*?,', x)
        vl = None
        if m:
            vl = float(m.group(0)[len(field)+2:-1])
            
        if tl and vl:   
            ckpt_metrics[0].append(tl)
            ckpt_metrics[1].append(vl)
    return ckpt_metrics

def plot(training_loss, validation_loss):
    plt.plot(range(1,len(training_loss)+1), training_loss, 'g', label='Training loss')
    plt.plot(range(1,len(validation_loss)+1), validation_loss, 'b', label='validation loss')
    plt.title('Training and Validation loss')
    plt.xlabel('Epochs')
    plt.ylabel('Loss')
    plt.legend()
    plt.show()
    
# ckpt1_metrics = ckpt_metrics(ckpt1)
ckpt2_metrics = ckpt_metrics(ckpt2)
        
# plot(ckpt1_metrics[0], ckpt1_metrics[1])
plot(ckpt2_metrics[0], ckpt2_metrics[1])
