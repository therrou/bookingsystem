<template>
  <div class="home">
    <!-- <img class='logo' alt="Vue logo" src="../assets/mateLogo.png"> -->
    <section class='headerImg'>
      <div class="container infoContainer">
          <div class='textContainer'>
              <h1> <b>  Take the MATE S & MATE X for a test ride </b>  </h1>
              <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum quam necessitatibus aut magni minus? Omnis sunt alias beatae cumque </p>
              <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, qui praesentium voluptatem provident nam repudiandae earum </p>
          <a href="#bookingGrid" class='btn btn-dark'>Try a MATE </a>
          </div>
          <div></div>
      </div>
        
       
    </section>
      <div class='secondaryTextContainer container' >
              <h1> <b>  Take the MATE S & MATE X for a test ride </b>  </h1>
              <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum quam necessitatibus aut magni minus? Omnis sunt alias beatae cumque </p>
              <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, qui praesentium voluptatem provident nam repudiandae earum </p>
          <a href="#bookingGrid" class='btn btn-dark'>Try a MATE </a>
          </div>
      <BookingGrid  />

  </div>
</template>

<script>
// @ is an alias to /src
import BookingGrid from './components/BookingGrid'

export default {
  name: 'Home',
  components: {
    BookingGrid,
    
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
    *{
        font-family: Inter;;
    } 
  .home{
    height: 100vh;
  }
  .logo{
    width: 100px;
    height: 100px;
  }
  .secondaryTextContainer{
    display: none;
  }

  img {
    max-width: 100%;
    height: auto;
}
  .infoContainer{
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100%;
    align-items: end;
}
  .textContainer{
    margin-bottom: 5%;
}
  
 
  .textContainer h1  {
    text-align: start;
    color:white;
  }
   .textContainer p  {
    text-align: start;
    color:white;
  }

  .headerImg{
    display: block;
    min-height: 617px;
    height: 70vh;
    background-size: cover;
    background-position: 50%;
    background-image: url('./assets/MateS.jpg');
    margin-bottom: 5%
  }
  a {
    padding: 10px 30px;
    border-radius: 30px;
    font-weight: 600;
  }

  a:hover{
    background-color: #0c67e7!important;
    border-color: #0c67e7!important;
    color: #fff!important;
    transition: color .3s cubic-bezier(.215,.61,.355,1),background-color .3s cubic-bezier(.215,.61,.355,1),border-color .3s cubic-bezier(.215,.61,.355,1);
  }

   @media (max-width: 1200px) { 
     .textContainer{
       display: none;
     }
     
      .secondaryTextContainer{
         display: block;
         text-align: start;
         margin-bottom: 5%;
  }

   }
</style>

