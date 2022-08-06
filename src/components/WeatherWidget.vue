<template>
    <div class="widget">
        <p class="widget__title">{{object.name}}</p>
        <div class="widget__container">
            <img
                :src="weatherSrc"
                alt="weather"
                class="widget__icon widget__icon_weather"
            >
            <p class="widget__degrees">{{Math.round(object.temp)}}°C</p>
        </div>
        <div class="widget__wrapper">
            <p class="widget__paragraph">
              Feels like {{Math.round(object.feelsLike)}}°C, {{feelsLikeDescriptionJoined}}
            </p>
        </div>
        <div class="weather">
            <div class="widget__container weather__info_wind-speed">
                <img
                    src="../images/navigation.png"
                    alt="navigation-icon"
                    class="widget__icon widget__icon_wind"
                >
                <p class="weather__item">{{object.windSpeed}}m/s SSE</p>
            </div>
            <div class="widget__container weather__info_wind-direction widget__wind_direction">
                <img
                    src="../images/compass.png"
                    alt="navigation-icon"
                    class="widget__icon widget__icon_wind"
                >
                <p class="weather__item">{{object.pressure}}hPa</p>
            </div>
            <div class="widget__container">
                <p class="weather__item">Humidity:</p>
                <p class="weather__item">{{object.humidity}}%</p>
            </div>
            <div class="widget__container">
                <p class="weather__item">Cloudiness:</p>
                <p class="weather__item">{{object.clouds}}%</p>
            </div>
            <div class="widget__container">
                <p class="weather__item">Visibility:</p>
                <p class="weather__item">{{object.visibility / 1000}}km</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { WidgetData } from '../types/WidgetData';

export default defineComponent({
  props: {
    object: {
      type: Object as () => WidgetData,
    },
  },
  name: 'WeatherWidget',
  computed: {
    weatherSrc(): string {
      const defaultIcon = '02d';
      const iconName = this.object?.description[0]?.icon ?? defaultIcon;
      return `http://openweathermap.org/img/wn/${iconName}@2x.png`;
    },
    feelsLikeDescriptionJoined(): string {
      const res = this.object?.description
        .map((item) => item.description)
        .join(', ');

      return res ?? '';
    },
  },
});
</script>

<style lang="scss" scoped>
$primary-color: black;

.widget {
    color: $primary-color;
    max-width: 300px;
    padding: 30px 20px;
    box-shadow: 0px 0px 10px #E5E5E5;
    border-radius: 10px;
}

.widget__container {
    display: flex;
    column-gap: 10px;
}

.widget__wrapper {
    display: flex;
    margin-top: 30px;
}

.widget__title {
    font-size: 18px;
    font-weight: 600;
    text-align: left;
    margin: 0;
    margin-bottom: 30px;
}

.widget__icon {
    object-fit: contain;
}

.widget__icon_weather {
    max-width: 80px;
}

.widget__degrees {
    font-size: 35px;
    line-height: 30px;
    font-weight: 500;
    margin: 0 0 0 10px;
    align-self: center;
}

.widget__paragraph {
    text-align: left;
    margin: 0;
}

.weather {
    display: grid;
    row-gap: 20px;
    grid-template-columns: repeat(2, auto);
    margin-top: 30px;
    text-align: left;
}

.weather__info_wind-speed {
    grid-column: 1;
}

.weather__info_wind-direction {
    grid-column: 2;
}

.widget__icon_wind {
    max-width: 22px;
}

.weather__item {
    margin: 0;
}
</style>
