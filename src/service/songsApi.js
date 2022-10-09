import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

// export const getAllSongs = () => axios.get('/songs');

export const getAllSongs = async (
  artist = 'all',
  genre = 'all',
  year = 'all'
) => {
  try {
    const response = await axios({
      url: '/songs',
      params: { artist, genre, year },
    });
    return response.data.songs;
  } catch (error) {
    console.log(error);
  }
};

// export const getAllSongs = async (
//   artist = 'all',
//   genre = 'all',
//   year = 'all'
// ) =>
//   await axios({
//     url: '/songs',
//     params: { artist, genre, year },
//   });
