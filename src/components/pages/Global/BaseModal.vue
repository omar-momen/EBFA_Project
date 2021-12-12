<template>
  <transition name="fadeInUp" mode="out-in">
    <div v-if="show" @click="closeModel" class="baseModel">
      <div @click.stop class="content">
        <main class="main">
          <slot name="default"></slot>
        </main>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      require: true,
      default: false,
    },
    position: {
      type: String,
      require: true,
      default: "",
    },
    positionId: {
      type: Number,
      require: true,
      default: null,
    },
  },
  methods: {
    closeModel() {
      this.$emit("closeModel");
    },
  },
};
</script>
<style lang="scss" scoped>
.baseModel {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(3px);
  background-color: rgba(158, 158, 158, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  .content {
    width: 50%;
    padding: 1rem;
    animation-name: slide-in-left;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: none;
    @media (max-width: 600px) {
      width: 90%;
    }
  }
}

@keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
