<template>
    <div class="widget">
        <div class="widget__container">
            <button
                type="button"
                class="widget__button">
                <img src="../images/hamburger.png" alt="settings" class="widget__burger">
            </button>
            <p class="widget__title">{{title}}</p>
        </div>
        <button
                @click="removeWidget"
                type="button"
                class="widget__button">
          <img src="../images/bin.png" alt="settings" class="widget__burger">
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['removeWidget'],
  props: {
    title: String,
    id: String,
  },
  name: 'FoldedWeatherWidget',
  methods: {
    removeWidget(): void {
      this.$emit('removeWidget', this.id);
    },
  },
});
</script>

<style scoped>
.widget {
    background-color:#F4F4F4;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
}

.widget__burger {
    max-width: 22px;
    object-fit: contain;
}

.widget__container {
    display: flex;
}

.widget__title {
    font-size: 18px;
    margin-left: 20px;
    font-weight: 500;
}

.widget__button {
    background-color: transparent;
    border: none;
    cursor: pointer;
}
</style>
