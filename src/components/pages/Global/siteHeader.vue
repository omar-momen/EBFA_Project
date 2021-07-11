<template>
  <div class="aw-site-header">
    <div class="dd" v-for="item in mainText" :key="item.id">
      <div class="large-navebar d-none d-sm-block">
        <b-navbar toggleable="lg">
          <div class="container">
            <router-link class="navbar-brand" tag="a" to="/">
              <img src="../../../assets/images/logos/logo.png" alt="" />
            </router-link>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav>
                <li class="nav-item">
                  <router-link class="nav-link" tag="a" to="/">
                    {{ item.siteHeader.home }}
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" tag="a" to="/management">
                    {{ item.siteHeader.managers }}
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" tag="a" to="/about">
                    {{ item.siteHeader.about }}
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" tag="a" to="/news">
                    {{ item.siteHeader.news }}
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" tag="a" to="/contact">
                    {{ item.siteHeader.contact }}
                  </router-link>
                </li>
              </b-navbar-nav>
              <div class="d-flex">
                <div class="lang-search d-flex">
                  <a href="#" @click="showSearch = !showSearch">
                    <i class="fa fa-search"></i>
                  </a>

                  <button
                    class="change-lang"
                    @click="changeLang()"
                    v-if="lang == 'ar'"
                  >
                    EN
                  </button>

                  <button
                    class="change-lang"
                    @click="changeLang()"
                    v-if="lang == 'en'"
                  >
                    ع
                  </button>
                </div>

                <div class="login-btn">
                  <router-link v-if="!token" to="/register" tag="a">
                    {{ item.siteHeader.loginAndRegisterBTN }}
                  </router-link>

                  <div @click.stop class="image" v-else>
                    <img
                      @click="dropDownactive = !dropDownactive"
                      :src="userImage"
                    />
                    <ul class="dropDown" :class="{ active: dropDownactive }">
                      <li @click="dropDownactive = !dropDownactive">
                        <router-link to="/profile" tag="a">{{
                          item.profile.title
                        }}</router-link>
                      </li>
                      <li>
                        <button @click="logout">{{ item.Logout.text }}</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Right aligned nav items -->
              <!-- <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown right>
                <template #button-content>
                  <em>User</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav> -->
            </b-collapse>
          </div>
        </b-navbar>
      </div>

      <!-- Mobile NavBar -->
      <div class="mobile-navbar d-block d-sm-none">
        <div class="container">
          <div class="">
            <router-link class="navbar-brand" tag="a" to="/">
              <img src="../../../assets/images/logos/logo.png" alt="" />
            </router-link>
            <b-button v-b-toggle.sidebar-backdrop>
              <span></span>
              <span></span>
              <span></span>
            </b-button>
          </div>
        </div>

        <b-sidebar id="sidebar-backdrop" class="bg-dark" backdrop shadow>
          <span v-b-toggle.sidebar-backdrop class="close"
            ><i class="fas fa-times"></i
          ></span>
          <div class="container">
            <router-link class="navbar-brand" tag="a" to="/">
              <img src="../../../assets/images/logos/logo.png" alt="" />
            </router-link>
            <div class="nav-bar-mobile-content">
              <b-navbar-nav>
                <li class="nav-item">
                  <router-link class="nav-link" tag="a" to="/">
                    {{ item.siteHeader.home }}
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" tag="a" to="/management">
                    {{ item.siteHeader.managers }}
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" tag="a" to="/about">
                    {{ item.siteHeader.about }}
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" tag="a" to="/news">
                    {{ item.siteHeader.news }}
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" tag="a" to="/contact">
                    {{ item.siteHeader.contact }}
                  </router-link>
                </li>
              </b-navbar-nav>
              <div class="d-flex mobile">
                <div class="lang-search d-flex">
                  <a
                    href="#"
                    @click="showSearch = !showSearch"
                    v-b-toggle.sidebar-backdrop
                  >
                    <i class="fa fa-search"></i>
                  </a>

                  <button
                    class="change-lang"
                    @click="changeLang()"
                    v-if="lang == 'ar'"
                  >
                    EN
                  </button>

                  <button
                    class="change-lang"
                    @click="changeLang()"
                    v-if="lang == 'en'"
                  >
                    ع
                  </button>
                </div>

                <div class="login-btn">
                  <router-link v-if="!token" to="/register" tag="a">
                    {{ item.siteHeader.loginAndRegisterBTN }}
                  </router-link>

                  <div @click.stop class="image" v-else>
                    <img
                      @click="dropDownactive = !dropDownactive"
                      :src="userImage"
                    />
                    <ul class="dropDown" :class="{ active: dropDownactive }">
                      <li @click="dropDownactive = !dropDownactive">
                        <router-link to="/profile" tag="a">{{
                          item.profile.title
                        }}</router-link>
                      </li>
                      <li>
                        <button @click="logout">{{ item.Logout.text }}</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-sidebar>
      </div>

      <transition name="fade">
        <div class="search-area" v-if="showSearch">
          <div class="container">
            <div class="form-group">
              <input
                v-model="search.text"
                type="search"
                name="search"
                :placeholder="item.Search.text"
              />
              <button
                class="search_icon"
                :class="{ english: lang == 'en' }"
                @click="searchMethod"
                type="button"
              >
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
          <div class="after-search" @click="showSearch = false"></div>
        </div>
      </transition>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.search_icon.english {
  left: unset;
  right: 0;
}

