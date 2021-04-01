import { Alert } from 'react-native';
import api from './api';

export async function getMovies(
  movieName,
  setMoviesList,
  pageNumber,
  setLoading,
) {
  try {
    setLoading(true);

    if (!movieName || movieName.length === 0 || movieName === '') {
      Alert.alert('Por favor, digite um filme válido.');
      throw new Error('[getMovies error], Nome do filme é inválido');
    }

    const apiKey = '28d0dee8';

    const response = await api.get(
      `/?s=${movieName}&apikey=${apiKey}&page=${pageNumber || 1}`,
    );

    if (response.data.Response === 'False') {
      Alert.alert('Filme não encontrado.');
      throw new Error('[getMovies error], Filme não encontrado.');
    }

    if (response.data.Response === 'True') {
      setMoviesList(response.data.Search);
    }

    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.error(error);
  }
}
