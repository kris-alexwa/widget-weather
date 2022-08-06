# weather-widget

Test task.
https://plumsailteam.sharepoint.com/:w:/s/recruitment/EfN6xudVCOBLheWof-8S9vYB4lMxNaKRiJfm9GEugQsjnQ?e=9uhX34

The project presents the implementation a widget that displays the weather in the specified cities.

Platform:
* [Vuejs 2](https://ru.vuejs.org/)
* [sass-scss](https://sass-scss.ru/)

Dependencies:
* [axios](https://github.com/axios/axios)
* [Vue.Draggable](https://github.com/SortableJS/Vue.Draggable)
* [uuid](https://www.npmjs.com/package/uuid)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## To use as widget
- build project ```npm run build```
- Copy weather-widget.js, weather-widget.css and img folder to the root of your website.
- Import js and css files to website. 
  - ```<script defer="defer" src="weather-widget.js"></script>``` 
  - ```<link href="weather-widget.css" rel="stylesheet">```
- Add ```<weather-widget />``` to HTML