.d-flex.mobile {
  flex-direction: column;
  .login-btn {
    margin: 1rem;
  }
}

.dropDown {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.container {
  @media (max-width: 1200px) {
    max-width: 100% !important;
  }
  @media (max-width: 1040px) {
    .nav-item .nav-link {
      padding: 1.2rem;
    }
  }
}

#sidebar-backdrop {
  position: relative;
}
.close {
  position: absolute;
  top: 0.5rem;
  right: 1.5rem;
  font-size: 25px;
  color: #fff;
}

.image img {
  width: 3rem;
  object-fit: cover;
}

.dropDown {
  left: -2rem;
}
</style>


<script>
import textAr from "../../../json/mainText/text-ar.json";
import textEn from "../../../json/mainText/text-en.json";

export default {
  name: "Home",
  data() {
    return {
      // Auth
      id: localStorage.getItem("userId"),
      token: "",
      userImage: "",

      // Search
      showSearch: false,
      search: {
        text: "",
      },

      // Lang
      lang: localStorage.getItem("epfa_lang"),
      mainText: [],

      dropDownactive: false,
    };
  },
  methods: {
    closeSidebar() {},

    changeLang() {
      if (localStorage.getItem("epfa_lang") == "en") {
        localStorage.setItem("epfa_lang", "ar");
      } else {
        localStorage.setItem("epfa_lang", "en");
      }
      location.reload();
    },

    logout() {
      localStorage.removeItem("efba-token");
      localStorage.removeItem("efba-userImage");
      localStorage.removeItem("userId");
      localStorage.removeItem("ebfa_username");

      this.dropDownactive = !this.dropDownactive;
      this.$router.push({ name: "login" });
    },

    // search method
    searchMethod() {
      this.showSearch = false;
      if (this.search.text !== "") {
        this.$router.push({
          name: "Search",
          params: { text: this.search.text },
        });
      }
    },
  },

  mounted() {
    document.querySelector("body").addEventListener("click", () => {
      this.dropDownactive = false;
    });

    if (this.lang == "ar") {
      this.mainText = textAr.data;
    } else {
      this.mainText = textEn.data;
    }
  },

  created() {
    // Get Token
    this.token = localStorage.getItem("efba-token");
    this.userImage = localStorage.getItem("efba-userImage");
  },
};
</script>
