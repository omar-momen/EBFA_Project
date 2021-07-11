<template>
  <div class="relatedContainer">
    <div class="newsSection">
      <div class="container">
        <!-- News -->
        <div class="title-sections">
          <h4>
            مقالات
            <span>ذات صلة</span>
          </h4>
        </div>
        <!-- News Section -->
        <div class="row">
          <!-- Single -->
          <div
            class="col-md-4"
            data-aos="zoom-in"
            data-aos-delay="200"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="true"
          >
            <div class="single-new">
              <router-link to="#" tag="a">
                <div class="img-new">
                  <img src="../../../assets/images/news/new1.png" alt="" />
                </div>
                <div class="text-new">
                  <h4>
                    جمعية المحترفين تدعم اسرة اللاعب الراحل عبد الرحمن عاطف
                  </h4>
                  <ul class="d-flex justify-content-right">
                    <li>
                      <i class="fa fa-calendar"></i>
                      15 مايو , 2021
                    </li>
                    <li>
                      <i class="fa fa-clock"></i>
                      3:45 ص
                    </li>
                  </ul>
                </div>
              </router-link>
            </div>
          </div>
          <!-- Single -->
          <div
            class="col-md-4"
            data-aos="zoom-in"
            data-aos-delay="200"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="true"
          >
            <div class="single-new">
              <router-link to="#" tag="a">
                <div class="img-new">
                  <img src="../../../assets/images/news/new2.png" alt="" />
                </div>
                <div class="text-new">
                  <h4>
                    زيارة جمعية اللاعبين المحترفين لـ نادي النصر لعمل العضويات
                    للفريق الأول
                  </h4>
                  <ul class="d-flex justify-content-right">
                    <li>
                      <i class="fa fa-calendar"></i>
                      15 مايو , 2021
                    </li>
                    <li>
                      <i class="fa fa-clock"></i>
                      3:45 ص
                    </li>
                  </ul>
                </div>
              </router-link>
            </div>
          </div>
          <!-- Single -->
          <div
            class="col-md-4"
            data-aos="zoom-in"
            data-aos-delay="200"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="true"
          >
            <div class="single-new">
              <router-link to="#" tag="a">
                <div class="img-new">
                  <img src="../../../assets/images/news/new2.png" alt="" />
                </div>
                <div class="text-new">
                  <h4>
                    زيارة جمعية اللاعبين المحترفين لـ نادي النصر لعمل العضويات
                    للفريق الأول
                  </h4>
                  <ul class="d-flex justify-content-right">
                    <li>
                      <i class="fa fa-calendar"></i>
                      15 مايو , 2021
                    </li>
                    <li>
                      <i class="fa fa-clock"></i>
                      3:45 ص
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
</template>

<script>
export default {
  name: "related",
  data() {
    return {
      lang: localStorage.getItem("epfa_lang"),
    };
  },
};
</script>
