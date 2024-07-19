<template>
  <div>
    <div class="navbar">
      <div class="stars">
        <div v-for="n in 20" :key="n" class="star"></div>
      </div>
      <div class="logo-section">
        <img src="@/assets/logoact.png" alt="Logo" class="logo">
        <p class="logo-name">IndiEc</p>
      </div>
      <div class="welcome-section">
        <p class="welcome-message">Bienvenido</p>
      </div>
    </div>
    
    <div class="main-content">
      <div class="stars">
        <div v-for="n in 20" :key="n" class="star"></div>
      </div>
      <div class="avatar-background">
        <div class="avatar-section">
          <div class="avatar-circle">
            <img src="@/assets/avatar.jpg" alt="Avatar" class="avatar">
          </div>
          <p class="create-avatar">Unete y se uno más de la familia</p>
          <button class="register-button">Regístrate</button>
        </div>
      </div> 


      <div class="carousel">
        <div 
        class="carousel-slide"
         v-for="(slide, index) in slides"
         :key="index"
          :style="{ backgroundImage: `url(${slide.image})`, backgroundColor: slide.color }"
         :class="{ active: currentSlide === index }">
       </div>
      </div>


      <div class="description-section">
        <img src="@/assets/fondo25.jpg" alt="Imagen de Descripción" class="description-image">
        <div class="description-text">
          <h2>Te contamos más sobre nosotros</h2>
          <p>Somos IndiEc, la página que te brindará un servicio de música sin límites y con alta calidad de sonido sin interrupciones con tus artistas favoritos y una administración de calidad.</p>
        </div>
      </div>

      <div class="video-section">
          <video id="myVideo" src="@/assets/videoprueba.mp4" autoplay muted loop></video>
          <div class="video-background"></div>
      </div>


      <div class="help-container" :class="{ expanded: helpVisible }">
          <button @click="toggleHelp" class="help-button">&#9835;</button>
        <div v-if="helpVisible" class="help-message">
          Regístrate
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TuComponente',
  data() {
    return {
      slides: [
        { image: require('@/assets/publi1.png'), color: '#ff7f50' }, // Cambia los colores y las rutas según tus imágenes
        { image: require('@/assets/gitp.png'), color: '#6a5acd' },
        { image: require('@/assets/edit.png'), color: '#20b2aa' },
        { image: require('@/assets/foto.png'), color: '#ff6347' },
        { image: require('@/assets/nue.png'), color: '#4682b4' }
      ],
      currentSlide: 0,
      helpVisible: false,
    };
  },
  mounted() {
    this.startCarousel();
  },
  methods: {
    startCarousel() {
      setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      }, 3000); // Cambia el intervalo según tus necesidades
    },
    toggleHelp() {
      this.helpVisible = !this.helpVisible;
    },
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  background: linear-gradient(to right, rgb(184, 51, 224), rgb(48, 48, 48));
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.stars {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  opacity: 0;
  animation: shootingStar 3s linear infinite;
}

@keyframes shootingStar {
  0% {
    transform: translateX(-100%) translateY(-100%);
    opacity: 1;
  }
  100% {
    transform: translateX(200%) translateY(200%);
    opacity: 0;
  }
}

.star:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
.star:nth-child(2) { top: 20%; left: 20%; animation-delay: 0.3s; }
.star:nth-child(3) { top: 30%; left: 30%; animation-delay: 0.6s; }
.star:nth-child(4) { top: 40%; left: 40%; animation-delay: 0.9s; }
.star:nth-child(5) { top: 50%; left: 50%; animation-delay: 1.2s; }
.star:nth-child(6) { top: 60%; left: 60%; animation-delay: 1.5s; }
.star:nth-child(7) { top: 70%; left: 70%; animation-delay: 1.8s; }
.star:nth-child(8) { top: 80%; left: 80%; animation-delay: 2.1s; }
.star:nth-child(9) { top: 90%; left: 90%; animation-delay: 2.4s; }
.star:nth-child(10) { top: 15%; left: 25%; animation-delay: 2.7s; }
.star:nth-child(11) { top: 25%; left: 35%; animation-delay: 3.0s; }
.star:nth-child(12) { top: 35%; left: 45%; animation-delay: 3.3s; }
.star:nth-child(13) { top: 45%; left: 55%; animation-delay: 3.6s; }
.star:nth-child(14) { top: 55%; left: 65%; animation-delay: 3.9s; }
.star:nth-child(15) { top: 65%; left: 75%; animation-delay: 4.2s; }
.star:nth-child(16) { top: 75%; left: 85%; animation-delay: 4.5s; }
.star:nth-child(17) { top: 85%; left: 95%; animation-delay: 4.8s; }
.star:nth-child(18) { top: 5%; left: 15%; animation-delay: 5.1s; }
.star:nth-child(19) { top: 95%; left: 5%; animation-delay: 5.4s; }
.star:nth-child(20) { top: 50%; left: 50%; animation-delay: 5.7s; }

