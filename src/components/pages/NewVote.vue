<template>
  <div>
    <div class="newVote" v-for="item in mainText" :key="item.id">
      <div class="breadcrumb">
        <div class="container">
          <h1 v-if="lang == 'ar'">التصويت</h1>
          <h1 v-if="lang == 'en'">Voting</h1>
          <p v-if="lang == 'ar'">قم باختيار افضل اللاعبين</p>
          <p v-if="lang == 'en'">Choose Best Players</p>
        </div>
      </div>
      <!-- End  Breadcrumb -->

      <!-- Players_1 -->
      <div
        class="_container voteCards"
        data-aos="zoom-in"
        data-aos-delay="200"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <div class="monthPlayers">
          <div class="title-sections">
            <h4>
              لاعبين
              <span>{{ month }}</span>
            </h4>
          </div>

          <Card v-if="loading" />
          <div v-else class="row">
            <div class="col-lg-6" v-for="player in players_1" :key="player.id">
              <div
                class="player"
                :style="{ backgroundImage: `url(${playerBackground})` }"
              >
                <img :src="player.avatar" />
                <div class="info">
                  <h3>{{ player.name }}</h3>
                  <ul>
                    <li>
                      <span>{{ item.profile.single_player.currentClub }}</span>
                      <small>:</small>{{ player.club_data.name }}
                    </li>
                    <li>
                      <span>{{ item.profile.single_player.position }}</span>
                      <small>:</small>{{ player.position_data.name }}
                    </li>
                    <li>
                      <span>{{ item.profile.single_player.nationality }}</span>
                      <small>:</small>{{ player.nationality_data.name }}
                    </li>
                  </ul>

                  <progress-bar
                    v-if="has_voted"
                    :barValue="player.voting_rate"
                  ></progress-bar>
                  <div class="choose" v-else>
                    <button
                      @click="choosePlayer(player.voting_player_id)"
                      class="login-btn"
                    >
                      {{ lang == "ar" ? "اختيار" : "choose" }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Players_2 -->
      <div
        class="voteCards_show"
        :style="{
          backgroundImage: `url(${require('@/assets/images/entrants/main_bg.png')})`,
        }"
      >
        <div class="_container">
          <div class="monthPlayers">
            <div class="title-sections">
              <h4>
                ارشيف
                <span style="color: #fff">المسابقة</span>
              </h4>
            </div>

            <div class="filter">
              <div class="input_wrapper select">
                <img class="icon_select" src="@/assets/images/select.png" />
                <b-form-select
                  @change="filterData"
                  class="form-control"
                  v-model="filter.year"
                  :options="years"
                ></b-form-select>
              </div>
              <div class="input_wrapper select">
                <img class="icon_select" src="@/assets/images/select.png" />
                <b-form-select
                  @change="filterData"
                  class="form-control"
                  v-model="filter.month"
                  :options="months"
                ></b-form-select>
              </div>
            </div>

            <div
              class="row"
              data-aos="zoom-in"
              data-aos-delay="200"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-once="true"
              v-if="players_2"
            >
              <Card v-if="loading" />
              <div
                v-else
                class="col-lg-4 col-md-6 col-12"
                v-for="player in players_2"
                :key="player.id"
              >
                <div
                  :style="{ backgroundImage: `url(${playerBackground})` }"
                  class="player down"
                >
                  <img :src="player.avatar" />
                  <div class="info">
                    <h3>{{ player.name }}</h3>
                    <ul>
                      <li>
                        <span>{{
                          item.profile.single_player.currentClub
                        }}</span>
                        <small>:</small>{{ player.club_data.name }}
                      </li>
                      <li>
                        <span>{{ item.profile.single_player.position }}</span>
                        <small>:</small>{{ player.position_data.name }}
                      </li>
                      <li>
                        <span>{{
                          item.profile.single_player.nationality
                        }}</span>
                        <small>:</small>{{ player.nationality_data.name }}
                      </li>
                    </ul>
                    <progress-bar
                      :barValue="player.voting_rate || 0"
                    ></progress-bar>
                  </div>
                </div>
              </div>
            </div>

            <h2 class="empty" v-else>
              {{ lang == "ar" ? "لا توجد بيانات" : "No Data" }}
            </h2>
          </div>
        </div>
      </div>

      <!-- News -->
      <div class="newsSection">
        <div class="container">
          <!-- News -->
          <div class="title-sections">
            <h4>
              {{ item.news.mainTitle.one }}
              <span>{{ item.news.mainTitle.tow }}</span>
            </h4>
          </div>
          <!-- News Section -->
          <div class="row">
            <!-- Single -->
            <div
              v-for="New in relateNews"
              :key="New.id"
              class="col-md-4"
              data-aos="zoom-in"
              data-aos-delay="200"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-once="true"
            >
              <div class="single-new">
                <router-link :to="'/news/' + New.id" tag="a">
                  <div class="img-new">
                    <img @error="replaceByDefault" :src="New.media" alt="" />
                  </div>
                  <div class="text-new">
                    <h4>
                      {{ New.title }}
                    </h4>
                    <ul class="d-flex justify-content-right">
                      <li>
                        <i class="fa fa-calendar"></i>
                        {{ New.created_at | moment("dddd, MMMM Do YYYY") }}
                      </li>
                      <li>
                        <i class="fa fa-clock"></i>
                        {{ New.created_at | moment("h:mm a") }}
                      </li>
                    </ul>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from "../pages/Global/ProgressBar.vue";

