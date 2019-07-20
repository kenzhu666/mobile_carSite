<template>
  <div class="demo-list">
    <div class="container shadow">
      <nut-cell :showIcon="true" :isLink="true" @click.native="switchActionSheet('isVisible1')">
        <div class="select" slot="title">
          <button class="color-block">品牌</button>
        </div>
        <div slot="desc" class="selected-option">{{b}}</div>
      </nut-cell>
      <nut-cell :showIcon="true" :isLink="true" @click.native="switchActionSheet('isVisible2')">
        <div class="select" slot="title">
          <button class="color-block">首付</button>
        </div>
        <div slot="desc" class="selected-option">{{f}}</div>
      </nut-cell>
      <nut-cell :showIcon="true" :isLink="true" @click.native="switchActionSheet('isVisible3')">
        <div class="select" slot="title">
          <button class="color-block">月供</button>
        </div>
        <div slot="desc" class="selected-option">{{m}}</div>
      </nut-cell>
      <nut-cell :showIcon="true" :isLink="true" @click.native="switchActionSheet('isVisible4')">
        <div class="select" slot="title">
          <button class="color-block">剩余</button>
        </div>
        <div slot="desc" class="selected-option">{{t}}</div>
      </nut-cell>
    </div>

    <!-- demo(带取消按钮） -->
    <nut-actionsheet
      :is-visible="isVisible1"
      @close="switchActionSheet('isVisible1')"
      cancelTxt="取消"
      :menu-items="brand"
      @choose="brand1"
    ></nut-actionsheet>

    <nut-actionsheet
      :is-visible="isVisible2"
      @close="switchActionSheet('isVisible2')"
      cancelTxt="取消"
      :menu-items="fpay"
      @choose="fpay1"
    ></nut-actionsheet>

    <nut-actionsheet
      :is-visible="isVisible3"
      @close="switchActionSheet('isVisible3')"
      cancelTxt="取消"
      :menu-items="mpay"
      @choose="mpay1"
    ></nut-actionsheet>

    <nut-actionsheet
      :is-visible="isVisible4"
      @close="switchActionSheet('isVisible4')"
      cancelTxt="取消"
      :menu-items="time"
      @choose="time1"
    ></nut-actionsheet>

    <!--display car-->

    <div class="each-car" :gutter="10" v-for="(i,index) in calT2" :key="index">
      <router-link v-bind:to="{name:'singleCar', params:{id: i.id}}">
        <div class="row">
          <div id="img-container">
            <img src="../assets/car.jpg" />
          </div>
          <div class="content-div">
            <table class="content">
              <tr>
                <td id="left1">{{i.year}} {{i.brand}} {{i.type}}</td>
              </tr>
              <tr>
                <td>
                  <p id="left2">
                    位置:
                    <span>{{i.location}}</span>
                  </p>
                </td>
                <td>
                  <p id="right">
                    <span id="red">{{i.fpay}}</span>dp
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p id="left2">
                    剩余:
                    <span>{{i.time}}个月</span>
                  </p>
                </td>
                <td>
                  <p id="right">
                    <span id="blue">{{i.mpay}}</span>/m
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p id="left2">
                    剩余:
                    <span>{{i.mile}}km</span>
                  </p>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </router-link>
    </div>
    <hr />
  </div>
</template>

<script>
import db from "./firebase/firebaseinit";
export default {
  data() {
    return {
      item: [],

      b: "请选择",
      f: "请选择",
      m: "请选择",
      t: "请选择",
      isVisible1: false,
      isVisible2: false,
      isVisible3: false,
      isVisible4: false,

      brand: [
        { name: "全部" },
        { name: "benz" },
        { name: "bmw" },
        { name: "audi" }
      ],
      fpay: [
        { name: "全部" },
        { name: "0-5000" },
        { name: "5000-20000" },
        { name: "20000-40000" },
        { name: "40000以上" }
      ],
      mpay: [
        { name: "全部" },
        { name: "0-500" },
        { name: "500-1000" },
        { name: "1000以上" }
      ],
      time: [
        { name: "全部" },
        { name: "0-12" },
        { name: "12-24" },
        { name: "24-48" },
        { name: "48个月以上" }
      ],

      filter: {
        brand: "",
        fpay: "0-1000000",
        mpay: "0-100000",
        time: "0-100"
      }
    };
  },

  created() {
    db.collection("car_info")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            car_id: doc.data().car_id,
            brand: doc.data().car_brand,
            fpay: doc.data().car_fpay,
            mpay: doc.data().car_mpay,
            time: doc.data().car_month,
            year: doc.data().car_year,
            type: doc.data().car_type,
            mile: doc.data().car_mile,
            location: doc.data().contact_location
          };
          this.item.push(data);
        });
      });
  },

  methods: {
    //nutui的方法:
    switchActionSheet(param) {
      this[`${param}`] = !this[`${param}`];
    },

    brand1(x) {
      this.brand.name = x.name;
      this.b = this.brand.name;
      if (x.name == "全部") {
        this.filter.brand = "";
      } else {
        this.filter.brand = x.name;
      }
      console.log(this.filter.brand);
    },
    fpay1(x) {
      this.fpay.name = x.name;
      this.f = this.fpay.name;
      if (x.name == "全部") {
        this.filter.fpay = "0-1000000";
      } else if (x.name == "40000以上") {
        this.filter.fpay = "40000-1000000";
      } else {
        this.filter.fpay = x.name;
      }
      console.log(this.fpay.name);
    },
    mpay1(x) {
      this.mpay.name = x.name;
      this.m = this.mpay.name;
      if (x.name == "全部") {
        this.filter.mpay = "0-100000";
      } else if (x.name == "1000以上") {
        this.filter.mpay = "1000-100000";
      } else {
        this.filter.mpay = x.name;
      }
      console.log(this.mpay.name);
    },
    time1(x) {
      this.time.name = x.name;
      this.t = this.time.name;
      if (x.name == "全部") {
        this.filter.time = "0-100";
      } else if (x.name == "48个月以上") {
        this.filter.time = "48-100";
      } else {
        this.filter.time = x.name;
      }
      console.log(this.time.name);
    }
  },

  computed: {
    calB: function() {
      return this.item.filter(item => {
        return item.brand.match(this.filter.brand);
      });
    },
    calF1: function() {
      return this.calB.filter(item => {
        return item.fpay >= parseInt(this.filter.fpay.split("-")[0]);
      });
    },
    calF2: function() {
      return this.calF1.filter(item => {
        return item.fpay < parseInt(this.filter.fpay.split("-")[1]);
      });
    },
    calM1: function() {
      return this.calF2.filter(item => {
        return item.mpay >= parseInt(this.filter.mpay.split("-")[0]);
      });
    },
    calM2: function() {
      return this.calM1.filter(item => {
        return item.mpay < parseInt(this.filter.mpay.split("-")[1]);
      });
    },
    calT1: function() {
      return this.calM2.filter(item => {
        return item.time >= parseInt(this.filter.time.split("-")[0]);
      });
    },
    calT2: function() {
      return this.calT1.filter(item => {
        return item.time < parseInt(this.filter.time.split("-")[1]);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
//shadow effect
.container {
  width: 90%;
  margin: 0 auto;
  background: #ccc;
  margin-bottom: 8%;
}
.color-block {
  background-color: #cccccc;
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
  border: none;
}
.select {
  font-size: 0.8rem;
  float: left;
}
.shadow {
  position: relative;

  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.3),
    0px 0px 20px rgba(0, 0, 0, 0.1) inset;
}

.shadow::before,
.shadow::after {
  content: "";
  position: absolute;
  z-index: -1;
}

.shadow::before,
.shadow::after {
  content: "";
  position: absolute;
  z-index: -1;
  bottom: 15px;
  left: 10px;
  width: 50%;
  height: 20%;
}

.shadow::before,
.shadow::after {
  content: "";
  position: absolute;
  z-index: -1;
  bottom: 15px;
  left: 10px;
  width: 50%;
  height: 20%;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.6);
  transform: rotate(-3deg);
}

.shadow::after {
  right: 10px;
  left: auto;
  transform: rotate(3deg);
}

//car css:

.each-car {
  position: relative;
  width: 95%;
  height: 7rem;
  margin: 0 auto;
  padding-bottom: 5%;
}

a {
  color: black;
}

table {
  border-collapse: collapse;
}
tr {
  height: 0;
}
th {
  height: 0;
}
td {
  height: 0;
}

.row {
  width: 100%;
}

#img-container {
  position: relative;
  width: 40%;
  height: 7rem;
  float: left;
}

img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.content-div {
  position: relative;
  width: 59%;
  float: right;
}

.content {
  position: relative;
  width: 100%;
  height: 5rem;
}

#left1 {
  position: absolute;
  text-align: left;
  font-size: 1rem;
  font-weight: 400;
  height: 0px;
  padding: 0px;
}

#left2 {
  position: absolute;
  text-align: left;
  font-size: 0.8rem;
  color: #808080;
}

#right {
  font-size: 0.8rem;
  color: #808080;
  text-align: right;
  height: 0px;
  padding: 0px;
  margin-top: 12%;
}

#right #red {
  font-size: 0.9rem;
  color: rgb(246, 98, 64);
  font-weight: 600;
}

#right #blue {
  font-size: 0.9rem;
  color: rgb(0, 178, 238);
  font-weight: 600;
}
</style>
