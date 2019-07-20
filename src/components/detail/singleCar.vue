<template>
  <div class="all">
    <nut-swiper
      direction="horizontal"
      :lazyLoad="true"
      :paginationVisible="true"
      @slideChangeEnd="slideChangeEnd"
      @slideMove="slideMove"
      @slideChangeStart="slideChangeStart"
      class="pic-sm"
    >
      <div v-for="(item,index) in dataImgItem" :key="index" class="nut-swiper-slide">
        <img :src="item.imgSrc" style="max-width:100%;" class="nut-img-lazyload" />
      </div>
    </nut-swiper>

    <nut-row class="sm">
      <h1 class="left">{{car_year}} {{car_brand}} {{car_type}}</h1>
      <p id="position">车辆位置:</p>

      <br />
      <div class="part-sm">
        <hr />
        <nut-row>
          <nut-col span="8" class="each-sm">
            首付
            <br />
            <p class="data-sm-1">${{car_fpay}}</p>
          </nut-col>
          <nut-col span="8" class="each-sm">
            月供
            <br />
            <p class="data-sm-1">${{car_mpay}}</p>
          </nut-col>
          <nut-col span="8" class="each-sm2">
            到期买断
            <br />
            <p class="data-sm-1">$xx</p>
          </nut-col>
        </nut-row>
        <hr />
        <nut-row>
          <nut-col span="12" class="each-sm">
            剩余公里数
            <br />
            <p class="data-sm-1">{{car_mile}}</p>
          </nut-col>
          <nut-col span="12" class="each-sm2">
            剩余时间(月)
            <br />
            <p class="data-sm-1">{{car_month}}</p>
          </nut-col>
        </nut-row>
      </div>

      <div class="part-sm">
        <hr />
        <nut-row>
          <nut-col span="8" class="each-sm">
            型号
            <br />
            <p class="data-sm-2">{{car_type}}</p>
          </nut-col>
          <nut-col span="8" class="each-sm">
            座位数
            <br />
            <p class="data-sm-2">{{car_seats}}</p>
          </nut-col>
          <nut-col span="8" class="each-sm2">
            发动机
            <br />
            <p class="data-sm-2">{{car_engine}}</p>
          </nut-col>
        </nut-row>
        <hr />
        <nut-row>
          <nut-col span="12" class="each-sm">
            燃油类型
            <br />
            <p class="data-sm-2">{{car_gas}}</p>
          </nut-col>
          <nut-col span="12" class="each-sm2">
            驱动模式
            <br />
            <p class="data-sm-2">{{car_automode}}</p>
          </nut-col>
        </nut-row>
      </div>

      <div class="part-sm">
        <hr />
        <nut-row>
          <nut-col span="6" class="each-sm2">普通天窗</nut-col>
          <nut-col span="6" class="each-sm2">全景天窗</nut-col>
          <nut-col span="6" class="each-sm2">皮质座椅</nut-col>
          <nut-col span="6" class="each-sm2">倒车摄像头</nut-col>
        </nut-row>
      </div>

      <div class="part-sm">
        <!--<h3 id="title-sm">车主留言</h3>-->
        <hr />
        <p><asdasdasdasd</p>
      </div>
    </nut-row>
  </div>
</template>


<script>
import db from "../firebase/firebaseinit";

