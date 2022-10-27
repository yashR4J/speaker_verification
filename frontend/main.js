// https://www.geeksforgeeks.org/how-to-record-and-play-audio-in-javascript/
let audioIN = { audio: true };
//  audio is true, for recording



let phrases = ["She sells sea shells by the sea shore.", "Hello, it is nice to meet you.", "I regret nothing"];
let phraseIndex = 0;

function nextPhrase ()  {
    document.getElementById('next_button').classList.add('inactive');
    document.getElementById('next_button').disabled = true;
    document.getElementById('audioPlay').src = "";
    console.log(phraseIndex);
    if(phraseIndex == phrases.length) {
        document.getElementById("recordbox").classList.add("hide");
        document.getElementById("newUser").classList.remove("hide");
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


    })

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

      // Pass the audio url to the 2nd video tag
      playAudio.src = audioSrc;
      console.log("yyasbdua");
    }
  })
  // If any error occurs then handles the error
  .catch(function (err) {
    console.log(err.name, err.message);
  });

  document.getElementById("register-new-user").addEventListener("click", () => {
    phraseIndex = 0;
    document.getElementById("recordbox").classList.remove("hide");
    document.getElementById("verifybox").classList.add("hide");
    nextPhrase();
    
  })

  document.getElementById("backToMenu").addEventListener("click", () => {
    document.getElementById("verifybox").classList.remove("hide");
    document.getElementById("newUser").classList.add("hide");
    
  });

  document.getElementById("next_button").addEventListener("click", () => {
    nextPhrase();
});