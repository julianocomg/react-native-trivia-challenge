import * as React from "react"

export enum ESoundEffectsAction {
  SET_MUSIC_STATUS = "SET_MUSIC_STATUS",
  SET_EFFECTS_STATUS = "SET_EFFECTS_STATUS",
}

const INITIAL_STATE: ISoundEffectsContextState = {
  isMusicMuted: false,
  isEffectsMuted: false,
}

const SoundEffectsReducer = (
  state: ISoundEffectsContextState,
  action: TSoundEffectsAction,
): ISoundEffectsContextState => {
  switch (action.type) {
    case ESoundEffectsAction.SET_MUSIC_STATUS:
      return {
        ...state,
        isMusicMuted: action.isMuted,
      }

    case ESoundEffectsAction.SET_EFFECTS_STATUS:
      return {
        ...state,
        isEffectsMuted: action.isMuted,
      }

    default:
      return state
  }
}

export const SoundEffectsContext = React.createContext<TSoundEffectsContext>([
  INITIAL_STATE,
  () => {},
])

export const SoundEffectsContextProvider: React.FC = ({ children }) => (
  <SoundEffectsContext.Provider
    value={React.useReducer(SoundEffectsReducer, INITIAL_STATE)}>
    {children}
  </SoundEffectsContext.Provider>
)

interface ISoundEffectsContextState {
  isMusicMuted: boolean
  isEffectsMuted: boolean
}

type TSoundEffectsAction =
  | {
      type: ESoundEffectsAction.SET_MUSIC_STATUS
      isMuted: boolean
    }
  | {
      type: ESoundEffectsAction.SET_EFFECTS_STATUS
      isMuted: boolean
    }

type TSoundEffectsContext = [
  ISoundEffectsContextState,
  React.Dispatch<TSoundEffectsAction>,
]
