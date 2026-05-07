// Abstraction with Abstract

// idea <---- যাকে follow করতে হবে ।
abstract class MediaPlayer {
  abstract play(): void;
  abstract pause(): void;
  abstract stop(): void;
}

// abstract class ব্যবহার করলে -->  Parent Class থেকে Child Class তৈরি করে কাজ করতে হবে । instance তৈরি করলে কাজ হবে না।

class MehnazPlayer extends MediaPlayer {
  play() {
    console.log("Playing....");
  }
  pause() {
    console.log("Paused music....");
  }
  stop() {
    console.log("Stop music....");
  }
}

console.log(MehnazPlayer);

const x = new MehnazPlayer();
console.log(x);
x.play();
