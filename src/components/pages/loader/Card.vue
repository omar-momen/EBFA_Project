<template>
  <div class="row">
    <div
      v-for="item in 8"
      :key="item"
      class="my-2 col-lg-3 col-md-4 col-sm-6 col-12"
    >
      <div class="card">
        <div class="cover">
          <img src="" />
        </div>

        <div class="content">
          <h2></h2>
          <small></small>
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  padding: 14px;
  background-color: #fafafa;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 8px 40px -8px hsl(210, 14%, 85%);
  border: 1px solid rgb(213, 218, 223);

  .cover,
  .content > * {
    background: linear-gradient(
      90deg,
      hsl(210, 15%, 88%),
      hsl(210, 15%, 95%),
      hsl(210, 15%, 88%)
    );
    background-size: 200%;
    animation: loader 1s infinite reverse;
  }

  .cover {
    height: 270px;
    border-radius: 8px;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      opacity: 0.9;
    }
  }

  .content {
    position: relative;
    color: #242627;
    margin-top: 8px;

    small {
      height: 1rem;
      width: 4rem;
      display: block;
      margin: 8px 0;
      color: grey;
    }

    h2 {
      width: 50%;
      height: 1em;
    }

    p {
      height: 3em;
    }
  }
}

@keyframes loader {
  from {
    background-position: -100% 0;
  }
  to {
    background-position: 100% 0;
  }
}
</style>
