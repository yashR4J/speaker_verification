// import  '/node_modules/downloadjs/download.js';

// https://www.geeksforgeeks.org/how-to-record-and-play-audio-in-javascript/
let audioIN = { audio: true };
//  audio is true, for recording



let phraseIndex = 0;

let recording = null;

function addSample (recording) {
  let data = new FormData();
  data.append('file', new File([recording] , recordingsCount +'.wav'));

  let post = data;
 
  const url = "http://localhost:5050/addSample"
  let xhr = new XMLHttpRequest()
  
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Authorization',  token);
  xhr.send(post);
  
  xhr.onload = function () {
      if(xhr.status === 201) {
          console.log("Post successfully created!") 
      }
  }

}


function registerUser () {
  const options = {
    method: 'POST',
    mode: 'cors', // no-cors, *cors, same-origin
    headers : {
      'Authorization': token,
    }
  };
  fetch("http://localhost:5050/register", options).then((response) => {
    return response.json();
  }).then((data) => {
    if (data.error) {
      error(data.error);
    }
    else {
      recordingsCount = data["count"];
      document.getElementById("recordingCount").innerText = recordingsCount;
      document.getElementById("start_recording").classList.remove('hide');
      document.getElementById("stop_recording").classList.add('hide');
      document.getElementById('next_button').classList.add('inactive');
      document.getElementById('next_button').disabled = true;
      document.getElementById('audioPlay').src = "";
      document.getElementById("recordingCount").innerText = recordingsCount;
      document.getElementById("currPhrase").innerText = '"' + phrases[recordingsCount] + '"';
      if (recordingsCount >= 10) {
        document.getElementById("submit_training").classList.remove('inactive');
        document.getElementById("submit_training").disabled = false;
      }
      else {
        document.getElementById("submit_training").classList.add('inactive');
        document.getElementById("submit_training").disabled = true;
      }
      
    }
  });
}


function verify (audio) {
  

  let data = new FormData();
  data.append('file', new File([audio] , 'testAudio.wav'));

  const options = {
    method: 'POST',
    mode: 'cors', // no-cors, *cors, same-origin
    body:data, 
    headers : {
      'Authorization': user,
    }
  };  
  // document.getElementById('start_recordingv').classList.remove('hide');
  document.getElementById('stop_recordingv').classList.add('hide');
  document.getElementById('spinner').classList.remove('hide');

  
  fetch("http://localhost:5050/verify", options).then((response) => {
    return response.json();
  }).then((data) => {
    if (data.error) {
      error(data.error);
    }
    else {
      console.log(data.result)
      setTimeout(()=> {
        document.getElementById("verifybox").classList.add("hide");
        document.getElementById("welcome").classList.remove("hide");
        
        if (data.result === 'true') {
          
          console.log("Accepted");
          document.getElementById("welcomeMsg").innerText = "Welcome Damian. It is nice to see you. I hope you are doing well"
          document.getElementById("face").src = "smiley.png";
          read("Welcome Damian. It is nice to see you. I hope you are doing well") 


        }
        else {
          console.log("Denied");
          document.getElementById("welcomeMsg").innerText = "Vanet doesn't not know you"
          document.getElementById("face").src = "frowny.png";

          read("I do not know you")
        }
      },6000);
      
    }
  });
}


function train () {
    const options = {
    method: 'POST',
    // mode: 'cors', // no-cors, *cors, same-origin
    headers : {
      'Authorization': token,
      // "Content-Type": data.contentType,
    }
    // files: recording,
  };
  fetch("http://localhost:5050/train", options).then((data) => {
    if (data.error) {
      error(data.error);
    }
  });
}

document.getElementById("submit_training").addEventListener('click',()=> {
  train()
})

const download = async(blob, filename) => {
  let link = document.createElement('a');
  link.download = filename;
 
  // let url = URL.createObjectURL();
  link.href = blob;

  await link.click();
 
  await URL.revokeObjectURL(link.href);
}

