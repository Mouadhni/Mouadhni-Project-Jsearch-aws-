import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export const unstable_settings = {
  initialRouteName: "signIn",
};

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack initialRouteName="signIn">
      <Stack.Screen name="signIn" />
      <Stack.Screen name="signUp" />
      <Stack.Screen name="home" />
    </Stack>
  );
};

export default Layout;
