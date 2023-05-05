import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { ForecastDay, WeatherResponse } from '../../@types/typesAll';
import { Status } from '../../@types/typesAll';
export const fetchWeather = createAsyncThunk('weather/fecthWeatherStatus', async (city: string) => {
  const { data } = await axios.get<WeatherResponse>(
    `http://api.weatherapi.com/v1/forecast.json?key=fc2f4304a83940c89f955007232404&q=${city}&days=4`,
  );
  return data;
});

interface WeatherSliceState {
  searchValue: string;
  status: string;
  weather: WeatherResponse;
  dataDayWeek: ForecastDay;
  daysOfWeek: string;
}

const initialState: WeatherSliceState = {
  searchValue: 'Tokyo',
  daysOfWeek: 'Day of week',
  dataDayWeek: {
    astro: {
      is_moon_up: 0,
      is_sun_up: 0,
      moon_illumination: '',
      moon_phase: '',
      moonrise: '',
      moonset: '',
      sunrise: '',
      sunset: '',
    },
    date: '',
    date_epoch: 0,
    day: {
      avghumidity: 0,
      avgtemp_c: 0,
      avgtemp_f: 0,
      avgvis_km: 0,
      avgvis_miles: 0,
      condition: {
        code: 0,
        icon: '',
        text: '',
      },
      daily_chance_of_rain: 0,
      daily_chance_of_snow: 0,
      daily_will_it_rain: 0,
      daily_will_it_snow: 0,
      maxtemp_c: 0,
      maxtemp_f: 0,
      maxwind_kph: 0,
      maxwind_mph: 0,
      mintemp_c: 0,
      mintemp_f: 0,
      totalprecip_in: 0,
      totalprecip_mm: 0,
      totalsnow_cm: 0,
      uv: 0,
    },
    hour: [{ condition: {} }],
  },
  status: Status.LOADING,
  weather: {
    current: {
      cloud: 0,
      condition: {
        code: 0,
        text: '',
      },
      feelslike_c: 0,
      gust_kph: 0,
      humidity: 0,
      is_day: 0,
      precip_in: 0,
      precip_mm: 0,
      pressure_in: 0,
      pressure_mb: 0,
      temp_c: 0,
      uv: 0,
      vis_km: 0,
      wind_degree: 0,
      wind_dir: '',
      wind_kph: 0,
    },
    forecast: {
      forecastday: [
        {
          astro: {
            is_moon_up: 0,
            is_sun_up: 0,
            moon_illumination: '',
            moon_phase: '',
            moonrise: '',
            moonset: '',
            sunrise: '',
            sunset: '',
          },
          date: '',
          date_epoch: 0,
          day: {
            avghumidity: 0,
            avgtemp_c: 0,
            avgtemp_f: 0,
            avgvis_km: 0,
            avgvis_miles: 0,
            condition: {
              code: 0,
              icon: '',
              text: '',
            },
            daily_chance_of_rain: 0,
            daily_chance_of_snow: 0,
            daily_will_it_rain: 0,
            daily_will_it_snow: 0,
            maxtemp_c: 0,
            maxtemp_f: 0,
            maxwind_kph: 0,
            maxwind_mph: 0,
            mintemp_c: 0,
            mintemp_f: 0,
            totalprecip_in: 0,
            totalprecip_mm: 0,
            totalsnow_cm: 0,
            uv: 0,
          },
          hour: [{ condition: {} }],
        },
      ],
    },
    location: {
      country: '',
      lat: 0,
      localtime: '',
      localtime_epoch: 0,
      lon: 0,
      name: '',
      region: '',
      tz_id: '',
    },
  },
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },

    setWeatherCurrent: (state, action: PayloadAction<WeatherResponse>) => {
      state.weather.current = action.payload.current;
    },
    setDaysOfWeek: (state, action: PayloadAction<string>) => {
      state.daysOfWeek = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state: WeatherSliceState) => {
      state.status = Status.LOADING;
    });
    builder.addCase(
      fetchWeather.fulfilled,
      (state: WeatherSliceState, action: PayloadAction<WeatherResponse>) => {
        state.status = Status.SUCCESS;
        state.weather = action.payload;
      },
    );
    builder.addCase(fetchWeather.rejected, (state) => {
      state.status = Status.ERROR;
      state.searchValue = 'Tokyo';
      console.log('ошибка в redux');
    });
  },
});

export const selectWeather = (state: RootState) => state.weather;
export const { setSearchValue, setWeatherCurrent, setDaysOfWeek } = weatherSlice.actions;
export default weatherSlice.reducer;
