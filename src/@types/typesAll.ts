export type Current = {
  cloud: number;
  condition: {
    code: number;
    text: string;
  };
  feelslike_c: number;
  gust_kph: number;
  humidity: number;
  is_day: number;
  precip_in: number;
  precip_mm: number;
  pressure_in: number;
  pressure_mb: number;
  temp_c: number;
  uv: number;
  vis_km: number;
  wind_degree: number;
  wind_dir: string;
  wind_kph: number;
};

export type Location = {
  country: string;
  lat: number;
  localtime: string;
  localtime_epoch: number;
  lon: number;
  name: string;
  region: string;
  tz_id: string;
};

export type ForecastDay = {
  date: string;
  date_epoch: number;
  day: {
    avghumidity: number;
    avgtemp_c: number;
    avgtemp_f: number;
    avgvis_km: number;
    avgvis_miles: number;
    condition: {
      code: number;
      icon: string;
      text: string;
    };
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
    daily_will_it_rain: number;
    daily_will_it_snow: number;
    maxtemp_c: number;
    maxtemp_f: number;
    maxwind_kph: number;
    maxwind_mph: number;
    mintemp_c: number;
    mintemp_f: number;
    totalprecip_in: number;
    totalprecip_mm: number;
    totalsnow_cm: number;
    uv: number;
  };
  astro: {
    is_moon_up: number;
    is_sun_up: number;
    moon_illumination: string;
    moon_phase: string;
    moonrise: string;
    moonset: string;
    sunrise: string;
    sunset: string;
  };
  hour: { condition: Record<string, never> }[];
};

//export type Forecast = { forecastDay: ForecastDay[] };

export type WeatherResponse = {
  current: Current;
  forecast: { forecastday: ForecastDay[] };
  location: Location;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
