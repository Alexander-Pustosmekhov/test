import Container from './Container';
import Table from './Table';
import EnhancedTable from './Table/TableMUI';
import { getAllSongs } from 'service/songsApi';
import Footer from './Footer';

export const App = () => {
  // const allSongs = getAllSongs()
  //   .then(data => console.log(data))
  //   .catch(error => console.log(error));
  // console.log(allSongs);
  return (
    <>
      <EnhancedTable />
      {/* <Footer /> */}
    </>
  );
  // <Table />
};
