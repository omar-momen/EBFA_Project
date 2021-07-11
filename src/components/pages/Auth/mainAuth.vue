<template>
  <div class="main-login-page">
    <div class="row">
      <div class="col-md-7">
      <transition name="slither" mode="out-in">
        <router-view></router-view>
      </transition>
      </div>
      <div class="col-md-5">
        <div class="auth-image">
          <img src="../../../assets/images/auth/bg-left.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
};
</script>
