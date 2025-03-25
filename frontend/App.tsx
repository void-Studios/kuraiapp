import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingPage from "./LandingPage";
import EventCardForm from "./EventCardForm";


const Stack = createNativeStackNavigator();

const KuraiApp = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{title='Landing'
          }}
          >
            
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default KuraiApp