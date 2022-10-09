import { useState } from 'react';
import s from './Table.module.css';

export default function Table() {
  const [artist, setArtist] = useState('All');
  const [genre, setGenre] = useState('All');
  const [year, setEar] = useState('All');

  return (
    <div className={s.Table}>
      <div className={s.playlist}>
        <p>Плейлист</p>
        <table className={s.tablePlaylist}>
          <tr>
            <th className={s.tableColumn}>Исполнитель</th>
            <th className={s.tableColumn}>Песня</th>
            <th className={s.tableColumn}>Жанр</th>
            <th className={s.tableColumn}>Год</th>
          </tr>
          <tr>
            <td className={s.tableColumn}>The Kingstone Trio</td>
            <td className={s.tableColumn}>Tom Dooley</td>
            <td className={s.tableColumn}>Folk</td>
            <td className={s.tableColumn}>1958</td>
          </tr>
          <tr>
            <td className={s.tableColumn}>Led Zeppelin</td>
            <td className={s.tableColumn}>Kashmir</td>
            <td className={s.tableColumn}>Rock</td>
            <td className={s.tableColumn}>1975</td>
          </tr>
          <tr>
            <td className={s.tableColumn}>Miles Davis</td>
            <td className={s.tableColumn}>Blue in Green</td>
            <td className={s.tableColumn}>Jazz</td>
            <td className={s.tableColumn}>1959</td>
          </tr>
          <tr>
            <td className={s.tableColumn}>Muddy Waters</td>
            <td className={s.tableColumn}>Mannish Boy</td>
            <td className={s.tableColumn}>Blues</td>
            <td className={s.tableColumn}>1955</td>
          </tr>
        </table>
        <div className={s.playList__control}>
          <div className={s.pagination}>
            <button className={s.btnChangePage} type="button">
              &#60;
              <svg>
                <use></use>
              </svg>
            </button>
            <ul className={s.pageNumberList}>
              <li className={s.pageNumber}>
                <button className={s.pageBtn} type="button">
                  1
                </button>
              </li>
              <li className={s.pageNumber}>
                <button className={s.pageBtn} type="button">
                  2
                </button>
              </li>
              <li className={s.pageNumber}>
                <button className={s.pageBtn} type="button">
                  3
                </button>
              </li>
              <li className={s.pageNumber}>
                <button className={s.pageBtn} type="button">
                  4
                </button>
              </li>
            </ul>
            <button className={s.btnChangePage} type="button">
              &#62;
              <svg>
                <use></use>
              </svg>
            </button>
          </div>
          <ul className={s.amountTracksList}>
            <li>
              <button type="button">10</button>
            </li>
            <li>
              <button type="button">25</button>
            </li>
            <li>
              <button type="button">50</button>
            </li>
            <li>
              <button type="button">100</button>
            </li>
          </ul>
        </div>
      </div>
      <div className={s.filter}>
        <p>Фильтр</p>
        <form>
          <p>Исполнитель</p>
          <select className={s.select} name="artist" id="artist"></select>
          <p>Жанр</p>
          <select className={s.select} name="genre" id="genre">
            <option value="all">All genres</option>
            <option value="folk">Folk</option>
            <option value="rock">Rock</option>
            <option value="jazz">Jazz</option>
            <option value="blues">Blues</option>
          </select>
          <p>Год</p>
          <select className={s.select} name="year" id="year"></select>
        </form>
      </div>
    </div>
  );
}