function inputHandler(){
  if (document.getElementById('userName').value == '') {
    document.getElementById('select_name').classList.add('inactive');
    document.getElementById('select_name').disabled = true;
  } 
  else {
    document.getElementById('select_name').classList.remove('inactive');
    document.getElementById('select_name').disabled = false;
  }
  
}

document.getElementById('select_name').disabled = true;

let userNameButt = document.getElementById('userName');
userNameButt.addEventListener('input', inputHandler);
userNameButt.addEventListener('propertychange', inputHandler);

let h = `Hello Vanet, how are you today?
I will be back shortly, I've just got to pop to the shops.
No more mr nice guy.
We've got to get it together.
You've got to be in the top 5 most beautiful people I've ever seen.
Never gonna give you up, never gonna let you down.
I wouldn't have let anything come between us.
You wouldn't have done that if there had not been something.
He's afraid of being seen, being found.
Her maid was standing by the garden gate, looking for her.
She had done all that was possible.
It was the seal upon the bond.
The odds between her and her adversary were even.
She would have to break her word to Milly.
She had a light burning in her room till morning, for she was afraid of sleep.
Her gift, her secret, was powerless now against the pursuer.
A terrified bird flew out of the hedge, no further than a flight in front of her.
All this she perceived in a flash, when she had turned the corner.
As she turned the corner of the wood, she was brought suddenly in sight of the valley.
Now her fear, which had become almost hatred, was transferred to his person.
What she saw was the empty shell of him.
She went on and came to the gate of the wood.
She paused on the bridge, and looked down the valley.
It was perfect, following a perfect day.
She waited for her hour between sunset and twilight.
She told herself that, after all, her fear had done no harm.
She was bound to accept his statement.
She doesn't care a rap about me.
They had sat down on the couch in the corner so that they faced each other.
She begged him to write and tell her that he was well.
She refused to hold him even by a thread.
Hey Jane, did you get the mail yet?	
He was absent at roll call.	
She was hit by a car.
Tom isn't watching TV now.`

var phrases = h.split("\n");


function nextPhrase ()  {
  document.getElementById("start_recording").classList.remove('hide');
  document.getElementById("stop_recording").classList.add('hide');
  document.getElementById('next_button').classList.add('inactive');
  document.getElementById('next_button').disabled = true;
  document.getElementById('audioPlay').src = "";
  // console.log(phraseIndex);
  // console.log(token);
  // console.log(recordings);
  recordingsCount++;

  document.getElementById("recordingCount").innerText = recordingsCount;
  document.getElementById("currPhrase").innerText = '"' + phrases[recordingsCount] + '"';

  if(recordingsCount >= 10) {
    document.getElementById("submit_training").classList.remove('inactive');
    document.getElementById("submit_training").disabled = false;
  }

}


