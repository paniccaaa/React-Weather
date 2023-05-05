import sun from '../assets/sun.svg';
import rain from '../assets/9045015_rain_icon.svg';
import partlyCloud from '../assets/274769_weather_partly cloudy_cloudy_forecast_icon.svg';
import snow from '../assets/snow.svg';
import cloud from '../assets/326592_cloud_icon.svg';
import mist from '../assets/2682821_fog_foggy_forecast_mist_weather_icon.svg';
import storm from '../assets/7795666_weather_cloud_thunder_storm_icon.svg';
import cloud_rain from '../assets/211721_cloud_icon.svg';
type Icons = Record<string, string>;

export const icons: Icons = {
  'Moderate or heavy snow showers': snow,
  Sunny: sun,
  'Partly cloudy': partlyCloud,
  Clear: sun,
  'Light rain': rain,
  Overcast: cloud,
  Cloudy: partlyCloud,
  Mist: mist,
  'Moderate or heavy rain with thunder': storm,
  'Light rain shower': rain,
  'Patchy rain possible': cloud_rain,
  Fog: mist,
  'Moderate snow': snow,
  'Moderate rain': rain,
  'Heavy rain': rain,
  'Patchy light rain with thunder': storm,
};
