import { Howl } from "howler";

export const SOUNDS = {
  accept: new Howl({src: '../../assets/sounds/accept.wav'}),
  back: new Howl({src: '../../assets/sounds/back.wav'}),
  cursorVertical: new Howl({src: '../../../assets/sounds/cursor-vertical.wav'}),
  deleteLetter: new Howl({src: '../../../assets/sounds/delete-letter.mp3'}),
  insertLetter: new Howl({src: '../../../assets/sounds/insert-letter.mp3'}),
  okdesuka: new Howl({src: '../../../assets/sounds/okdesuka.wav'}),
  text: new Howl({src: '../../../assets/sounds/text.mp3', loop: true}),
  window: new Howl({src: '../../../assets/sounds/window.wav'})
}