.logo-section {
  display: flex;
  align-items: center;
  position: relative; /* Asegura que los elementos absolutos se posicionen correctamente */
}

.logo {
  width: 75px;
  height: auto;
  margin-right: 10px;
  animation: moveLogo 2s infinite alternate;
}

.logo-name {
  font-size: 20px;
  font-weight: bold;
  color: white;
  position: relative; /* Asegura que los elementos absolutos se posicionen correctamente */
  overflow: hidden; /* Oculta el contenido que se desborda */
}

.logo-name::before {
  content: attr(data-text); /* Utiliza el valor del atributo data-text como contenido */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent 50%, white 50%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: disintegrate 2s forwards;
  overflow: hidden; /* Asegura que el contenido que se desborda se oculte */
}

@keyframes disintegrate {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}

@keyframes moveLogo {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(10px);
  }
}


.welcome-section {
  display: flex;
  align-items: center;
}

.welcome-message {
  font-size: 40px;
  margin-right: 649px;
  font-family: 'Rockwell', sans-serif;
  animation: fadeInOut 3s infinite;
  color: white;
}


@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}


.stars {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  opacity: 0;
  animation: shootingStar 3s linear infinite;
}

@keyframes shootingStar {
  0% {
    transform: translateX(-100%) translateY(-100%);
    opacity: 1;
  }
  100% {
    transform: translateX(200%) translateY(200%);
    opacity: 0;
  }
}

.star:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
.star:nth-child(2) { top: 20%; left: 20%; animation-delay: 0.3s; }
.star:nth-child(3) { top: 30%; left: 30%; animation-delay: 0.6s; }
.star:nth-child(4) { top: 40%; left: 40%; animation-delay: 0.9s; }
.star:nth-child(5) { top: 50%; left: 50%; animation-delay: 1.2s; }
.star:nth-child(6) { top: 60%; left: 60%; animation-delay: 1.5s; }
.star:nth-child(7) { top: 70%; left: 70%; animation-delay: 1.8s; }
.star:nth-child(8) { top: 80%; left: 80%; animation-delay: 2.1s; }
.star:nth-child(9) { top: 90%; left: 90%; animation-delay: 2.4s; }
.star:nth-child(10) { top: 15%; left: 25%; animation-delay: 2.7s; }
.star:nth-child(11) { top: 25%; left: 35%; animation-delay: 3.0s; }
.star:nth-child(12) { top: 35%; left: 45%; animation-delay: 3.3s; }
.star:nth-child(13) { top: 45%; left: 55%; animation-delay: 3.6s; }
.star:nth-child(14) { top: 55%; left: 65%; animation-delay: 3.9s; }
.star:nth-child(15) { top: 65%; left: 75%; animation-delay: 4.2s; }
.star:nth-child(16) { top: 75%; left: 85%; animation-delay: 4.5s; }
.star:nth-child(17) { top: 85%; left: 95%; animation-delay: 4.8s; }
.star:nth-child(18) { top: 5%; left: 15%; animation-delay: 5.1s; }
.star:nth-child(19) { top: 95%; left: 5%; animation-delay: 5.4s; }
.star:nth-child(20) { top: 50%; left: 50%; animation-delay: 5.7s; }
.star:nth-child(21) { top: 25%; left: 35%; animation-delay: 5.8s; }
.star:nth-child(22) { top: 35%; left: 45%; animation-delay: 5.9s; }
.star:nth-child(23) { top: 45%; left: 55%; animation-delay: 2.6s; }
.star:nth-child(24) { top: 55%; left: 65%; animation-delay: 3.9s; }
.star:nth-child(25) { top: 65%; left: 75%; animation-delay: 4.2s; }
.star:nth-child(26) { top: 75%; left: 85%; animation-delay: 2.5s; }
.star:nth-child(27) { top: 85%; left: 95%; animation-delay: 1.8s; }
.star:nth-child(28) { top: 5%; left: 15%; animation-delay: 2.1s; }
.star:nth-child(29) { top: 95%; left: 5%; animation-delay: 1.4s; }
.star:nth-child(30) { top: 50%; left: 50%; animation-delay: 1.7s; }
.star:nth-child(31) { top: 10%; left: 10%; animation-delay: 6s; }
.star:nth-child(32) { top: 20%; left: 20%; animation-delay: 0.5s; }
.star:nth-child(33) { top: 30%; left: 30%; animation-delay: 0.9s; }
.star:nth-child(34) { top: 40%; left: 40%; animation-delay: 0.9s; }
.star:nth-child(35) { top: 50%; left: 50%; animation-delay: 3.2s; }
.star:nth-child(36) { top: 60%; left: 60%; animation-delay: 3.5s; }
.star:nth-child(37) { top: 70%; left: 70%; animation-delay: 3.8s; }
.star:nth-child(38) { top: 80%; left: 80%; animation-delay: 3.1s; }
.star:nth-child(39) { top: 90%; left: 90%; animation-delay: 2.4s; }
.star:nth-child(40) { top: 15%; left: 25%; animation-delay: 2.7s; }

