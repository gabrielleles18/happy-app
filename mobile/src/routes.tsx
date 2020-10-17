import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

const {Navigator, Screen} = createStackNavigator();

import OrphanagesDetails from "./pages/OrphanagesDetails";
import Orphanage from './pages/OrphanagesMap';

export default function Router() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false}}>
                <Screen
                    name="OrphanageMap"
                    component={Orphanage}
                />

                <Screen
                    name="OrphanagesDetails"
                    component={OrphanagesDetails}
                />
            </Navigator>
        </NavigationContainer>
    )
}
