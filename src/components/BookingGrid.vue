<template>
<div>
    <!-- List of stores component & iFrame of map component. We have to see a free way to use the Google Map API. -->
    <form @submit.prevent='submitForm'>
  <div class="bookingContainer container">
    <div class=" col-md col-lg col-xl">
        <div class='storesContainer'  :class="showCurrentReservation" id="list-tab" role="tablist"> 
            <!-- <div  v-for="marker in markers"  :key="marker.countryName">
                <p class='countryTitle'><b> {{ marker.countryName}} </b> </p>
                <div v-for='store in marker.stores' :key='store.name'>
                <a  @click.prevent='showInMap(store.position)' class='showInMapButton' href=""> Show in map</a>
                <a @click='getStore'  class="list-group-item list-group-item-action" :id="store.name" data-toggle="list"  role="tab" :aria-controls="store.name"> <img class='mateLogo' src="../assets/mateLogo.png" alt=""> {{ store.name }}  </a> 
                </div>
            </div> -->
            <div v-for="store in stores2" :key="store"  :class="showCurrentReservation" id="list-tab" role="tablist">
                 <a  @click.prevent='showInMap(store.position)' class='showInMapButton' href=""> Show in map</a>
                 <a @click='getStore'  class="list-group-item list-group-item-action" :id="store.name" data-toggle="list"  role="tab" :aria-controls="store.name"> <img class='mateLogo' src="../assets/mateLogo.png" alt=""> {{ store.name }} </a>
            </div>

        </div>
        
        <div v-if="selectedStore" class='statusReservation'> 
            <div class='stateContainer'> <i class="bi bi-geo-alt-fill"></i>   <p>    <b> Address,  {{ selectedStore}} </b> </p>  <a @click='editStore' href="javascript:;"> Edit</a> </div>
            <div v-if="selectedBike" class='stateContainer'> <i class="bi bi-bicycle"></i>   <p>    <b> Test Ride for a  {{ selectedBike}} </b> </p>  <a @click='editBike' href="javascript:;"> Edit</a> </div>
            <div v-if="date" class='stateContainer'> <i class="bi bi-calendar"></i>   <p>    <b>  {{ date}} </b> </p>  <a @click='editDate' href="javascript:;"> Edit</a> </div>
            <div v-if="hour.name" class='stateContainer'> <i class="bi bi-clock-fill"></i>   <p class='hourText'>    <b>  {{ hour.name}} </b> </p>  <a @click='editHour' href="javascript:;"> Edit</a> </div>
            
            <!-- <i class="bi bi-bicycle"></i>  <p v-if="selectedBike"> <b> {{ selectedBike}}</b> <a @click='editBike' href="javascript:;"> Edit Bike</a></p> 
            <p > <i class="bi bi-calendar"></i> <b>{{ date }} </b> <a @click='editDate' href="javascript:;"> Edit Bike</a></p>
            <p > <i class="bi bi-clock-fill"></i>  <b>{{ hour.name }} </b> <a @click='editHour' href="javascript:;"> Edit Hour</a></p> -->
        </div>
        


     </div>
    <div  :class='hideContainer'>
        
        <!-- <iframe :class='hideMap' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d795.2714804057725!2d12.576438571998034!3d55.68259950455365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4652531a60ad655f%3A0x372bf29c35fd0755!2sLandem%C3%A6rket%2029%2C%201119%20K%C3%B8benhavn!5e0!3m2!1sen!2sdk!4v1613910121697!5m2!1sen!2sdk" width="600" height="550" style="border:0;" allowfullscreen="" loading="lazy">
        </iframe>  -->
        <gmap-map
            class='hiddenMap'
            :class='hideMap'
            :center="center"
            :zoom="zoom"
            style="width:760px;  height: 70vh;"
            :options="options"
        >
            <GmapMarker
                v-for="store in stores"
                :key="store.name"
                :position="store.position"
                :clickable="true"
                @click="center=store.position"
                :icon=iconLogo
                :title='store.name'
              />
        
        </gmap-map>
    
                
    
        <!-- Cards of Bike component  -->
         <div v-if="status != 200  && selectedStore != ''  "> <img class='gifImg' src="../assets/loader.gif" alt=""></div>
       <div  v-else  :class='showCards'   v-for="bike in bikesModels" :id='bike.name' @click="selectBike(bike.name)" :key="bike.name" :style='hideCards'  >
           
                
                <img  :src="bike.img" :id='bike.name' alt="Avatar" class='cardImg' >
                <div  class="container">
                    <h4><b> {{ bike.name }} </b></h4> 
                    <p> {{ bike.description }} </p> 
                 
                 
           </div>
                 
        </div>

       


        <!--  Day Picker Component -->
        <div :style='hideDayPicker' :class='showDate' >

                <flat-pickr 
                
                id='flatpickr'
                v-model="date"
                :config='config'
                >
                </flat-pickr>
        </div>
         <div  :style='hideDayPicker' :class="showHours" id="list-tab" role="tablist">
                    <a  v-for="hour in availableHours" :key="hour.value" @click='selectHour(hour)' class="list-group-item hoursItems list-group-item-action" :id="hour.value" data-toggle="list"  role="tab" :aria-controls="hour.value"> {{ hour.name }}</a>
        </div>

        
      
       <!-- Form component, we have to handle the submit with a new window  -->
         </div>
           <div :class="showForm">
            <div class='form-group'>
                <label for="userName"> <b> First Name* </b> </label>
                <input v-model='reservation.name' type="text" class="form-control" id="userName" autocomplete="off" aria-describedby="userName" placeholder="Your name">
            </div>
             <div class='form-group'>
                <label for="lastName"> <b>  Last Name* </b> </label>
                <input v-model='reservation.lastName' type="text" class="form-control" id="lastName" autocomplete="off" aria-describedby="lastName" placeholder="Your last name">
            </div>
            <div class='form-group'>
                <label for="email"> <b> Email* </b> </label>
                <input v-model='reservation.email' type="text" class="form-control" id="userEmail"  autocomplete="off" aria-describedby="userEmail" placeholder="Your email">
            </div>
            <div class='form-group'>
                <label for="phone"> <b> Phone Number* </b> </label>
                <input v-model='reservation.phone' type="text" class="form-control" id="userPhone" autocomplete="off" aria-describedby="userPhone" placeholder="Your Phone Number">
            </div>
            
            <button :disabled='toggleForm' type='submit' class='mt-3 btn btn-dark btnWidth'> Submit Form </button>
            
           
        </div>
     </div>
    </form>
    <div class='confirmReservation'> 
        <h1> Your reservation was submitted </h1>
        <h3> Please check your email for more details</h3>
        <h4> If you didn't receive anything click <b> <a href=""> Here </a> </b></h4>
    </div>

    <!--  Footer  -->
        <div class='howWorksContainer container'>
            <div class="howTittleContainer">
                <div class="howWorkTittle"> <h4>How it works</h4></div>
                <hr>
            </div>
            <div class='stepsContainer'>
                <div>
                    <h5> <b> 1. Choose your city </b> </h5>
                    <p>Take a test ride at a brand store or pop-up location</p>
                </div>

                 <div>
                    <h5> <b>  2. Select your bike </b></h5>
                    <p>Take a test ride at a brand store or pop-up location</p>
                </div>

                 <div>
                    <h5> <b> 3. Pick a date and time </b> </h5>
                    <p>Take a test ride at a brand store or pop-up location</p>
                </div>

                 <div>
                    <h5> <b> 5. Enjoy the ride </b> </h5>
                    <p>Take a test ride at a brand store or pop-up location</p>
                </div>

            </div>
        </div>
        </div>