.main-content {
  padding: 20px;
  background: linear-gradient(to bottom, rgb(48, 0, 103), rgb(27, 48, 122), rgb(0, 48, 64));
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}



.carousel {
  position: center;
  width: 90%;
  height: 600px; /* Ajusta según tus necesidades */
  overflow: hidden;
  border-radius: 10px;
  margin-top: 80px;
}

.carousel-slide {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(20%, -50%);
  margin-top: 100px;
  left: 50%;
  width: 70%;
  height: 120%;
  background-size: cover;
  background-position: center;
  transition: left 1s ease-in-out;
  z-index: -1;
}

.carousel-slide.active {
  left: 0;
  margin-top: 0px;
  z-index: 1;
}

.carousel-slide:nth-child(1).active {
  background-color: #ff7f50;
}

.carousel-slide:nth-child(2).active {
  background-color: #6a5acd;
}

.carousel-slide:nth-child(3).active {
  background-color: #20b2aa;
}

.carousel-slide:nth-child(4).active {
  background-color: #ff6347;
}

.carousel-slide:nth-child(5).active {
  background-color: #4682b4;
}




.description-section {
  display: flex;
  align-items: center;
  margin-top: 90px;
}

.description-image {
  border-radius: 10px;
  margin-right: -10px;
  width: 50%;
  height: 400px;
  display: flex;
}

.description-text {
  color: white;
}

.description-text h2 {
  margin: 70px;
  font-family: 'Rockwell', sans-serif;
}

.description-text p {
  margin: 70px;
  font-family: 'Gill Sans', sans-serif;
}
/* Parte final descripcion */


/* Parte del avatar */
.avatar-background {
  background-image: url('@/assets/fondo21.jpg');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-section {
  text-align: center;
}

.avatar-circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  animation: moveAvatar 5s infinite;
}

.avatar {
  width: 100%;
  height: auto;
}

@keyframes moveAvatar {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.create-avatar {
  font-size: 20px;
  margin-top: 10px;
  font-family: 'Gill Sans', sans-serif;
  color: white;
}

.register-button {
  margin-top: 10px;
  padding: 10px 20px;
  border: 10;
  background-color: purple;
  color: white;
  cursor: pointer;
  border-radius: 20px;
}
/* Parte final del avatar */


/* Parte del video*/
.video-section {
  margin-top: 70px;
  position: relative;
  overflow: hidden;
  border: 10px solid transparent; /* Ancho del borde ajustable */
  border-image: linear-gradient(135deg, #8a2be2, #4169e1) 1;
  border-image-slice: 5; /* Ajusta la anchura del borde */
}

.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  z-index: 1;
}



.help-container {
  position: fixed;
  bottom: 20px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 10;
}

.help-button {
  background: linear-gradient(135deg, #ff8acb, #89c6ff);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 11;
}

.help-message {
  position: absolute;
  bottom: 60px; /* Adjust this value based on the button's size and spacing */
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  border-radius: 20px;
  font-size: 14px;
  width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 10;
}
</style>