export default {
  name: "singleCar",
  data() {
    return {
      dataItem: [
        {
          name: 1
        },
        {
          name: 2
        },
        {
          name: 3
        },
        {
          name: 4
        }
      ],
      dataImgItem: [
        {
          imgSrc: "../../assets/car.jpg"
        },
        {
          imgSrc: "../../assets/20181012_150636.jpg"
        },
        {
          imgSrc: "../../assets/20181012_150623.jpg"
        },
        {
          imgSrc: "../../assets/20181012_150659.jpg"
        }
      ],

      id: null,
      car_Vin: null,
      car_automode: null,
      car_brand: null,
      car_engine: null,
      car_fpay: null,
      car_gas: null,
      car_mile: null,
      car_month: null,
      car_mpay: null,
      car_seats: null,
      car_type: null,
      car_year: null,
      contact_location: null,
      contact_name: null,
      contact_phone: null,
      contact_time: null
    };
  },

  created() {
    this.fetchData();
  },

  beforeRouterEnter(to, from, next) {
    db.collection("car_info")
      //.where("doc.id", "==", to.params.id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.id = doc.id;
            vm.car_Vin = doc.data().car_Vin;

            vm.car_automode = doc.data().car_automode;
            vm.car_brand = doc.data().car_brand;

            vm.car_engine = doc.data().car_engine;
            vm.car_fpay = doc.data().car_fpay;

            vm.car_gas = doc.data().car_gas;
            vm.car_mile = doc.data().car_mile;

            vm.car_month = doc.data().car_month;
            vm.car_mpay = doc.data().car_mpay;

            vm.car_seats = doc.data().car_seats;
            vm.car_type = doc.data().car_type;

            vm.car_year = doc.data().car_year;

            vm.contact_location = doc.data().contact_location;
            vm.contact_name = doc.data().contact_name;
            vm.contact_phone = doc.data().contact_phone;
            vm.contact_time = doc.data().contact_time;
          });
        });
      });
    console.log(doc.id);
  },
  methods: {
    fetchData() {
      db.collection("car_info")
        //.where("doc.id", "==", this.$route.params.id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.car_id = doc.id;
            this.car_Vin = doc.data().car_Vin;

            this.car_automode = doc.data().car_automode;
            this.car_brand = doc.data().car_brand;

            this.car_engine = doc.data().car_engine;
            this.car_fpay = doc.data().car_fpay;

            this.car_gas = doc.data().car_gas;
            this.car_mile = doc.data().car_mile;

            this.car_month = doc.data().car_month;
            this.car_mpay = doc.data().car_mpay;

            this.car_seats = doc.data().car_seats;
            this.car_type = doc.data().car_type;

            this.car_year = doc.data().car_year;

            this.contact_location = doc.data().contact_location;
            this.contact_name = doc.data().contact_name;
            this.contact_phone = doc.data().contact_phone;
            this.contact_time = doc.data().contact_time;
          });
        });
    },
    slideChangeEnd(page) {
      console.log(page);
    },
    slideMove(page) {
      console.log(page);
    },
    slideChangeStart(page) {
      console.log(page);
    }
  },

  mounted() {
    console.log(this.dataImgItem[0].imgSrc);
  }
};
</script>


<style lang="scss" scoped>
/*small screen*/
.all {
  margin-top: -15%;
}
.pic-sm {
  width: 100%;
  position: relative;
  height: 0;
  padding-top: 75%;

  z-index: 999;
}

.pic-sm div img {
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  z-index: 999;
}

.left {
  font-size: 0.9rem;
  font-weight: 500;
}
#position {
  font-size: 0.8rem;
  text-align: left;
  color: #808080;
}

.sm {
  text-align: left;
  width: 95%;
  margin: 0 auto;
  margin-top: 5%;
  margin-bottom: 7%;
}

#title-sm {
  margin-bottom: 1%;
}

.part-sm {
  margin-bottom: 8%;
}

.data-sm-1 {
  font-size: 0.9rem;
  color: rgb(246, 98, 64);
  font-weight: 600;
}

.data-sm-2 {
  font-size: 0.9rem;
  color: rgb(0, 178, 238);
  font-weight: 600;
}

.each-sm {
  margin-bottom: 7%;
  font-size: 0.8rem;
  border-right-width: thin;
  border-right: 0.02rem solid #c0c0c0;
  color: #808080;
  text-align: center;
}

.each-sm2 {
  margin-bottom: 7%;
  font-size: 0.8rem;
  text-align: center;
  color: #808080;
}

.each-sm p {
  margin-top: 5%;
}

.each-sm2 p {
  margin-top: 5%;
}

h3 {
  font-weight: 200;
}

hr {
  position: relative;
  border-top: 0.05px solid #c0c0c0;
}

h1 {
  font-size: 0.9rem;
  text-align: left;
}
</style>
