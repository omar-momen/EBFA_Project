<template>
  <div class="progressBar">
    <div :style="containerStyle" class="barContainer">
      <div :style="barStyle" class="bar"></div>
    </div>
    <div class="rate">{{ barValue }}%</div>
  </div>
</template>

<script>
export default {
  props: {
    barValue: {
      type: Number,
      required: true,
      default: 0,
    },

    color: {
      type: String,
      required: false,
      default: "#E0012D",
    },

    bgColor: {
      type: String,
      required: false,
      default: "#4D5160",
    },
  },

  computed: {
    barStyle() {
      return {
        width: `${this.barValue}%`,
        background: `${this.color}`,
      };
    },

    containerStyle() {
      return {
        background: `${this.bgColor}`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.barContainer {
  height: 10px;
  position: relative;
  border-radius: 10px;
  margin: 2px 0;

  .bar {
    position: absolute;
    inset: 0;
    transition: all 0.2s linear;
    border-radius: 0 10px 10px 0;
  }
}
.rate {
  color: #fff;
  font-size: 13px;
  margin-inline: 4px;
}
</style>