</template>

<script>


  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';


export default {
    components: {
    },
    data(){
        var self = this
        return{
            // Google Maps options
             center: { lat: 55.68274206169788 , lng: 12.577181856093038},
            zoom: 12,
            options:{
            styles:[ {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
                }],
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            disableDefaultUi: false,
             },
             stores: [
                    {name: "MATE Bike - Brussels",position: {lat: 50.858310585401114, lng: 4.3437289460222575} },
                    {name: 'MATE Bike - Antwerp', position: {lat: 51.20954147059816, lng: 4.402592171306308}   },
                    {name: 'MATE Bike - Berlin ', position: {lat: 52.50263777659865, lng: 13.322435257847806}},
                    {name: 'MATE Bike - Hamburg',position: {lat: 53.55402185264837, lng: 10.018657784866456}},
                    {name: 'MATE Bike - Frankfurt',position: {lat: 50.13220434647449, lng:  8.755065384771438}},
                    {name: 'MATE Bike - Köln',position: {lat: 50.98147240792818, lng: 6.898251627124137}},
                    {name: 'MATE Bike - Munich',position: {lat: 48.141590961219386, lng: 11.615564769377988}},
                    {name: "MATE Bike - Rudersberg",position:{lat: 48.89313350243249, lng: 9.54481708289203}},

                    {name: "MATE Bike - Genova",position: {lat: 44.42977787994579, lng: 8.84546168462549}},

                    {name: "MATE Bike - Paris",position: {lat: 48.86678603214452, lng: 2.3604402845586208}},
                    {name: "Mate Bike - Paris",position: {lat: 49.253332045822944, lng: 4.031916827077497}},

                    {name: "MATE Bike - Viničné",position: {lat: 48.27660625969291, lng: 17.300990569492964}},

                    {name: "MATE Bike - London",position: {lat: 51.49548215158623, lng: 0.0489620744365672}},
                    {name: "MATE Bike - London",position: {lat: 51.284082950931584, lng: -2.481783951441709}},
                    {name: "MATE Bike - Los Angeles", position: {lat: 34.08116686114988, lng: -118.3862909155954}},
             
             ],

              markers : [
                        {countryName: 'Belgium',
                         stores:[{name: "MATE Bike - Brussels",position: {lat: 50.858310585401114, lng: 4.3437289460222575} },
                                 {name: 'MATE Bike - Antwerp', position: {lat: 51.20954147059816, lng: 4.402592171306308}   }
                         ]
                         },
                         {countryName: 'Germany',
                         stores:[{ name: 'MATE Bike - Berlin ', position: {lat: 52.50263777659865, lng: 13.322435257847806}},
                                 {name: 'MATE Bike - Hamburg',position: {lat: 53.55402185264837, lng: 10.018657784866456}  },
                                 {name: 'MATE Bike - Frankfurt',position: {lat: 50.13220434647449, lng:  8.755065384771438}},
                                 {name: 'MATE Bike - Munich',position: {lat: 48.141590961219386, lng: 11.615564769377988} },
                                 {name: "MATE Bike - Rudersberg",position:{lat: 48.89313350243249, lng: 9.54481708289203} },
                         ]
                         },

                          {countryName: 'France',
                         stores:[{ name: "MATE Bike - Paris",position: {lat: 48.86678603214452, lng: 2.3604402845586208}},
                                 {name: "Mate Bike - Paris",position: {lat: 49.253332045822944, lng: 4.031916827077497}  },
                         ]
                         },
                         {countryName: 'Italy',
                         stores:[{name: "MATE Bike - Genova",position: {lat: 44.42977787994579, lng: 8.84546168462549}},
                         ]
                         },
                          {countryName: 'Slovakia',
                         stores:[{name: "MATE Bike - Viničné",position: {lat: 48.27660625969291, lng: 17.300990569492964}},
                         ]
                         },
                         {countryName: 'UK',
                         stores:[{ name: "MATE Bike - London",position: {lat: 51.49548215158623, lng: 0.0489620744365672}},
                                 { name: "MATE Bike - Los Angeles", position: {lat: 34.08116686114988, lng: -118.3862909155954}},
                         
                         ]
                         },
                         {countryName: 'US',
                         stores:[{ name: "MATE Bike - Los Angeles", position: {lat: 34.08116686114988, lng: -118.3862909155954}},                         
                         ]
                         },
                    // {country: "Belgium",
                    // stores:  {name: 'MATE Bike - Brussels', position: {lat: 50.858310585401114, lng: 4.3437289460222575} },
                            
                    // },
                    //  {country: "Germany",
                    // stores:{ 
                    //          name: 'MATE Bike - Brussels', position: {lat: 50.858310585401114, lng: 4.3437289460222575},
                    //          name: 'MATE Bike - Antwerp', position: {lat: 51.20954147059816, lng: 4.402592171306308} }
                            
                   
                    // {name: 'MATE Bike - Berlin ', position: {lat: 52.50263777659865, lng: 13.322435257847806}},
                    // {name: 'MATE Bike - Hamburg',position: {lat: 53.55402185264837, lng: 10.018657784866456}},
                    // {name: 'MATE Bike - Frankfurt',position: {lat: 50.13220434647449, lng:  8.755065384771438}},
                    // {name: 'MATE Bike - Köln',position: {lat: 50.98147240792818, lng: 6.898251627124137}},
                    // {name: 'MATE Bike - Munich',position: {lat: 48.141590961219386, lng: 11.615564769377988}},
                    // {name: "MATE Bike - Rudersberg",position:{lat: 48.89313350243249, lng: 9.54481708289203}},

                    // {name: "MATE Bike - Genova",position: {lat: 44.42977787994579, lng: 8.84546168462549}},

                    // {name: "MATE Bike - Paris",position: {lat: 48.86678603214452, lng: 2.3604402845586208}},
                    // {name: "Mate Bike - Paris",position: {lat: 49.253332045822944, lng: 4.031916827077497}},

                    // {name: "MATE Bike - Viničné",position: {lat: 48.27660625969291, lng: 17.300990569492964}},

                    // {name: "MATE Bike - London",position: {lat: 51.49548215158623, lng: 0.0489620744365672}},
                    // {name: "MATE Bike - London",position: {lat: 51.284082950931584, lng: -2.481783951441709}},
                    // {name: "MATE Bike - Los Angeles", position: {lat: 34.08116686114988, lng: -118.3862909155954}},

                ],
            stores2: [{name: "Belgium", position:{lat: 51.20954147059816, lng: 4.402592171306308}},
                      {name: "Denmark", position:{lat: 55.683162638474705, lng: 12.578043856763001}},
                      {name: "France",position: {lat: 48.86678603214452, lng: 2.3604402845586208}},
                      {name: 'Germany', position: {lat: 52.50263777659865, lng: 13.322435257847806}},
                      {name: 'Netherlands', position: {lat: 52.50263777659865, lng: 13.322435257847806}},
                      {name: "UK",position: {lat: 51.49548215158623, lng: 0.0489620744365672}},
                      {name: "US", position: {lat: 34.08116686114988, lng: -118.3862909155954}},],


            iconLogo: {
            url: "https://i.imgur.com/SuZueEb.png",
            scaledSize: {width: 50, height: 60}},

             //////////////////////////////////////////////////////////////
            
            // Setting initial state of reservation
            
            selectedStore: '',
            selectedBike: null,
            bikesModels: '',
            date: '',   
            status:'',

            // Configuration FlatPick library
            config: {
            monthSelectorType: 'static',
            dateFormat: 'd-m-Y',  
            disable:[],
            defaultDate: new Date().getDate(),
            minDate: new Date(),
            maxDate: new Date().fp_incr(45),
            inline: true,
            onChange: function(selectedDates, dateStr, instance){
                
                this.date = dateStr
                console.log('the date is changing ' + dateStr)
                self.getHours()
            }
            
        },  // Final object of the reservation, maybe we can add status of the reservation            
            reservation:{
                id:'',
                name:'',
                lastName:'',
                email:'',
                phone:'',
            },
            hour: '',
            
            // mock-up hours
            hours:[     
                        {name:'10:00 to 10:30', value:1000},
                        {name:'10:30 to 11:00', value:1030},
                        {name:'11:00 to 11:30', value:1100},
                        {name:'11:30 to 12:00', value:1130},
                        {name:'12:00 to 12:30', value:1200},
                        {name:'12:30 to 13:00', value:1230},
                        {name:'13:00 to 13:30', value:1300},
                        {name:'13:30 to 14:00', value:1330},
                        {name:'14:00 to 14:30', value:1400},
                        {name:'14:30 to 15:00', value:1430},
                        {name:'15:00 to 15:30', value:1500},
                        {name:'15:30 to 16:00', value:1530},
                        {name:'16:00 to 16:30', value:1600},
                        {name:'16:30 to 17:00', value:1630},
                        {name:'17:00 to 17:30', value:1700},
                        {name:'17:30 to 18:00', value:1730},
                    ],

            availableHours:[]
        }
    },
    methods:{
        showInMap(store){
            this.center = store,
            this.zoom = 15;
            // console.log(store)
            
        },
        editStore(){
            this.selectedStore = '',
            this.selectedBike = null,
            this.date = '',
            this.hour = ''
        },
        editBike(){
            this.selectedBike = null,
            this.date = '',
            this.hour = ''
        },
        editDate(){
            this.date = '',
            this.hour = ''
        },
        editHour(){
            this.hour = ''
        },
        async getStore(e){
            try {
                // Get bike models availables from stores
                this.status = 0
                this.selectedStore = e.target.id;
                const store = e.target.id.toLowerCase()
                const query = await fetch(`https://booking-system-e20e1-default-rtdb.firebaseio.com/stores/${store}/bikeModel.json`);
                const data = await query.json()
                this.status = query.status
                let arrayData = Object.values(data)
                this.bikesModels = arrayData
            } catch (error) {
                console.log(error) 
            } 
        },
        // Setting the bike in the state. 
        selectBike(id){
            this.selectedBike = id
        }, 
            async getHours(){
                    console.log('searching reservations')

                    this.availableHours = this.hours
                    // parsing the state to the DB. 

                    const store = this.selectedStore.toLowerCase()
                    const selectedBike = this.selectedBike.split(' ').join('').toLowerCase()

                    // getting the appointments for the bike selected in the store selected
                    
                    const query = await fetch(`https://booking-system-e20e1-default-rtdb.firebaseio.com/stores/${store}/bikeModel/${selectedBike}/appointments.json`);
                    const data = await query.json()
                    if(!data){
                        return
                    }   
                        let arrayHours = []
                        let arrayReservations = Object.values(data)
                        if(arrayReservations != ''){
                            arrayReservations.forEach( reservation =>{
                                if(this.date === reservation.date){
                                    arrayHours.push(reservation.hour)
                            }
                        })
                        // Filtering the array of reservation with the available hours  
                        this.availableHours = this.hours.filter(hour => !arrayHours.includes(hour.value));
                        }else {
                            this.availableHours = this.hours
                        }
                       
        },
        
        selectHour(hour){
            this.hour = hour 
        },
        async submitForm(){
            try {
            const store = this.selectedStore.toLowerCase();
            const selectedBike = this.selectedBike.split(' ').join('').toLowerCase()
            const reservationData = {
                name: this.reservation.name,
                lastName: this.reservation.lastName,
                emai: this.reservation.email,
                phone: this.reservation.phone,
                date: this.date,
                hour: this.hour.value
            }
            const query = await fetch(`https://booking-system-e20e1-default-rtdb.firebaseio.com/stores/${store}/bikeModel/${selectedBike}/appointments.json`,{
                method: "POST",
                body: JSON.stringify(reservationData)
            })
            const response = await query.json()
            if(response){
                console.log(response)
            }
             } catch (error) {
                console.log('error')
            }
        }
    },
    computed: {
           showCurrentReservation() { return this.selectedStore != '' ? ("hide") : ('list-group') }, 
           hideMap(){ return  this.selectedStore === '' ? ('') : ('hide') },
           showCards(){  return  this.selectedStore === '' ? ('hide') : ('card bikesCardContainer') }, 
           hideCards(){  return  this.selectedBike === null ? {} : {'display':'none'} }, 
           showDate(){  return  this.selectedBike === null ? ('hide') : ('dayPicker')  },
           showHours() { return this.date === '' ? ('hide') : ('list-group hours-list hoursContainer') },
           hideDayPicker(){ return this.hour === '' ? {} : {'display' : 'none'} },
           showForm() { return this.hour === '' ? ('hide') : ('rowForm') } ,
           hideContainer(){ return this.hour === '' ? "cardsContainer" :  "hide" },
           toggleForm(){ return  this.reservation.name != '' && this.reservation.lastName != '' && this.reservation.email != '' || this.reservation.phone != '' ? false : true  },
        },

    components: {
        flatPickr
    },
    }

