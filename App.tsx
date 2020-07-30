import "react-native-gesture-handler"
import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { useFonts } from "expo-font"

import { AppProviders } from "./src/contexts/providers"
import { getTheme } from "./src/theme"
import { EScreen } from "./src/screens"
import { HomeScreen } from "./src/screens/home"
import { QuizScreen } from "./src/screens/quiz"
import { ResultsScreen } from "./src/screens/results"

const Stack = createStackNavigator()

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Times: require("./assets/fonts/Times.ttf"),
    Caramel: require("./assets/fonts/Caramel.otf"),
    Chela: require("./assets/fonts/Chela.ttf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <AppProviders>
      <NavigationContainer>
        <Stack.Navigator
          headerMode="none"
          initialRouteName={EScreen.HOME}
          screenOptions={{
            cardStyle: { backgroundColor: getTheme().screenBackgroundColor },
          }}>
          <Stack.Screen name={EScreen.HOME} component={HomeScreen} />
          <Stack.Screen name={EScreen.QUIZ} component={QuizScreen} />
          <Stack.Screen name={EScreen.RESULTS} component={ResultsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProviders>
  )
}

export default App
