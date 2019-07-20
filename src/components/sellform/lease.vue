<template>
  <div class="textinput-demo">
    <!--基本信息-->
    <form @submit.prevent="saveCar">
      <h4>基本信息</h4>

      <nut-cell :showIcon="true" :isLink="true" @click.native="switchActionSheet('isVisible1')">
        <div class="left" slot="title">
          <label>品牌</label>
        </div>
        <div slot="desc" class="selected-option">{{display_brand}}</div>
      </nut-cell>
      <nut-cell :showIcon="true" :isLink="true" @click.native="switchActionSheet('isVisible2')">
        <div class="left" slot="title">
          <label>年份</label>
        </div>
        <div slot="desc" class="selected-option">{{display_year}}</div>
      </nut-cell>

      <nut-cell>
        <span slot="title">
          <nut-textinput placeholder="请输入内容" v-model="car_fpay" label="首付拿回：" :hasBorder="false" />
        </span>
      </nut-cell>
      <nut-cell>
        <span slot="title">
          <nut-textinput placeholder="请输入内容" v-model="car_mpay" label="月供：" :hasBorder="false" />
        </span>
      </nut-cell>
      <nut-cell>
        <span slot="title">
          <nut-textinput
            placeholder="请输入内容"
            v-model="car_month"
            label="剩余时间(月)："
            :hasBorder="false"
          />
        </span>
      </nut-cell>
      <nut-cell>
        <span slot="title">
          <nut-textinput placeholder="请输入内容" v-model="car_mile" label="剩余公里数：" :hasBorder="false" />
        </span>
      </nut-cell>

      <!--高级信息-->
      <h4>高级信息</h4>
      <div>
        <nut-cell>
          <span slot="title">
            <nut-textinput placeholder="请输入内容" v-model="car_type" label="型号：" :hasBorder="false" />
          </span>
        </nut-cell>
        <nut-cell>
          <span slot="title">
            <nut-textinput
              placeholder="请输入内容"
              v-model="car_engine"
              label="发动机："
              :hasBorder="false"
            />
          </span>
        </nut-cell>
        <nut-cell :showIcon="true" :isLink="true" @click.native="switchActionSheet('isVisible3')">
          <div class="left" slot="title">
            <label>燃料</label>
          </div>
          <div slot="desc" class="selected-option">{{display_gas}}</div>
        </nut-cell>
        <nut-cell :showIcon="true" :isLink="true" @click.native="switchActionSheet('isVisible4')">
          <div class="left" slot="title">
            <label>驱动</label>
          </div>
          <div slot="desc" class="selected-option">{{display_automode}}</div>
        </nut-cell>
        <nut-cell :showIcon="true" :isLink="true" @click.native="switchActionSheet('isVisible5')">
          <div class="left" slot="title">
            <label>座位数</label>
          </div>
          <div slot="desc" class="selected-option">{{display_seats}}</div>
        </nut-cell>
        <nut-cell>
          <span slot="title">
            <nut-textinput
              placeholder="请输入内容"
              v-model="car_Vin"
              label="Vin Number："
              :hasBorder="false"
            />
          </span>
        </nut-cell>
      </div>

      <!--联系方式-->
      <h4>联系方式</h4>

      <nut-cell>
        <span slot="title">
          <nut-textinput
            placeholder="请输入内容"
            v-model="contact_name"
            label="联系人称呼"
            :hasBorder="false"
          />
        </span>
      </nut-cell>
      <nut-cell>
        <span slot="title">
          <nut-textinput
            placeholder="请输入内容"
            v-model="contact_phone"
            label="联系电话"
            :hasBorder="false"
          />
        </span>
      </nut-cell>
      <nut-cell>
        <span slot="title">
          <nut-textinput
            placeholder="请输入内容"
            v-model="contact_time"
            label="验车时间"
            :hasBorder="false"
          />
        </span>
      </nut-cell>
      <nut-cell>
        <span slot="title">
          <nut-textinput
            placeholder="请输入内容"
            v-model="contact_location"
            label="验车地点"
            :hasBorder="false"
          />
        </span>
      </nut-cell>

      <h4>
        上传图片
        <span>(*最多上传6张)</span>
      </h4>
      <div class="last">
        <nut-imagepicker class="img-container" @imgMsg="imgMsg" :max="6"></nut-imagepicker>
      </div>

      <button type="submit" class="submit">
        <span>submit</span>
      </button>
      <router-link to="/">
        <button class="cancel">
          <span>cancel</span>
        </button>
      </router-link>
    </form>

    <!-- demo(带取消按钮） -->
    <nut-actionsheet
      :is-visible="isVisible1"
      @close="switchActionSheet('isVisible1')"
      cancelTxt="取消"
      :menu-items="brand"
      @choose="chooseBrand"
    ></nut-actionsheet>

    <nut-actionsheet
      :is-visible="isVisible2"
      @close="switchActionSheet('isVisible2')"
      cancelTxt="取消"
      :menu-items="year"
      @choose="chooseYear"
    ></nut-actionsheet>

    <nut-actionsheet
      :is-visible="isVisible3"
      @close="switchActionSheet('isVisible3')"
      cancelTxt="取消"
      :menu-items="gas"
      @choose="chooseGas"
    ></nut-actionsheet>

    <nut-actionsheet
      :is-visible="isVisible4"
      @close="switchActionSheet('isVisible4')"
      cancelTxt="取消"
      :menu-items="automode"
      @choose="chooseAutomode"
    ></nut-actionsheet>

    <nut-actionsheet
      :is-visible="isVisible5"
      @close="switchActionSheet('isVisible5')"
      cancelTxt="取消"
      :menu-items="seats"
      @choose="chooseSeats"
    ></nut-actionsheet>
  </div>
</template>

<script>
import { firestore } from "../firebase/firestore";
import firebase from "firebase";
import db from "../firebase/firebaseinit";

export default {
  data() {
    return {
      car_id: null,
      car_Vin: null,
      car_engine: null,
      car_fpay: null,
      car_mile: null,
      car_month: null,
      car_mpay: null,
      car_type: null,
      contact_location: null,
      contact_name: null,
      contact_phone: null,
      contact_time: null,

      display_brand: "请选择",
      display_year: "请选择",
      display_gas: "请选择",
      display_automode: "请选择",
      display_seats: "请选择",

      isVisible1: false,
      isVisible2: false,
      isVisible3: false,
      isVisible4: false,
      isVisible5: false,

      brand: [{ name: "benz" }, { name: "bmw" }, { name: "audi" }],
      year: [
        { name: "2019" },
        { name: "2018" },
        { name: "2017" },
        { name: "2016" },
        { name: "2015" },
        { name: "2014" },
        { name: "2013" },
        { name: "2012" }
      ],
      gas: [{ name: "汽油" }, { name: "柴油" }],
      automode: [{ name: "自动" }, { name: "手动" }],
      seats: [{ name: "2" }, { name: "4" }, { name: "7" }],
      image: []
    };
  },

  methods: {
    chooseBrand(x) {
      this.brand.name = x.name;
      this.display_brand = this.brand.name;
    },

    chooseYear(x) {
      this.year.name = x.name;
      this.display_year = this.year.name;
    },

    chooseGas(x) {
      this.gas.name = x.name;
      this.display_gas = this.gas.name;
    },

    chooseAutomode(x) {
      this.automode.name = x.name;
      this.display_automode = this.automode.name;
    },

    chooseSeats(x) {
      this.seats.name = x.name;
      this.display_seats = this.seats.name;
    },

    switchActionSheet(param) {
      this[`${param}`] = !this[`${param}`];
    },

    chooseItemAgeSpec(itemParams) {
      this.agespec = itemParams.name;
    },

    imgMsg: data => {
      if (data.code == 1) {
        alert("upload");
      }
      console.log(data.msg[0]); //code 1 自动上传  2 不上传只展示图片  3 删除图片  4 预览图片
      let file = data.msg[0];
      var storageRef = firebase.storage().ref("car_img/" + file.name);

      let uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        snapshot => {
          //run after upload img
        },
        error => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.image.push(downloadURL);
            console.log("File avaliable at", downloadURL);
          });
        }
      );
    },

    saveCar() {
      db.collection("car_info")
        .add({
          car_brand: this.display_brand,
          car_year: this.display_year,

          car_id: this.car_id,
          car_Vin: this.car_Vin,
          car_automode: this.display_automode,

          car_engine: this.car_engine,
          car_fpay: this.car_fpay,
          car_gas: this.display_gas,
          car_mile: this.car_mile,
          car_month: this.car_month,
          car_mpay: this.car_mpay,
          car_seats: this.display_seats,
          car_type: this.car_type,

          contact_location: this.contact_location,
          contact_name: this.contact_name,
          contact_phone: this.contact_phone,
          contact_time: this.contact_time
        })
        .then(decRef => {
          window.history.length > 1
            ? this.$router.go(-1)
            : this.$router.push("/mainPage");
          alert("success!");
        })
        .catch(error => console.log(err));

      firestore
        .collection("car_img")
        .add(this.car)
        .then(docRef => {
          console.log(docRef.id);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
.textinput-demo {
  padding-left: 0;
  padding-right: 0;
  font-size: 0.8rem;
}
.textinput-demo h4 {
  padding: 0 10px;
}

.left {
  text-align: left;
}

h4 {
  text-align: left;
  margin-top: 10%;
  font-size: 0.9rem;
}
.last {
  margin-top: 10%;
  margin-bottom: 10%;
}
.submit {
  width: 50%;
  float: left;
  background-color: rgb(246, 98, 64);
  border-radius: 1% 1% 1% 1%;
  color: white;
  padding: 2%;
}

.cancel {
  width: 50%;
  float: right;
  background-color: rgb(0, 178, 238);
  border-radius: 1% 1% 1% 1%;
  color: white;
  padding: 2%;
}

.submit span {
  font-size: 0.9rem;
  font-weight: 600;
}

.cancel span {
  font-size: 0.9rem;
  font-weight: 600;
}
</style>

