import React, { useState } from 'react';
import {
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { getMovies } from '../services/getMovies';

const MoviesList = () => {
  const [movieName, setMovieName] = useState('');
  const [moviesList, setMoviesList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function incrementPageNumber() {
    getMovies(movieName, setMoviesList, pageNumber + 1, setLoading);

    setPageNumber(pageNumber + 1);
  }

  function navigateToMovieDetails(poster, title, year) {
    navigation.navigate('MovieDetails', { poster, title, year });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputSearch}
          placeholder="Digite o nome do filme:"
          placeholderTextColor="#aaa"
          onChangeText={text => setMovieName(text)}
        />

        <TextInput
          style={styles.textInputSearch}
          placeholder="Digite o número da página:"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          onChangeText={text => setPageNumber(Number(text))}
        />

        {loading ? (
          <ActivityIndicator size="small" color="#111" />
        ) : moviesList.length > 0 ? (
          <>
            <FlatList
              keyboardShouldPersistTaps="handled"
              style={styles.flatList}
              data={moviesList}
              keyExtractor={item => item.imdbID}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigateToMovieDetails(item.Poster, item.Title, item.Year)
                  }
                  style={styles.buttonItem}>
                  <Text style={styles.buttonTitle}>{item.Title}</Text>
                  <Icon name="arrow-right" size={20} color="#42b0f8" />
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={incrementPageNumber}>
              <Text style={styles.buttonText}>Carregar mais</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              getMovies(movieName, setMoviesList, pageNumber, setLoading)
            }>
            <Text style={styles.buttonText}>Buscar filmes</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: '20%',
    paddingHorizontal: '5%',
  },

  flatList: {
    marginTop: 10,
    marginBottom: 10,
  },

  buttonItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginHorizontal: 10,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#312e38',
    borderRadius: 8,
    marginTop: 5,
  },

  buttonTitle: {
    color: '#f4ede8',
  },

  textInputSearch: {
    backgroundColor: '#ccc',
    padding: 15,
    marginHorizontal: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
    marginTop: 5,
  },

  button: {
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 10,
    backgroundColor: '#42b0f8',
  },

  buttonText: {
    color: '#f4ede8',
    fontSize: 16,
  },
});

export default MoviesList;