</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
    *{
        font-family: Inter;;
    }
    /* .gifContainer{

    } */

    .confirmReservation{
        display:none;
        text-align: center;
        min-height: 70vh;
    }
    .storesContainer{
        /* overflow-y: scroll; */
         height: 70vh;
    }
    .showInMapButton{
        display: grid;
        justify-content: end;
        text-decoration: none;
        color: black;
        font-size: 11px;
    }
    .stateContainer{
        display: grid;
        grid-template-columns: 1fr 3fr  1fr;
        margin-bottom: 20px;
        align-items:center;
    }
    .stateContainer i {
        justify-self: end;
        margin-right: 5%;
        align-self: center;
        font-size: 20px;
    }
    .stateContainer p {
        justify-self: start;
        /* align-self: center; */
        margin: 0;
        font-size: 18px;

    }
    .hourText b{
        font-size: 16px;
    }

    .countryTitle{
        margin: 0
    }

    .stateContainer a{
        /* justify-self: end;
        align-self: start; */
        font-size: 11px;
        color: inherit;
        text-decoration: none;
        margin-right: 10px;
    }

    
    
    .form-group{
        margin-bottom: 3%
    }
    .dayPicker{
        margin: 0px auto;
        margin-bottom: 10%
    }
    .bookingContainer{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 20px ;
        min-height: 70vh;
    }
    .btnWidth{
        width: 100%
    }
    .cardsContainer{
        display: grid;
        grid-template-columns: 1fr 1fr
    }

    
    
    
    .rowForm{
            text-align: left;
            height: 40%;
            align-items: flex-start;
    }

    .hoursItems {
        padding: 0px;
        font-size: 14px;
    }

    .hoursContainer{
        margin-left: 10%;
        justify-self: stretch;
        height: 50vh;
        overflow-y: scroll;
    }

    .hide {
        display: none
    }
   

    .list-group-item{
        margin-bottom: 12px;
        box-shadow: 0 1px 1px 1px rgb(0 0 0 / 5%);
        padding: 16px 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        
 
    }
    .list-group-item.active{
        transition: background-color 0.3s ease;
        max-width: 100%;
        background-color: black;
        border: none;
        padding: 16px 20px;
    }

    .card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    margin-right: 30px;
    height:70%;
    cursor: pointer;
    align-self: stretch;
    }

    .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    .container {
    padding: 2px 16px;
    }

    .flatpickr-input {
        display: none;
    }

    .mateLogo{
        height: 35px;
        width: 35px;
        display: flex;
        margin-right: 5%;
    }
    .cardImg{
        width: 100%
    }

    .howWorksContainer{
        margin-top: 5%
    }

    .howTittleContainer{
        display: grid;
        grid-template-columns: 1fr 6fr;
        align-items: center;
    }


    .howTittleContainer hr {
        width: 95%;
        justify-self: center;
    }
    .statusReservation{
        background-color: #F9F9F9;
        width: 100%;
        padding: 15px 0;
        width: 70%;
        margin: 0 auto;
         box-shadow: 0 10px 6px -6px #777;
    }

    .stepsContainer{
        text-align: start;
        margin-top: 5%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 5%
    }
    /* Responsive CSS */
    /* @media(max-width: 1200px){
        card
    } */
   @media (max-width: 1200px) { 

    .showInMapButton{
        display: none;
    }

    .cardsContainer{
        margin-top: 5%;
        display: flex;
        flex-direction: column;
    }
    .bookingContainer{
        display: grid;
        grid-template-columns: 1fr
    }
    .card{
        width: 100%;
        flex-direction: row-reverse;
        width: 100%;
        align-items: center;
        margin-bottom: 3%;
    }

    /* .dayContainer{
           background-color: red;
           width: 100%;
   } */
    .cardImg{
        width: 15%;
        margin-right: 3%;
    }
    .hiddenMap {
        display: none;
    }
    .stepsContainer{
        grid-template-columns: 1fr;
        margin-top: 2%
    }

    }


    

</style>