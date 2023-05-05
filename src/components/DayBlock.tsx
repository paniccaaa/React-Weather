import React from 'react';
import { useAppDispatch } from '../redux/store';

import styles from '../scss/components/dayBlock.module.scss';
import { ForecastDay } from '../@types/typesAll';
import convertDate from '../utils/convertDate';
import { icons } from '../utils/icons';
import { setDaysOfWeek } from '../redux/slices/weather';

const DayBlock: React.FC<ForecastDay> = (props) => {
  const dispatch = useAppDispatch();
  const divRef = React.useRef<HTMLDivElement>(null);
  const { dayOfWeek } = convertDate(props.date);
  const skyInfo = props.day.condition.text;
  const icon = icons[skyInfo];

  const onClickHandler = () => {
    
    dispatch(setDaysOfWeek(dayOfWeek));
  };

  return (
    <div
      ref={divRef}
      onClick={onClickHandler}
      className={styles.content}>
      <img className={styles.icon} alt={skyInfo} src={icon} />
      <h4 className={styles.text}>{props.day.condition.text}</h4>
      <h4 className={styles.text}>{dayOfWeek}</h4>
      <h4 className={styles.text_footer}>{`${props.day.avgtemp_c} °C`}</h4>
    </div>
  );
};

export default DayBlock;

