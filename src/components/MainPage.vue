<template>
<div class="main">
      <div class="main__header">
        <form @submit.prevent="getCoordinates(locationInput)" class="form">
          <label for="input" class="form__label">
            Add location:
            <input id="input" class="form__input" type="text" v-model="locationInput" />
            <p v-if="hasErrors" class="form__error form__error_mobile">
              Please enter city name
            </p>
          </label>
          <button class="form__button" type="submit">
            Search
          </button>
        </form>
        <button v-if="!settingsIsActive"
                type="button"
                class="main__settings main__settings_settings"
                @click="settingsIsActive = true">
          <img src="../images/settings.png" alt="settings" class="main__icon">
        </button>
        <button v-if="settingsIsActive"
                type="button"
                class="main__settings main__settings_close"
                @click="settingsIsActive = false">
          <img src="../images/close.png" alt="close" class="main__icon">
        </button>
      </div>
      <p v-if="hasErrors" class="form__error form__error_desktop">Please enter city name</p>
      <h2 v-if="settingsIsActive" class="main__settings-title">Settings</h2>
      <draggable v-if="settingsIsActive"
                 v-model="widgets"
                 class="main__widgets"
                 group="widgets"
                 @start="drag=true"
                 @end="drag=false">
        <FoldedWeatherWidget v-for="widget in widgets"
                            :key="widget.id"
                            :title="widget.name"
                            :id="widget.id"
                            @removeWidget="removeWidget" />
      </draggable>
      <div v-if="!settingsIsActive" class="main__widgets">
        <WeatherWidget v-for="widget in widgets" :key="widget.id" :object="widget" />
      </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import draggable from 'vuedraggable';
import { v4 as uuid } from 'uuid';
import WeatherWidget from './WeatherWidget.vue';
import FoldedWeatherWidget from './FoldedWeatherWidget.vue';
import { WidgetData } from '../types/WidgetData';

export default defineComponent({
  name: 'MainPage',
  components: { WeatherWidget, FoldedWeatherWidget, draggable },
  data() {
    return {
      settingsIsActive: false,
      locationInput: '',
      hasErrors: false,
      latOfCity: null as (number | null),
      lonOfCity: null as (number | null),
      widgets: new Array<WidgetData>(),
    };
  },
  methods: {
    getCoordinates(city: string) {
      if (!city) {
        this.hasErrors = true;
        return;
      }

      this.hasErrors = false;
      axios
        .get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=b62cc1cd5e974bee5593839f6d6ec9ca`)
        .then((res) => {
          this.locationInput = '';
          this.latOfCity = res.data[0].lat;
          this.lonOfCity = res.data[0].lon;
          this.getWeatherInfo();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getWeatherInfo() {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.latOfCity}&lon=${this.lonOfCity}&units=metric&appid=b62cc1cd5e974bee5593839f6d6ec9ca`)
        .then((res) => {
          const object = {
            id: uuid(),
            name: res.data.name,
            temp: res.data.main.temp,
            feelsLike: res.data.main.feels_like,
            description: res.data.weather,
            windSpeed: res.data.wind.speed,
            pressure: res.data.main.pressure,
            humidity: res.data.main.humidity,
            clouds: res.data.clouds.all,
            visibility: res.data.visibility,
          };

          this.widgets.unshift(object);
          localStorage.setItem('widgets', JSON.stringify(this.widgets));
        })
        .catch((err) => console.log(err));
    },
    removeWidget(id: string) {
      const indexOfWidget = this.widgets.findIndex((widget) => widget.id === id);
      this.widgets.splice(indexOfWidget, 1);
      localStorage.setItem('widgets', JSON.stringify(this.widgets));
    },
  },
  mounted() {
    const widgets = localStorage.getItem('widgets');
    if (widgets) {
      this.widgets = JSON.parse(widgets);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latOfCity = position.coords.latitude;
          this.lonOfCity = position.coords.longitude;
          this.getWeatherInfo();
        },
        (positionError) => console.log(positionError),
      );
    }
  },
});
</script>

<style lang="scss">
$primary-color: #ec6e4c;
$header-height: 40px;
.main {
  margin: auto;
  max-width: 1024px;
  display: flex;
  flex-direction: column;
}

.main__settings {
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  align-self: end;
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 50px;
  height: 100%;
}

.main__icon {
  width: 100%;
}

.main__settings_settings {
  width: 40px;
}

.main__settings_close {
  width: 30px;
}

.form__input {
  border: 1px solid #3D3D3C;
  width: 200px;
  padding: 0 10px;
  border-radius: 5px;
  height: $header-height;
  margin-top: 10px;
  box-sizing: border-box;
}

.form__input:focus-visible {
  outline: transparent;
  border: 1px solid $primary-color;
}

.main__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form__label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  height: 100%;
}

.main__widgets {
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.main__settings-title {
  margin: 0;
  margin-top: 50px;
}

.form {
  display: flex;
  height: 100%;
}

.form__button {
  height: $header-height;
  background-color: transparent;
  border: none;
  background-color: $primary-color;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  padding: 0 20px;
  align-self: flex-end;
  font-weight: 500;
  transition: opacity 0.5s;
}

.form__button:hover {
  background-color: $primary-color;
  opacity: 0.8;
}

.form__icon {
  max-width: $header-height;
}

.form__error {
  color: red;
  margin: 5px 0 0 0;
}

.form__error_mobile {
  display: none;
}

.form__wrapper {
  height: 100%;
}

@media screen and (max-width: 768px) {
  .main {
    padding: 0 20px;
  }

  .main__header {
    flex-direction: column;
  }

  .main__widgets {
    grid-template-columns: auto;
    margin-top: 30px;
  }

  .main__settings {
    margin-top: 40px;
  }

  .form {
    flex-direction: column;
    width: 100%;
  }

  .form__input {
    width: 100%;
    height: 50px;
  }

  .form__button {
    align-self: auto;
    margin-left: 0;
    margin-top: 10px;
  }

  .main__settings-title {
    font-size: 18px;
    margin-top: 30px;
  }

  .form__error_mobile {
    display: block;
  }

  .form__error_desktop {
    display: none;
  }
}
</style>