// Access the permission for use
// the microphone
navigator.mediaDevices.getUserMedia(audioIN)
// 'then()' method returns a Promise
.then(function (mediaStreamObj) {
  //For Verification


  // For recording segments

  // 2nd audio tag for play the audio
  let playAudio = document.getElementById('audioPlay');

  // This is the main thing to recorded
  // the audio 'MediaRecorder' API
  let mediaRecorder = new MediaRecorder(mediaStreamObj);
  // Pass the audio stream

  // Start event

  document.getElementById("start_recording").addEventListener('click', () => {
      document.getElementById('stop_recording').classList.remove('hide');
      document.getElementById('start_recording').classList.add('hide');
      mediaRecorder.start();
  });
  
  document.getElementById("stop_recording").addEventListener('click', () => {
      document.getElementById('start_recording').classList.remove('hide');
      document.getElementById('stop_recording').classList.add('hide');
      document.getElementById('next_button').classList.remove('inactive');
      document.getElementById('next_button').disabled = false;
      mediaRecorder.stop();
  });


  document.getElementById("start_recordingv").addEventListener('click', () => {
    console.log("AYYYYYYYLMAO");
    document.getElementById('stop_recordingv').classList.remove('hide');
    document.getElementById('start_recordingv').classList.add('hide');
    mediaRecorder.start();
  });
  
  document.getElementById("stop_recordingv").addEventListener('click', () => {
    mediaRecorder.stop();
  });

  // If audio data available then push
  // it to the chunk array
  mediaRecorder.ondataavailable = function (ev) {
    dataArray.push(ev.data);
  }

  // Chunk array to store the audio data
  let dataArray = [];

  // Convert the audio data in to blob
  // after stopping the recording
  mediaRecorder.onstop = function (ev) {
    // blob of type mp3
    let audioData = new Blob(dataArray,
              { 'type': 'audio/wav; codecs=MS_PCM' });
      
    // After fill up the chunk
    // array make it empty
    dataArray = [];

    // Creating audio url with reference
    // of created blob named 'audioData'
    let audioSrc = window.URL.createObjectURL(audioData);

    if (document.getElementById("verifybox").classList.contains("hide")) {
      recording =audioData;
      // recordings.push(audioSrc);
      // recordings.push(new File([audioSrc], recordings.length + ".wav"));
    }
    else {
      verify(audioData);
    }
  
      // Pass the audio url to the 2nd video tag
      playAudio.src = audioSrc;
    }
  })
  // If any error occurs then handles the error
  .catch(function (err) {
    console.log(err.name, err.message);
  });



function getVoices() {
  let voices = speechSynthesis.getVoices();
  if(!voices.length){
    // some time the voice will not be initialized so we can call spaek with empty string
    // this will initialize the voices 
    let utterance = new SpeechSynthesisUtterance("");
    speechSynthesis.speak(utterance);
    voices = speechSynthesis.getVoices();
  }
  return voices;
}


function speak(text, voice, rate, pitch, volume) {
  // create a SpeechSynthesisUtterance to configure the how text to be spoken 
  let speakData = new SpeechSynthesisUtterance();
  speakData.volume = volume; // From 0 to 1
  speakData.rate = rate; // From 0.1 to 10
  speakData.pitch = pitch; // From 0 to 2
  speakData.text = text;
  speakData.lang = 'de';
  speakData.voice = voice;
  
  // pass the SpeechSynthesisUtterance to speechSynthesis.speak to start speaking 
  speechSynthesis.speak(speakData);

}

let voices = getVoices();
let rate = 1, pitch = 1.3, volume = 1;
let text = "Spaecking with volume = 1 rate =1 pitch =2 ";

if ('speechSynthesis' in window) {
  read("Welcome. My name is Vanet. Verify your voice to sign in.")
}else{
  console.log(' Speech Synthesis Not Supported 😞'); 
}


function read (text) {
  setTimeout(()=>{ // speak after 2 seconds 
    // rate = 1; pitch = 1, volume = 0.5;
    speak(text, voices[1], rate, pitch, volume );
  }, 1000);
}

 
let token = null;

document.getElementById("register-new-user").addEventListener("click", () => {
  phraseIndex = 0;
  document.getElementById("selectNameBox").classList.remove("hide");
  document.getElementById("verifybox").classList.add("hide");
  
})

let recordingsCount = 0;

document.getElementById("select_name").addEventListener("click", (event) => {
  token = document.getElementById("userName").value;
  console.log(token);
  
  document.getElementById("recordbox").classList.remove("hide");
  document.getElementById("selectNameBox").classList.add("hide");
  registerUser();

})

document.getElementById("backToMenu").addEventListener("click", () => {
  document.getElementById("verifybox").classList.remove("hide");
  document.getElementById("newUser").classList.add("hide");
  
});

document.getElementById("next_button").addEventListener("click", (e) => {
  addSample(recording);
  nextPhrase();
  // e.preventDefault()
});