import axios from "axios";
import imgFalse from "@/assets/images/news/new2.png";
import textAr from "../../json/mainText/text-ar.json";
import textEn from "../../json/mainText/text-en.json";

export default {
  components: { ProgressBar },

  data() {
    return {
      loading: false,

      relateNews: [],
      lang: localStorage.getItem("epfa_lang"),
      mainText: null,

      players_1: [],
      players_2: [],

      best_player_map_id: null,
      random_id: null,

      month: "",

      playerBackground: require("@/assets/images/entrants/player_bg.png"),

      filter: {
        year: new Date().getFullYear(),
        month: null,
      },

      months: [],
      years: [],

      has_voted: null,
    };
  },

  computed: {
    testMonths() {
      return [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ];
    },
  },

  methods: {
    replaceByDefault(e) {
      e.target.src = imgFalse;
    },

    choosePlayer(id) {
      let Data = new FormData();
      Data.append("voter_mac_address", this.random_id);
      Data.append("best_player_map_id", this.best_player_map_id);
      Data.append("voting_player_id", id);

      axios
        .post(`best_player_voting`, Data, {
          headers: {
            "Accept-language": this.lang,
            "cache-control": "no-cache",
            "Content-type": "multipart/form-data",
            Accept: "application/json",
          },
        })
        .then(() => {
          this.GetPlayers();
          this.has_voted = true;
        });
    },

    GetPlayers() {
      this.loading = true;
      axios
        .get(`voting_month_map?voter_mac_address=${this.random_id}`, {
          headers: {
            "Accept-language": this.lang,
            "cache-control": "no-cache",
            "Content-type": "multipart/form-data",
            Accept: "application/json",
          },
        })
        .then((res) => {
          this.loading = false;
          this.players_1 = res.data.data.voting_map_items;
          this.best_player_map_id = res.data.data.id;
          this.month = res.data.data.month;
          this.relateNews = res.data.data.news;

          this.has_voted = res.data.has_voted;
        });
    },

    filterData() {
      this.loading = true;
      let params = {
        month: this.filter.month,
        year: this.filter.year,
      };

      axios
        .get(`voting_month_map_filter`, {
          headers: {
            "Accept-language": this.lang,
            "cache-control": "no-cache",
            "Content-type": "multipart/form-data",
            Accept: "application/json",
          },
          params: params,
        })
        .then((res) => {
          this.loading = false;
          this.players_2 = res.data.data.voting_map_items;
        });
    },

    GetMonths() {
      this.loading = true;
      axios
        .get(`voting_months`, {
          headers: {
            "Accept-language": this.lang,
            "cache-control": "no-cache",
            "Content-type": "multipart/form-data",
            Accept: "application/json",
          },
        })
        .then((res) => {
          this.loading = false;
          console.log(res.data);
          this.months = res.data.monthes.map((item) => {
            return {
              value: item.name,
              text: item.title,
            };
          });
          this.months.unshift({
            value: null,
            text: this.lang == "ar" ? "اختر شهر" : "select month",
            disabled: true,
          });
        });
    },

    GetYears() {
      var max = new Date().getFullYear();
      var min = max - 9;
      var years = [];

      for (var i = max; i >= min; i--) {
        years.push(i);
      }

      this.years = years;

      this.years.unshift({
        value: null,
        text: this.lang == "ar" ? "اختر سنة" : "select year",
        disabled: true,
      });
    },
  },

  mounted() {
    if (this.lang == "ar") {
      this.mainText = textAr.data;
    } else {
      this.mainText = textEn.data;
    }
  },

  created() {
    if (localStorage.getItem("Player_Random_Key")) {
      this.random_id = localStorage.getItem("Player_Random_Key");
    } else {
      this.random_id = "_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("Player_Random_Key", this.random_id);
    }

    this.GetMonths();
    this.GetYears();
    this.filter.month = this.testMonths[new Date().getMonth()];
    this.filterData();
    this.GetPlayers();
  },
};
</script>

