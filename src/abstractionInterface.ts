// idea
interface MediaPlayer {
  play(): void;
  pause(): void;
  stop(): void;
}

// কোন একটা ক্লাসকে এই interface দ্বারা implement করতে চাইলে ->
//! MusicPlayer Class টিকে ঐ MediaPlayer interface কে মানতে হবে । মানে  উল্লেখিত  মেথডকে follow করতে হবে।

//implementation
class MusicPlayer implements MediaPlayer {
  play() {
    console.log("Playing music....");
  }
  pause() {
    console.log("Music paused...");
  }
  stop() {
    console.log("Music stop....");
  }
}

// interface ব্যবহার করলে instance তৈরি করতে হবে ।
const WasfiaPalyer = new MusicPlayer();
WasfiaPalyer.play();
