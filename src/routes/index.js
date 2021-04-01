import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MoviesList from '../screens/MoviesList';
import MovieDetails from '../screens/MovieDetails';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MoviesList" component={MoviesList} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
    </Stack.Navigator>
  );
}
