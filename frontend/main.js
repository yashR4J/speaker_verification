// import  '/node_modules/downloadjs/download.js';

// https://www.geeksforgeeks.org/how-to-record-and-play-audio-in-javascript/
let audioIN = { audio: true };
//  audio is true, for recording



let phrases = ["Hello Vanet, how are you today", "I will be back shortly, I've just got to pop to the shops.", "No more mr nice guy"];
// "We've got to get it together", "You've got to be in the top 5 most beautiful people I've ever seen", "Never gonna give you up, never gonna let you down"];
let phraseIndex = 0;

let recordings = [];

function train () {
  let data = new FormData();
  data.append('file', new File([recordings[0]], recordings.length + ".wav"))
  const options = {
    method: 'POST',
    mode: 'cors', // no-cors, *cors, same-origin
    headers : {
      'Authorization': token,
    },
    body: data
  };
  fetch("http://localhost:5050/train", options).then((data) => {
    if (data.error) {
      error(data.error);
    }
  });
}

function registerUser () {
  console.log(token)
  const options = {
    method: 'POST',
    mode: 'cors', // no-cors, *cors, same-origin
    headers : {
      'Authorization': token,
    }
  };
  const controller = new AbortController()

  // 5 second timeout:

  // const timeoutId = setTimeout(() => controller.abort(), 5000)

  fetch("http://localhost:5050/register", options).then((data) => {
    if (data.error) {
      error(data.error);
    }
  });
}


const download = async(blob, filename) => {
  let link = document.createElement('a');
  link.download = filename;
 
  // let url = URL.createObjectURL();
  link.href = blob;

  await link.click();
 
  await URL.revokeObjectURL(link.href);
}

function inputHandler(){
  console.log("kjansdknasjkdn")
  if (document.getElementById('userName').value == '') {
    document.getElementById('select_name').classList.add('inactive');
    console.log("kjansdknasjkdn")
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


function nextPhrase ()  {
  document.getElementById("start_recording").classList.remove('hide');
  document.getElementById("stop_recording").classList.add('hide');
  document.getElementById('next_button').classList.add('inactive');
  document.getElementById('next_button').disabled = true;
  document.getElementById('audioPlay').src = "";
  console.log(phraseIndex);
  console.log(token);
  console.log(recordings);
  
  if(phraseIndex == phrases.length) {
      document.getElementById("recordbox").classList.add("hide");
      document.getElementById("newUser").classList.remove("hide");
      // for (var i=0; i< recordings.length; i++) {
      //   console.log("ppppas");
      //   console.log(recordings[i]);
        // (recordings[i],'/newfile/recording' +i +".wav");
      // }
      train();

  }
  else {
      document.getElementById("currPhrase").innerText = '"' + phrases[phraseIndex] + '"';
      phraseIndex++;
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
      
      // document.getElementById('next_button').classList.remove('inactive');
      // document.getElementById('next_button').disabled = false;
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

      console.log("yyasbdua");
      // blob of type mp3
      let audioData = new Blob(dataArray,
                { 'type': 'audio/wav; codecs=MS_PCM' });
       
      // After fill up the chunk
      // array make it empty
      dataArray = [];

      // Creating audio url with reference
      // of created blob named 'audioData'
      let audioSrc = window.URL
          .createObjectURL(audioData);

      if (document.getElementById("verifybox").classList.contains("hide")) {
        recordings.push(audioData);
        // recordings.push(audioSrc);
        // recordings.push(new File([audioSrc], recordings.length + ".wav"));
      }
      else {
        console.log("Otto accepts");
        document.getElementById("verifybox").classList.add("hide");
        document.getElementById("welcome").classList.remove("hide");
        document.getElementById('start_recordingv').classList.remove('hide');
        document.getElementById('stop_recordingv').classList.add('hide');
        read("Welcome Master Damian. It is nice to see you. You look very handsome today <3") 
      }
      // Pass the audio url to the 2nd video tag
      playAudio.src = audioSrc;
    }
  })
  // If any error occurs then handles the error
  .catch(function (err) {
    console.log(err.name, err.message);
  });

/*

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
  read("Welcome. My name is Vanet. Say Hello Vanet to sign in.")
  setTimeout(()=> {
    document.getElementById("start_recordingv").click();
  },6000)
  setTimeout(()=> {
    document.getElementById("stop_recordingv").click();
  },8500);
}else{
  console.log(' Speech Synthesis Not Supported 😞'); 
}


function read (text) {
  setTimeout(()=>{ // speak after 2 seconds 
    // rate = 1; pitch = 1, volume = 0.5;
    speak(text, voices[1], rate, pitch, volume );
  }, 1000);
}

 */
let token = null;

document.getElementById("register-new-user").addEventListener("click", () => {
  phraseIndex = 0;
  document.getElementById("selectNameBox").classList.remove("hide");
  document.getElementById("verifybox").classList.add("hide");
  
})

document.getElementById("select_name").addEventListener("click", () => {
  token = document.getElementById("userName").value;
  console.log(token);
  registerUser();
  nextPhrase();
  document.getElementById("recordbox").classList.remove("hide");
  document.getElementById("selectNameBox").classList.add("hide");
  
})

document.getElementById("backToMenu").addEventListener("click", () => {
  document.getElementById("verifybox").classList.remove("hide");
  document.getElementById("newUser").classList.add("hide");
  
});

document.getElementById("next_button").addEventListener("click", () => {
  nextPhrase();
});

