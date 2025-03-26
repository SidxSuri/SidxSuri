// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxEbW9TRG4SrjPyoOmsgezjvq0HkADj04",
  authDomain: "siddy-sounds.firebaseapp.com",
  projectId: "siddy-sounds",
  storageBucket: "siddy-sounds.firebasestorage.app",
  messagingSenderId: "710437474568",
  appId: "1:710437474568:web:35d3af84205338b933dcbd",
  measurementId: "G-NSP8CP2Q7Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to get launch time from Firestore
async function getLaunchTime() {
  const docRef = doc(db, "launch", "countdown");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return new Date(docSnap.data().launchTime);
  } else {
    console.log("No launch time found!");
    return null;
  }
}

// Function to start the countdown
async function startCountdown() {
  const launchTime = await getLaunchTime();
  if (!launchTime) return;

  function updateTimer() {
    const now = new Date().getTime();
    const timeLeft = launchTime - now;

    if (timeLeft < 0) {
      document.getElementById("timer").innerHTML = "Launched!";
      clearInterval(interval);
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s left`;
  }

  updateTimer();
  const interval = setInterval(updateTimer, 1000);
}

// Start the countdown when the page loads
startCountdown();