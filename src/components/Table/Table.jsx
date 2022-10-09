import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import s from '../Table/Table.module.css';
import { useEffect } from 'react';
import { getAllSongs } from 'service/songsApi';
import { useState } from 'react';

function createData(artist, song, genre, year) {
  return {
    artist,
    song,
    genre,
    year,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  {
    id: 'artist',
    numeric: false,
    disablePadding: true,
    label: 'Исполнитель',
  },
  {
    id: 'song',
    numeric: true,
    disablePadding: false,
    label: 'Песня',
  },
  {
    id: 'genre',
    numeric: true,
    disablePadding: false,
    label: 'Жанр',
  },
  {
    id: 'year',
    numeric: true,
    disablePadding: false,
    label: 'Год',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={s.tableHead}>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            sx={{ color: '#ffffff', textAlign: 'center', padding: '16px' }}
            className={s.tableHeadCell}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              className={s.tableSortLabel}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('song');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [artist, setArtist] = useState('all');
  const [genre, setGenre] = useState('all');
  const [year, setYear] = useState('all');
  const [allSongs, setAllSongs] = useState(null);
  const [rows, setRows] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [years, setYears] = useState([]);

  const getFilters = songs => {
    return {
      genres: Array.from(new Set(songs.map(song => song.genre))),
      artists: Array.from(new Set(songs.map(song => song.artist))),
      years: Array.from(new Set(songs.map(song => song.year))),
    };
  };

  useEffect(() => {
    getAllSongs(artist, genre, year)
      .then(data => {
        setAllSongs(data);
        const { artists, genres, years } = getFilters(data);
        setArtists(artists);
        setGenres(genres);
        setYears(years);
      })
      .catch(error => console.log(error));
  }, [artist, genre, year]);

  useEffect(() => {
    if (allSongs !== null) {
      setRows(
        allSongs.map(({ artist, song, genre, year }) => {
          return createData(artist, song, genre, year);
        })
      );
    }
  }, [allSongs]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeFilter = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case 'artist':
        setArtist(value);
        break;

      case 'genre':
        setGenre(value);
        break;

      case 'year':
        setYear(value);
        break;

      default:
        break;
    }
  };

  const resetFilter = () => {
    setArtist('all');
    setGenre('all');
    setYear('all');
  };

  const isSelected = artist => selected.indexOf(artist) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div className={s.tableSong}>
      <Box className={s.tableBox}>
        <Paper sx={{ backgroundColor: 'rgb(34, 120, 178)' }}>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableContainer sx={{ height: '530px' }}>
            <Table
              className={s.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <TableBody className={s.tableBody}>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.artist);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <>
                        {rows.length && (
                          <TableRow
                            className={s.tableRow}
                            hover
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.artist}
                            selected={isItemSelected}
                          >
                            <TableCell
                              sx={{ color: '#ffffff', padding: '16px' }}
                              className={s.tableCell}
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {row.artist}
                            </TableCell>
                            <TableCell
                              sx={{ color: '#ffffff', textAlign: 'start' }}
                              className={s.tableCell}
                              align="right"
                            >
                              {row.song}
                            </TableCell>
                            <TableCell
                              sx={{ color: '#ffffff', textAlign: 'start' }}
                              className={s.tableCell}
                              align="right"
                            >
                              {row.genre}
                            </TableCell>
                            <TableCell
                              sx={{ color: '#ffffff', textAlign: 'start' }}
                              className={s.tableCell}
                              align="right"
                            >
                              {row.year}
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{ color: '#ffffff' }}
            className={s.tablePagination}
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <div className={s.filter}>
        <p className={s.filtertText}>Фильтр</p>
        <form>
          <p className={s.filterNameSelect}>Исполнитель</p>
          <select
            className={s.select}
            name="artist"
            id="artist"
            onChange={handleChangeFilter}
            value={artist}
          >
            <option value="all">Все исполнители</option>
            {artists.map(artist => {
              return (
                <option value={artist} key={artist}>
                  {artist}
                </option>
              );
            })}
          </select>
          <p className={s.filterNameSelect}>Жанр</p>
          <select
            className={s.select}
            name="genre"
            id="genre"
            onChange={handleChangeFilter}
            value={genre}
          >
            <option value="all">Все жанры</option>
            {genres.map(genre => {
              return (
                <option value={genre} key={genre}>
                  {genre}
                </option>
              );
            })}
          </select>
          <p className={s.filterNameSelect}>Год</p>
          <select
            className={s.select}
            name="year"
            id="year"
            onChange={handleChangeFilter}
            value={year}
          >
            <option value="all">Все года</option>
            {years.map(year => {
              return (
                <option value={year} key={year}>
                  {year}
                </option>
              );
            })}
          </select>
          <button
            className={s.filterButton}
            type="button"
            onClick={resetFilter}
          >
            Очистить фильтр
          </button>
        </form>
      </div>
    </div>
  );
}
