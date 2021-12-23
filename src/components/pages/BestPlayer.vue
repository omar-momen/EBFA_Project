<template>
  <div class="newsPage">
    <div v-if="!hasVoted">
      <div class="dd">
        <!-- Start  Breadcrumb -->
        <div class="breadcrumb">
          <div class="container">
            <h1 v-if="lang == 'ar'">التصويت</h1>
            <h1 v-if="lang == 'en'">Voting</h1>
            <p v-if="lang == 'ar'">قم باختيار افضل اللاعبين</p>
            <p v-if="lang == 'en'">Choose Best Players</p>
          </div>
        </div>
        <!-- End  Breadcrumb -->
        <!--Football Field-->
        <div class="container">
          <div class="football-field">
            <div class="field-content">
              <ul class="my-team">
                <li class="goolkeeper">
                  <div
                    class="player"
                    title="افضل حارس"
                    @click="showModal('goal_keeper', 1)"
                  >
                    <img src="@/assets/images/people/player.jpeg" />
                    <p>{{ goalkeeper }}</p>
                  </div>
                </li>
                <li class="defence">
                  <div class="all-defence">
                    <div
                      class="player"
                      title="افضل مدافع"
                      @click="showModal('defender', 2)"
                    >
                      <img src="@/assets/images/people/player.jpeg" />
                      <p>{{ defender1 }}</p>
                    </div>
                    <div
                      class="player"
                      title="افضل مدافع"
                      @click="showModal('defender', 3)"
                    >
                      <img src="@/assets/images/people/player.jpeg" />
                      <p>{{ defender2 }}</p>
                    </div>
                    <div
                      class="player"
                      title="افضل مدافع"
                      @click="showModal('defender', 4)"
                    >
                      <img src="@/assets/images/people/player.jpeg" />
                      <p>{{ defender3 }}</p>
                    </div>
                    <div
                      class="player"
                      title="افضل مدافع"
                      @click="showModal('defender', 5)"
                    >
                      <img src="@/assets/images/people/player.jpeg" />
                      <p>{{ defender4 }}</p>
                    </div>
                  </div>
                </li>
                <li class="midfielder">
                  <div
                    class="player"
                    title="افضل وسط ملعب"
                    @click="showModal('center_line', 6)"
                  >
                    <img src="@/assets/images/people/player.jpeg" />
                    <p>{{ center1 }}</p>
                  </div>
                  <div
                    class="player"
                    title="افضل وسط ملعب"
                    @click="showModal('center_line', 7)"
                  >
                    <img src="@/assets/images/people/player.jpeg" />
                    <p>{{ center2 }}</p>
                  </div>
                  <div
                    class="player"
                    title="افضل وسط ملعب"
                    @click="showModal('center_line', 8)"
                  >
                    <img src="@/assets/images/people/player.jpeg" />
                    <p>{{ center3 }}</p>
                  </div>
                </li>
                <li class="forwards">
                  <div
                    class="player"
                    title="افضل مهاجم"
                    @click="showModal('attacker', 9)"
                  >
                    <img src="@/assets/images/people/player.jpeg" />
                    <p>{{ attack1 }}</p>
                  </div>
                  <div
                    class="player"
                    title="افضل مهاجم"
                    @click="showModal('attacker', 10)"
                  >
                    <img src="@/assets/images/people/player.jpeg" />
                    <p>{{ attack2 }}</p>
                  </div>
                  <div
                    class="player"
                    title="افضل مهاجم"
                    @click="showModal('attacker', 11)"
                  >
                    <img src="@/assets/images/people/player.jpeg" />
                    <p>{{ attack3 }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="substitutes">
            <ul class="substitut-players">
              <li>
                <div class="player" @click="showModal('is_under_age', 13)">
                  <img src="@/assets/images/people/player.jpeg" />
                </div>
                <span>{{ underage }}</span>
              </li>
              <li>
                <div class="player" @click="showModal('is_strange', 14)">
                  <img src="@/assets/images/people/player.jpeg" />
                </div>
                <span>{{ stranger }}</span>
              </li>
              <li>
                <div class="player" @click="showModal('is_profitional', 15)">
                  <img src="@/assets/images/people/player.jpeg" />
                </div>
                <span>{{ professional }}</span>
              </li>
              <li>
                <div class="player" @click="showModal('is_player', 16)">
                  <img src="@/assets/images/people/player.jpeg" />
                </div>
                <span>{{ bestPlayer }}</span>
              </li>
              <li>
                <div
                  class="player"
                  title="افضل ملعب"
                  @click="showModal('playground', 12)"
                >
                  <img src="@/assets/images/people/player.jpeg" />
                </div>
                <span>{{ playground }}</span>
              </li>
            </ul>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-8">
              <div class="form-auth-login">
                <div class="form-group">
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    id="name"
                    v-model="name"
                    placeholder=""
                    v-on:keydown.enter.prevent="vote"
                  />
                  <label for="email" v-if="lang == 'ar'">
                    اسم المصوت
                    <small>*</small>
                  </label>
                  <label for="email" v-if="lang == 'en'">
                    Voter Name
                    <small>*</small>
                  </label>
                </div>
                <div class="form-group">
                  <input
                    type="number"
                    name="phone"
                    class="form-control"
                    id="phone"
                    v-model="phone"
                    placeholder=""
                    v-on:keydown.enter.prevent="vote"
                  />
                  <label for="email" v-if="lang == 'ar'">
                    رقم هاتف المصوت
                    <small>*</small>
                  </label>
                  <label for="email" v-if="lang == 'en'">
                    Voter Phone
                    <small>*</small>
                  </label>
                </div>
                <div
                  class="
                    all-main-btn
                    main-btn
                    text-center
                    mt-5
                    mb0-5
                    d-flex
                    btn-steps
                  "
                  v-if="lang == 'ar'"
                >
                  <button type="button" v-if="waiting">
                    <span> <i class="fas fa-spinner"></i> </span>
                  </button>
                  <button type="button" v-else @click="Vote">ارسال</button>
                </div>
                <div
                  class="
                    all-main-btn
                    main-btn
                    text-center
                    mt-5
                    mb0-5
                    d-flex
                    btn-steps
                  "
                  v-if="lang == 'en'"
                >
                  <button type="button" v-if="waiting">
                    <span> <i class="fas fa-spinner"></i> </span>
                  </button>
                  <button type="button" v-else @click="Vote">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--Football Field-->
        <div id="box"></div>
      </div>
      <MyModal
        @closeModel="closeModel"
        :show="showMod"
        :position="Position"
        :positionId="positionId"
      >
        <template #default>
          <div class="my_modal">
            <Loader v-if="loading"></Loader>
            <div class="modal_body" v-else>
              <div class="title">
                <h4 v-if="Position == 'goal_keeper' && lang == 'ar'">
                  حارس مرمى
                </h4>
                <h4 v-if="Position == 'goal_keeper' && lang == 'en'">
                  Golakeeper
                </h4>
                <h4 v-if="Position == 'defender' && lang == 'ar'">مدافع</h4>
                <h4 v-if="Position == 'defender' && lang == 'en'">Defender</h4>
                <h4 v-if="Position == 'center_line' && lang == 'ar'">خط وسط</h4>
                <h4 v-if="Position == 'center_line' && lang == 'en'">
                  Center Line
                </h4>
                <h4 v-if="Position == 'attacker' && lang == 'ar'">مهاجم</h4>
                <h4 v-if="Position == 'attacker' && lang == 'en'">Attacker</h4>
                <h4 v-if="Position == 'is_under_age' && lang == 'ar'">
                  افضل صاعد
                </h4>
                <h4 v-if="Position == 'is_under_age' && lang == 'en'">
                  Best Under Age
                </h4>
                <h4 v-if="Position == 'is_strange' && lang == 'ar'">
                  افضل اجنبي
                </h4>
                <h4 v-if="Position == 'is_strange' && lang == 'en'">
                  Best Foreign
                </h4>
                <h4 v-if="Position == 'is_profitional' && lang == 'ar'">
                  افضل محترف
                </h4>
                <h4 v-if="Position == 'is_profitional' && lang == 'en'">
                  Best Professional
                </h4>
                <h4 v-if="Position == 'is_player' && lang == 'ar'">
                  افضل لاعب
                </h4>
                <h4 v-if="Position == 'is_player' && lang == 'en'">
                  Best Player
                </h4>
                <h4 v-if="Position == 'playground' && lang == 'ar'">
                  افضل ملعب
                </h4>
                <h4 v-if="Position == 'playground' && lang == 'en'">
                  Best Stadium
                </h4>
              </div>
              <div class="form-auth-login">
                <div class="form-group">
                  <select class="form-control" v-model="player">
                    <option value="" v-if="lang == 'ar'">اختر اللاعب</option>
                    <option value="" v-if="lang == 'en'">Choose Player</option>
                    <option v-for="item in Items" :key="item.id" :value="item">
                      {{ item.name }}
                    </option>
                  </select>
                </div>
                <!-- <div class="form-group">
                <input
                  type="text"
                  name="name"
                  class="form-control"
                  id="name"
                  placeholder=""
                  v-on:keydown.enter.prevent="vote"
                />
                <label for="email">
                  اسم المصوت
                  <small>*</small>
                </label>
              </div>
              <div class="form-group">
                <input
                  type="number"
                  name="phone"
                  class="form-control"
                  id="phone"
                  placeholder=""
                  v-on:keydown.enter.prevent="vote"
                />
                <label for="email">
                  رقم هاتف المصوت
                  <small>*</small>
                </label>
              </div> -->
                <div
                  class="
                    all-main-btn
                    main-btn
                    text-center
                    mt-5
                    mb0-5
                    d-flex
                    btn-steps
                  "
                >
                  <!-- <button type="button" v-if="waiting">
                  <span> <i class="fas fa-spinner"></i> </span>
                </button> -->
                  <button
                    type="button"
                    @click="showPlayer()"
                    v-if="lang == 'ar'"
                  >
                    تصويت
                  </button>
                  <button
                    type="button"
                    @click="showPlayer()"
                    v-if="lang == 'en'"
                  >
                    Voting
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </MyModal>
    </div>

    <h1 class="alreadyVoted">
      {{ lang == "ar" ? "تم التصويت بالفعل" : "Already Voted" }}
    </h1>
  </div>
</template>

<script>
import textAr from "../../json/mainText/text-en.json";
import textEn from "../../json/mainText/text-en.json";
import MyModal from "./Global/BaseModal.vue";
import axios from "axios";
import Loader from "./loader/Loader.vue";
export default {
  name: "Vote",
  components: {
    MyModal,
    Loader,
  },
  data() {
    return {
      random_id: null,
      hasVoted: false,

      loading: false,
      waiting: false,
      showMod: false,
      positionId: null,
      Items: [],
      player: "",
      Position: "",
      goalkeeper: "",
      defender1: "",
      defender2: "",
      defender3: "",
      defender4: "",
      center1: "",
      center2: "",
      center3: "",
      attack1: "",
      attack2: "",
      attack3: "",
      playground: "",
      underage: "",
      underageId: "",
      stranger: "",
      strangerId: "",
      professional: "",
      professionalId: "",
      bestPlayer: "",
      bestPlayerId: "",
      votingPlayers: [],
      name: "",
      phone: "",
      mainText: [],
      lang: localStorage.getItem("epfa_lang"),
    };
  },

  mounted() {
    if (this.lang == "ar") {
      this.mainText = textAr.data;
    } else {
      this.mainText = textEn.data;
    }
    this.setDef();
  },

  methods: {
    closeModel() {
      this.showMod = false;
      this.player = "";
    },
    showModal(position, postionId) {
      this.showMod = true;
      this.Position = position;
      this.positionId = postionId;
      if (
        this.Position != "is_under_age" &&
        this.Position != "is_strange" &&
        this.Position != "is_profitional" &&
        this.Position != "is_player"
      ) {
        this.GetPlayers();
      } else {
        this.GetSubstitute();
      }
    },
    GetPlayers() {
      this.loading = true;
      axios
        .get("voting_data?type[0]=" + this.Position, {
          headers: {
            "Accept-language": this.lang,
            "cache-control": "no-cache",
            "Content-type": "multipart/form-data",
            Accept: "application/json",
          },
        })
        .then((res) => {
          this.loading = false;
          this.Items = res.data.data;
          this.votingPlayers.forEach((ele) => {
            this.Items = this.Items.filter((e) => e.id !== ele.voting_data_id);
          });
        });
    },
    GetSubstitute() {
      this.loading = true;
      axios
        .get("voting_data?" + this.Position + "=1", {
          headers: {
            "Accept-language": this.lang,
            "cache-control": "no-cache",
            "Content-type": "multipart/form-data",
            Accept: "application/json",
          },
        })
        .then((res) => {
          this.loading = false;
          this.Items = res.data.data;
          // this.votingPlayers.forEach((ele) => {
          //   this.Items = this.Items.filter((e) => e.id !== ele.voting_data_id);
          // });
        });
    },
    showPlayer() {
      if (this.player !== "") {
        if (this.Position == "goal_keeper" && this.positionId == 1) {
          this.goalkeeper = this.player.name;
        } else if (this.Position == "defender" && this.positionId == 2) {
          this.defender1 = this.player.name;
        } else if (this.Position == "defender" && this.positionId == 3) {
          this.defender2 = this.player.name;
        } else if (this.Position == "defender" && this.positionId == 4) {
          this.defender3 = this.player.name;
        } else if (this.Position == "defender" && this.positionId == 5) {
          this.defender4 = this.player.name;
        } else if (this.Position == "center_line" && this.positionId == 6) {
          this.center1 = this.player.name;
        } else if (this.Position == "center_line" && this.positionId == 7) {
          this.center2 = this.player.name;
        } else if (this.Position == "center_line" && this.positionId == 8) {
          this.center3 = this.player.name;
        } else if (this.Position == "attacker" && this.positionId == 9) {
          this.attack1 = this.player.name;
        } else if (this.Position == "attacker" && this.positionId == 10) {
          this.attack2 = this.player.name;
        } else if (this.Position == "attacker" && this.positionId == 11) {
          this.attack3 = this.player.name;
        } else if (this.Position == "playground" && this.positionId == 12) {
          this.playground = this.player.name;
        } else if (this.Position == "is_under_age" && this.positionId == 13) {
          this.underage = this.player.name;
          this.underageId = this.player.id;
        } else if (this.Position == "is_strange" && this.positionId == 14) {
          this.stranger = this.player.name;
          this.strangerId = this.player.id;
        } else if (this.Position == "is_profitional" && this.positionId == 15) {
          this.professional = this.player.name;
          this.professionalId = this.player.id;
        } else {
          this.bestPlayer = this.player.name;
          this.bestPlayerId = this.player.id;
        }
        this.votingPlayers = this.votingPlayers.filter(
          (e) => e.positionId != this.positionId
        );
        this.votingPlayers.push({
          voting_data_id: this.player.id,
          type: this.Position,
          positionId: this.positionId,
        });

        this.closeModel();
      }
    },
    Vote() {
      this.waiting = true;
      if (this.votingPlayers.length == 0) {
        if (this.lang == "ar") {
          setTimeout(() => {
            this.$iziToast.error({
              message: "يرجى اختيار لاعب على الاقل",
              position: "bottomRight",
              rtl: true,
            });
            this.waiting = false;
          }, 1000);
        } else {
          setTimeout(() => {
            this.$iziToast.error({
              message: "You Should Choose One Player At Least",
              position: "bottomRight",
              rtl: true,
            });
            this.waiting = false;
          }, 1000);
        }
      } else if (this.name == "") {
        if (this.lang == "ar") {
          setTimeout(() => {
            this.$iziToast.error({
              message: "يرجى اضافة اسم المستخدم",
              position: "bottomRight",
              rtl: true,
            });
            this.waiting = false;
            console.log(this.votingPlayers.length);
          }, 1000);
        } else {
          setTimeout(() => {
            this.$iziToast.error({
              message: "Please Add User Name",
              position: "bottomRight",
              rtl: true,
            });
            this.waiting = false;
            console.log(this.votingPlayers.length);
          }, 1000);
        }
      } else if (this.phone == "") {
        if (this.lang == "ar") {
          setTimeout(() => {
            this.$iziToast.error({
              message: "يرجى اضافة رقم الهاتف",
              position: "bottomRight",
              rtl: true,
            });
            this.waiting = false;
          }, 1000);
        } else {
          setTimeout(() => {
            this.$iziToast.error({
              message: "Please Add Phone Number",
              position: "bottomRight",
              rtl: true,
            });
            this.waiting = false;
          }, 1000);
        }
      } else {
        const data = new FormData();
        data.append("name", this.name);
        data.append("mobile", this.phone);
        data.append("mac_address", this.random_id);
        var result = this.votingPlayers.map(function (obj) {
          return { voting_data_id: obj.voting_data_id, type: obj.type };
        });
        data.append("vote_choices", JSON.stringify(result));
        data.append("is_under_age", this.underageId);
        data.append("is_strange", this.strangerId);
        data.append("is_profitional", this.professionalId);
        data.append("is_player", this.bestPlayerId);
        console.log(this.votingPlayers);
        axios
          .post("voting", data, {
            headers: {
              "Accept-language": this.lang,
              "cache-control": "no-cache",
              "Content-type": `multipart/form-data`,
              Accept: "application/json",
            },
          })
          .then(() => {
            setTimeout(() => {
              this.$iziToast.success({
                message: "تم الارسال بنجاح",
                position: "bottomRight",
                rtl: true,
              });
              this.waiting = false;
            }, 1000);
          })
          .catch((err) => {
            setTimeout(() => {
              this.$iziToast.error({
                message: err.response.data.message,
                position: "bottomRight",
                rtl: true,
              });
              this.waiting = false;
            }, 1000);
          });
      }
    },
    setDef() {
      if (this.lang == "ar") {
        this.playground = "افضل ملعب";
        this.underage = "افضل صاعد";
        this.stranger = "افضل اجنبي";
        this.professional = "افضل محترف";
        this.bestPlayer = "افضل لاعب";
      } else {
        this.playground = "Best Playground";
        this.underage = "Best Underage";
        this.stranger = "Best Foreign";
        this.professional = "Best Professional";
        this.bestPlayer = "Best Player";
      }
    },
  },

  created() {
    if (localStorage.getItem("Player_Random_Key_2")) {
      this.random_id = localStorage.getItem("Player_Random_Key_2");
    } else {
      this.random_id = "_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("Player_Random_Key_2", this.random_id);
    }
  },
};
</script>

<style lang="scss" scoped>
.alreadyVoted {
  font-size: 50px;
  margin: 100px auto;
  width: fit-content;
  color: #8e8e8e;

  @media (max-width: 400px) {
    font-size: 40px;
  }
}

.football-field {
  padding: 25px;
  background: url("./../../assets/images/playground.jpg") no-repeat center
    center;
  background-size: cover;
  width: 100%;
  height: 500px;
  position: relative;
  margin-bottom: 15px;
  .my-team {
    li {
      .player {
        // width: 62px;
        // height: 62px;
        border-radius: 50%;
        position: absolute;
        cursor: pointer;
        img {
          border-radius: 50%;
          width: 62px;
          height: 62px;
          border: 2px solid #fff;
          object-fit: cover;
          display: block;
          margin: 0 auto;
        }
        p {
          color: #fff;
          font-size: 13px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 0;
        }
        span {
          font-size: 14px;
          font-weight: bold;
          color: #e2012d;
          text-align: center;
          position: absolute;
          width: 20px;
          height: 20px;
          line-height: 20px;
          background-color: #fff;
          border-radius: 50%;
          cursor: pointer;
        }
      }
      &.goolkeeper {
        .player {
          left: 6%;
          top: 40%;
          transform: translate(16px, 45%);
        }
      }
      &.defence {
        .all-defence {
          .player:nth-of-type(1) {
            left: 23%;
            top: 1%;
            transform: translate(13px, 3%);
          }
          .player:nth-of-type(2) {
            left: 22%;
            top: 22%;
            transform: translate(8px, 51%);
          }
          .player:nth-of-type(3) {
            left: 22%;
            bottom: 32%;
            transform: translate(8px, 43%);
          }
          .player:nth-of-type(4) {
            left: 23%;
            bottom: 1%;
            transform: translate(13px, -3%);
          }
        }
      }
      &.midfielder {
        .player:nth-of-type(1) {
          left: 47%;
          top: 14%;
          transform: translate(15px, 26%);
        }
        .player:nth-of-type(2) {
          left: 44%;
          top: 36%;
          transform: translate(15px, 63%);
        }
        .player:nth-of-type(3) {
          left: 47%;
          bottom: 14%;
          transform: translate(15px, -14%);
        }
      }
      &.forwards {
        .player:nth-of-type(1) {
          left: 76%;
          top: 16%;
          transform: translate(15px, 29%);
        }
        .player:nth-of-type(2) {
          left: 78%;
          top: 36%;
          transform: translate(15px, 63%);
        }
        .player:nth-of-type(3) {
          left: 76%;
          bottom: 15%;
          transform: translate(15px, -30%);
        }
      }
    }
  }
}
.substitutes {
  .substitut-players {
    display: flex;
    align-items: center;
    justify-content: space-around;
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-inline-end: 15px;
      .player {
        width: 62px;
        height: 62px;
        border-radius: 50%;
        cursor: pointer;
        img {
          border-radius: 50%;
          width: 62px;
          height: 62px;
          border: 2px solid #e2012d;
          object-fit: cover;
        }
      }
    }
  }
}
.my_modal {
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  .modal_body {
    .title {
      h4 {
        font-size: 20px;
        font-weight: 600;
        font-family: "Neo Sans Arabic";
        margin-bottom: 15px;
      }
    }
    .form-group {
      margin-bottom: 15px;
    }
  }
  .form-buttons {
    display: flex;
    justify-content: center;
  }
}
</style>
