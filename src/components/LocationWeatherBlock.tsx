import React from 'react';

import styles from '../scss/components/locationWeather.module.scss';
import DayBlock from './DayBlock';
import debounce from 'lodash.debounce';

import { useSelector } from 'react-redux';
import { selectWeather } from '../redux/slices/weather';
import convertDate from '../utils/convertDate';
import { useAppDispatch } from '../redux/store';
import { setSearchValue } from '../redux/slices/weather';

const LocationWeatherBlock: React.FC = () => {
  const dispatch = useAppDispatch();

  const { weather, daysOfWeek, status } = useSelector(selectWeather);
  const { location, forecast } = weather;
  const arrayOfDays = weather.forecast.forecastday;

  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 400),
    [],
  );

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event?.target.value);
    updateSearchValue(event.target.value);
  };

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const { time_without } = convertDate(location.localtime);
  const styled = time_without >= 20 || time_without < 6 ? 'night' : '';

  const dayObj = forecast.forecastday.find((obj) => {
    const { dayOfWeek } = convertDate(obj.date);
    return dayOfWeek === daysOfWeek;
  });

  return (
    <div className={styles.container}>
      <div className={styles.root}>
        <svg
          fill="white"
          className={styles.icon}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <title />
          <g data-name="Layer 2" id="Layer_2">
            <path d="M18,10a8,8,0,1,0-3.1,6.31l6.4,6.4,1.41-1.41-6.4-6.4A8,8,0,0,0,18,10Zm-8,6a6,6,0,1,1,6-6A6,6,0,0,1,10,16Z" />
          </g>
        </svg>
        <input
          ref={inputRef}
          type="inp"
          onChange={onChangeValue}
          value={value}
          placeholder="Enter your city"
          className={`${styles.search} ${styles[styled]}`}
        />
        {value && (
          <svg
            onClick={onClickClear}
            fill="white"
            className={styles.clearIcon}
            height="48"
            viewBox="0 0 48 48"
            width="48"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
            <path d="M0 0h48v48h-48z" fill="none" />
          </svg>
        )}
      </div>
      {!dayObj && (
        <>
          <h2 className={styles.block_text}>Select a day to see more weather info</h2>
        </>
      )}
      {dayObj ? (
        <div className={styles.block}>
          <h2 className={styles.block_text}>{daysOfWeek}</h2>
          <h2 className={styles.block_text}>{`PRECIPATION - ${dayObj?.day.totalprecip_mm}mm`}</h2>
          <h2 className={styles.block_text}>{`CHANCE of RAIN - ${dayObj.day.daily_chance_of_rain}%`}</h2>
          <h2 className={styles.block_text}>{`UV index - ${dayObj.day.uv}`}</h2>
          <h2 className={styles.block_text}>{`SUNRISE - ${dayObj.astro.sunrise}`}</h2>
          <h2 className={styles.block_text}>{`SUNSET - ${dayObj.astro.sunset}`}</h2>
        </div>
      ) : (
        <div className={styles.placeholder}></div>
      )}
      <div className={styles.days_block}>
        {status === 'success' && arrayOfDays.map((obj) => (
          <DayBlock key={obj.date} {...obj} />
        ))}
      </div>
    </div>
  );
};

export default LocationWeatherBlock;
