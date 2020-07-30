import * as React from "react"
import { Audio } from "expo-av"
import {
  SoundEffectsContext,
  ESoundEffectsAction,
} from "../contexts/soundEffects"

export function useSoundEffects() {
  const [{ isMusicMuted, isEffectsMuted }, dispatch] = React.useContext(
    SoundEffectsContext,
  )

  function play(sfx: ESoundEffect) {
    const sound = SOUND_EFFECTS[sfx]
    sound.replayAsync()
  }

  function pause(sfx: ESoundEffect) {
    const sound = SOUND_EFFECTS[sfx]
    sound.pauseAsync()
  }

  function toggleMusic(isMuted: boolean) {
    SOUND_EFFECTS[ESoundEffect.MUSIC].setIsMutedAsync(isMuted)

    dispatch({
      type: ESoundEffectsAction.SET_MUSIC_STATUS,
      isMuted,
    })
  }

  function toggleEffects(isMuted: boolean) {
    Object.keys(ESoundEffect).forEach(sfx => {
      if (sfx !== ESoundEffect.MUSIC) {
        SOUND_EFFECTS[sfx as ESoundEffect].setIsMutedAsync(isMuted)
      }
    })

    if (!isMuted) {
      play(ESoundEffect.BUTTON_PRESS)
    }

    dispatch({
      type: ESoundEffectsAction.SET_EFFECTS_STATUS,
      isMuted,
    })
  }

  return {
    play,
    pause,
    toggleMusic,
    toggleEffects,
    isMusicMuted,
    isEffectsMuted,
  }
}

export enum ESoundEffect {
  MUSIC = "MUSIC",
  BUTTON_PRESS = "BUTTON_PRESS",
  WON = "WON",
  LOSE = "LOSE",
}

const SOUND_EFFECTS = {
  [ESoundEffect.MUSIC]: new Audio.Sound(),
  [ESoundEffect.BUTTON_PRESS]: new Audio.Sound(),
  [ESoundEffect.WON]: new Audio.Sound(),
  [ESoundEffect.LOSE]: new Audio.Sound(),
}

function loadSounds() {
  Audio.setAudioModeAsync({
    playsInSilentModeIOS: false,
    allowsRecordingIOS: false,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
  })

  SOUND_EFFECTS[ESoundEffect.MUSIC]
    .loadAsync(require("../../assets/sfx/music.mp3"))
    .then(() => {
      SOUND_EFFECTS[ESoundEffect.MUSIC].setIsLoopingAsync(true)
      SOUND_EFFECTS[ESoundEffect.MUSIC].playAsync()
      SOUND_EFFECTS[ESoundEffect.MUSIC].setVolumeAsync(0.7)
    })

  SOUND_EFFECTS[ESoundEffect.BUTTON_PRESS].loadAsync(
    require("../../assets/sfx/button_press.mp3"),
  )

  SOUND_EFFECTS[ESoundEffect.WON].loadAsync(require("../../assets/sfx/won.mp3"))

  SOUND_EFFECTS[ESoundEffect.LOSE].loadAsync(
    require("../../assets/sfx/lose.mp3"),
  )
}

loadSounds()
