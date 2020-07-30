import * as React from "react"
import { LinearGradient } from "expo-linear-gradient"
import { Dimensions } from "react-native"

export const GradientBackground: React.FC = () => {
  return (
    <LinearGradient
      colors={["#0095ff", "#0898ff", "#4ab4ff", "#7ac8ff"]}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: Dimensions.get("screen").height,
      }}
    />
  )
}
