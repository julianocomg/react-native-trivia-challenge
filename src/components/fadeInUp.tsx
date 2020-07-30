import * as React from "react"
import * as Animatable from "react-native-animatable"
import { ViewProperties } from "react-native"

const ForwardableFadeInUp: React.RefForwardingComponent<{}, TFadeInUp> = (
  props,
  ref,
) => {
  return (
    <Animatable.View
      ref={ref as any}
      useNativeDriver={true}
      animation="fadeInUp"
      {...(props as ViewProperties)}
    />
  )
}

export const FadeInUp = React.forwardRef(ForwardableFadeInUp)

type TFadeInUp = ViewProperties & { children: React.ReactNode; delay: number }
