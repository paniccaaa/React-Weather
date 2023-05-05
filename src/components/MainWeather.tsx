import React from 'react';
import { useSelector } from 'react-redux';
import { selectWeather } from '../redux/slices/weather';

import { icons } from '../utils/icons';
import convertDate from '../utils/convertDate';
import styles from '../scss/components/mainWeather.module.scss';
const MainWeather: React.FC = () => {
  const { weather, status } = useSelector(selectWeather);
  const { location, current, forecast } = weather;

  const arrayDays = forecast.forecastday[0];

  const skyInfo = current.condition.text;
  const icon = icons[skyInfo];

  const { dayOfWeek, month, day, time_with, year, time_without } = convertDate(location.localtime);
  const styled = time_without >= 22 || time_without < 6 ? 'night' : '';

  return (
    <div className={`${styles.main_div} ${styles[styled]}`}>
    {status === 'success' && (<>
      <h2 className={styles.day}>{`${time_with} ${dayOfWeek}`}</h2>
      <h3 className={styles.day_date}>{`${day} ${month} ${year}`}</h3>
      <div className={styles.country}>
        <svg
          className={styles.icon}
          enableBackground="new 0 0 48 48"
          height="48px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 48 48"
          width="48px"
          fill="white"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink">
          <path
            clipRule="evenodd"
            d="M24,47c0,0-18-9.417-18-28C6,9.059,14.059,1,24,1s18,8.059,18,18  C42,37.583,24,47,24,47z M24,3C15.178,3,8,10.178,8,19c0,14.758,12.462,23.501,16.003,25.687C27.547,42.51,40,33.805,40,19  C40,10.178,32.822,3,24,3z M24,28c-4.971,0-9-4.029-9-9s4.029-9,9-9s9,4.029,9,9S28.971,28,24,28z M24,12c-3.866,0-7,3.134-7,7  s3.134,7,7,7s7-3.134,7-7S27.866,12,24,12z"
            fillRule="evenodd"
          />
        </svg>
        <p className={styles.country_city}>{`${location.name}, ${location.country}`}</p>
      </div>
      <div className={styles.forecast_now}>
        <img className={styles.forecast_now_icon} src={icon} alt={skyInfo} />
        <h2 className={styles.forecast_now_text}>{skyInfo}</h2>
        <h1 className={styles.forecast_now_text}>{`feels like - ${current.feelslike_c} °C`}</h1>
        <h1 className={styles.forecast_now_text}>{`max - ${arrayDays.day.maxtemp_c} °C`}</h1>
        <h1 className={styles.forecast_now_text}>{`min - ${arrayDays.day.mintemp_c} °C`}</h1>
        <h1 className={styles.forecast_now_text}>{`visibility - ${current.vis_km} km`}</h1>
        <h1 className={styles.forecast_now_text}>{`wind - ${current.vis_km} km/h`}</h1>
      </div>
    </>)}
    </div>
  );
};

export default MainWeather;
