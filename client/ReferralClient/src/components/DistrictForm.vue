<template>
    <form @submit.prevent="submitForm">
      <div>
        <label>District:</label>
        <select v-model="selectedDistrict" @change="fetchMandals">
          <option v-for="district in districts" :key="district" :value="district">{{ district }}</option>
        </select>
      </div>
  
      <div>
        <label>Mandal:</label>
        <select v-model="selectedMandal" @change="fetchVillages" :disabled="!selectedDistrict">
          <option v-for="mandal in mandals" :key="mandal" :value="mandal">{{ mandal }}</option>
        </select>
      </div>
  
      <div>
        <label>Village:</label>
        <select v-model="selectedVillage" :disabled="!selectedMandal">
          <option v-for="village in villages" :key="village" :value="village">{{ village }}</option>
        </select>
      </div>
  
      <div>
        <label>Notes:</label>
        <textarea v-model="notes"></textarea>
      </div>
  
      <button type="submit">Submit</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedDistrict: '',
        selectedMandal: '',
        selectedVillage: '',
        notes: '',
        districts: ["District1", "District2"], // These should come from the backend
        mandals: [],
        villages: [],
      };
    },
    methods: {
      fetchMandals() {
        fetch(`http://localhost:3000/mandals/${this.selectedDistrict}`)
          .then((response) => response.json())
          .then((data) => {
            this.mandals = data;
            this.selectedMandal = "";
            this.villages = [];
          });
      },
      fetchVillages() {
        fetch(`http://localhost:3000/villages/${this.selectedDistrict}/${this.selectedMandal}`)
          .then((response) => response.json())
          .then((data) => {
            this.villages = data;
            this.selectedVillage = "";
          });
      },
      submitForm() {
        // Form submission logic
        alert(`Form submitted with District: ${this.selectedDistrict}, Mandal: ${this.selectedMandal}, Village: ${this.selectedVillage}, Notes: ${this.notes}`);
      },
    },
  };
  </script>
  