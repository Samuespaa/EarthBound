import { Howl } from "howler";

export const MUSICS = {
  titleScreen: new Howl({src: '../../assets/musics/title-screen.mp3'}),
  chooseAFile: new Howl({
    src: '../../assets/musics/choose-a-file.mp3',
    sprite: {
      start: [0, 20461],
      repeat: [20462, 40804, true]
    }
  }),
  nowLetsGo: new Howl({src: '../../assets/musics/now-lets-go.mp3'}),
  yourNamePlease: new Howl({
    src: '../../assets/musics/your-name-please.mp3',
    loop: true
  }),
  aFlashOfMemory: new Howl({src: '../../assets/musics/a-flash-of-memory.mp3'}),
  homeSweetHome: new Howl({
    src: '../../assets/musics/home-sweet-home.mp3',
    sprite: {
      start: [0, 11735],
      repeat: [11736, 58022, true]
    }
  })
}