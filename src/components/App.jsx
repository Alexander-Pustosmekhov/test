import Container from './Container';
import EnhancedTable from './Table/Table';
import Header from './Header';
import Footer from './Footer';

export const App = () => {
  // const allSongs = getAllSongs()
  //   .then(data => console.log(data))
  //   .catch(error => console.log(error));
  // console.log(allSongs);
  return (
    <>
      <Header />
      <EnhancedTable />
      <Footer />
    </>
  );
  // <Table />
};
