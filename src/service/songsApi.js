import axios from 'axios';

axios.defaults.baseURL = 'https://test-backend-avp.herokuapp.com';

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
    return response.data.rows;
  } catch (error) {
    console.log(error);
  }
};
