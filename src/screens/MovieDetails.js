import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import { useRoute } from '@react-navigation/native';

export default function MovieDetails() {
  const route = useRoute();

  return (
    <View style={styles.container}>
      <Image source={{ uri: route.params.poster }} style={styles.posterImage} />
      <Text style={{ fontSize: 16 }}>
        Titulo: <Text style={styles.title}>{route.params.title}</Text>
      </Text>
      <Text style={{ fontSize: 16 }}>
        Ano: <Text style={styles.year}>{route.params.year}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: '10%',
    alignItems: 'center',
  },

  posterImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
    marginBottom: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  year: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
