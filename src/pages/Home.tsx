import React from 'react';
import Header from '../components/Header';
import MainWeather from '../components/MainWeather';
import LocationWeatherBlock from '../components/LocationWeatherBlock';
import styles from '../scss/App.module.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { fetchWeather, selectWeather } from '../redux/slices/weather';
const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchValue } = useSelector(selectWeather);

  const getWeather = async () => {
    dispatch(fetchWeather(searchValue));
  };

  React.useEffect(() => {
    getWeather();
  }, [searchValue]);

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <div className={styles.main_block}>
          <MainWeather />
          <LocationWeatherBlock />
        </div>
      </div>
    </div>
  );
};

export default Home;