<style lang="scss" scoped>
.empty {
  color: #c5c5c5;
  text-align: center;
  margin: 20px 0;
}

.single-new {
  height: 300px;
  a {
    display: block;
    height: 100%;
    .img-new {
      height: 100%;
      img {
        transition: all 0.2s linear;
        object-fit: cover;
        height: 100%;
      }
    }
    .text-new {
      width: 100%;
    }
  }
  &:hover {
    a {
      .img-new {
        img {
          transform: scale(1.2);
        }
      }
    }
  }
}

.input_wrapper.select {
  margin-bottom: 18px;
  position: relative;
  width: 160px;
  text-align: center;

  select {
    text-align: center;
    border-radius: 20px;
    cursor: pointer;
    background: #353c4e;
    border: 1px solid #4d556b;
    color: #969eb4;

    &:focus {
      background: #353c4e;
      border: 1px solid #4d556b;
      box-shadow: none;

      & + .icon_select {
        transform: translateY(-10%) rotate(-180deg);
      }
    }
  }

  .icon_select {
    position: absolute;
    top: 50%;
    transform: translateY(-50%) rotate(0);
    left: 15px;
    transition: all 0.2s linear;
  }
}

._container {
  width: 80%;
  margin-inline: auto;

  @media (max-width: 1300px) {
    width: 80%;
  }

  @media (max-width: 500px) {
    width: 95%;
  }
}

.player {
  &.down {
    min-height: 200px;
  }

  display: flex;
  margin: 15px 0;
  align-items: flex-end;
  padding: 15px 15px 0;
  border-radius: 15px;
  background-repeat: no-repeat;
  background-size: cover;

  span {
    margin-inline-end: 9px;
  }

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;

    & > * {
      margin: 10px 0;
    }
  }

  img {
    object-fit: cover;
    height: 140px;
    margin-inline-end: 10px;
  }

  .info {
    margin-bottom: 7px;
    h3 {
      color: #fff;
      font-size: 20px;
    }

    ul {
      color: #9da0a8;
    }
  }

  .choose {
    flex-grow: 1;
    // padding: 10px;

    button {
      background-color: var(--aw-red);
      text-align: center;
      border-top-left-radius: 25px;
      border-bottom-right-radius: 25px;
      border-bottom-left-radius: 25px;
      margin: 0 8px;
      color: var(--aw-light);
      height: 45px;
      line-height: 45px;
      display: block;
      padding: 0 15px;
      width: -webkit-max-content;
      width: -moz-max-content;
      width: 100px;
      font-weight: bold;
      margin-right: 0;
      margin-top: 20px;
      border: none;
      margin-block: 10px;
      margin-inline: auto;
    }
  }
}

.voteCards_show {
  margin: 30px 0;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 20px;

  .player {
  }
}

.filter {
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    margin: 0 15px;
  }
}

.progressBar {
  width: 90%;
  margin: 0 10px;
}

// =======================
</style>
