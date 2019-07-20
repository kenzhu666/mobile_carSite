<template>
  <div class="all">
    <form @submit.prevent="saveCar">
      <input type="text" placeholder="brand" v-model="car_brand" />
      <input type="text" placeholder="year" v-model="car_year" />

      <input type="text" placeholder="id" v-model="car_id" />

      <input type="text" placeholder="VIN" v-model="car_Vin" />
      <input type="text" placeholder="auto" v-model="car_automode" />

      <input type="text" placeholder="engine" v-model="car_engine" />
      <input type="text" placeholder="fpay" v-model="car_fpay" />

      <input type="text" placeholder="gas" v-model="car_gas" />
      <input type="text" placeholder="mile" v-model="car_mile" />

      <input type="text" placeholder="month" v-model="car_month" />
      <input type="text" placeholder="mpay" v-model="car_mpay" />

      <input type="text" placeholder="seats" v-model="car_seats" />
      <input type="text" placeholder="type" v-model="car_type" />

      <input type="text" placeholder="location" v-model="contact_location" />
      <input type="text" placeholder="name" v-model="contact_name" />
      <input type="text" placeholder="phone" v-model="contact_phone" />
      <input type="text" placeholder="time" v-model="contact_time" />

      <button type="submit">submit</button>
      <router-link to="/">cancel</router-link>
    </form>
  </div>
</template>

<script>
import db from "../firebase/firebaseinit";

export default {
  data() {
    return {
      car_id: null,
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

  methods: {
    saveCar() {
      db.collection("car_info")
        .add({
          car_brand: this.car_brand,
          car_year: this.car_year,

          car_id: this.car_id,
          car_Vin: this.car_Vin,
          car_automode: this.car_automode,

          car_engine: this.car_engine,
          car_fpay: this.car_fpay,
          car_gas: this.car_gas,
          car_mile: this.car_mile,
          car_month: this.car_month,
          car_mpay: this.car_mpay,
          car_seats: this.car_seats,
          car_type: this.car_type,

          contact_location: this.contact_location,
          contact_name: this.contact_name,
          contact_phone: this.contact_phone,
          contact_time: this.contact_time
        })
        .then(decRef => {
          this.$router.push("/");
          alert("success!");
        })
        .catch(error => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped>
.all {
  margin-top: 20%;
  border: 1px solid black;
}
</style>
