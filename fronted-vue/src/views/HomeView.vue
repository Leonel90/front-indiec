<template>
    <div id="app">
      <!-- Sección del Encabezado -->
      <div class="header">
        <div class="logo-container">
          <transition name="fade">
            <img v-if="showLogo" src="@/assets/logotipol.png" alt="Logo IndiEc" class="logo-image">
          </transition>
          <div class="logo">IndiEc</div>
        </div>
        <div class="botones-autenticacion">
          <button class="iniciar-sesion">Iniciar sesión</button>
        </div>
      </div>
  
      <!-- Sección de Avatar y Textos -->
      <div class="avatar-section">
        <div class="avatar">
          <a href="https://codepen.io/MarioDesigns/">
            <img src="@/assets/avatar.jpg" alt="avatar">
          </a>
        </div>
        <div class="contenido">
          <h1>Bienvenido Daddy Yankee</h1>
          <p>Crea tu Avatar y forma parte de nosotros</p>
          <button class="registrarse-gratis">Regístrate gratis</button>
          <p>Disfruta tu experiencia</p>
        </div>
      </div>
  
      <!-- Sección About Us -->
      <div class="about-us">
        <div class="about-us-content">
          <img src="@/assets/cargando.png" alt="About Us Image" class="about-us-image">
          <div class="about-us-text">
            <h2>Cansado de <span>Esperar</span></h2>
            <p>Te brindamos una mayor comodidad gracias a que nuestra pagina esta optimizada de la mejor forma para que sigas disfrutando sin interrupciones.</p>
            <p>Que esperas para continuar disgrutando tu lista de reproduccion favorita</p>
            <button class="learn-more">Baja para más información</button>
          </div>
        </div>
      </div>
  
      <!-- Sección de Carrusel de Imágenes -->
      <div class="carousel">
            <transition name="fade">
                <img :src="currentImage" :key="currentIndex" class="carousel-image">
               </transition>
      </div>
  
      <!-- Sección de Reproductor de Música -->
      <div class="music-box" v-for="n in 3" :key="n">
          <div class="music-box-content">
              <img src="@/assets/Paulo.jpg" alt="Imagen del Artista">
              <h3>Nombre del Artista</h3>
              <h4>Título de la Canción</h4>
               <audio :src="require (`@/assets/music${n}.mp3`)" controls autoplay></audio>
          </div>
       </div>
  
      <!-- Sección de Video -->
      <main>
        <video controls autoplay muted width="600" class="video">
          <source src="@/assets/videoprueba.mp4" type="video/mp4">
          Tu navegador no soporta el elemento de video.
        </video>
      </main>
  
      <!-- Secciones Dinámicas -->
      <div class="scroll-text" v-show="showScrollText">Este texto aparece al bajar</div>
      <div class="dynamic-text">Este es otro texto que aparece dinámicamente</div>
  
      <!-- Sección de Música Detallada -->
      <div class="music-section">
        <div class="album-cover">
          <img src="@/assets/Paulo.jpg" alt="Drake">
        </div>
        <div class="music-details">
          <h2>01. Plan "A"</h2>
          <span>3.33 Min</span>
          <audio controls>
            <source src="@/assets/Nopuedo.mp3" type="audio/mpeg">
            Tu navegador no soporta el elemento de audio.
          </audio>
          <ul>
            <li v-for="(track, index) in tracks" :key="index">
              <span>{{ track.number }}. {{ track.title }}</span>
              <span>{{ track.duration }}</span>
              <button @click="playTrack(track)">▶</button>
            </li>
          </ul>
        </div>
        <div class="lyrics">
          <h3>Lyrics</h3>
          <p>Paulo Ezequiel Londra (Córdoba, 12 de abril de 1998) es un cantante y compositor argentino.</p>
          <h3>Artista</h3>
          <p>Paulo Londra</p>
          <h3>Album</h3>
          <p>Liones con Flow</p>
          <h3>Año</h3>
          <p>2018</p>
          <h3>Genero</h3>
          <p>R&B latino trap latino pop latino rock latino dance freestyle rap</p>
          <button class="more-audio">View More Audio</button>
        </div>
      </div>
  
      <!-- Sección de Ranking de Artistas -->
      <div class="ranking-section">
        <h2>Ranking de Artistas</h2>
        <div class="ranking">
          <div v-for="(artist, index) in artists" :key="artist.name" class="artist">
            <div class="circle">
              <img :src="artist.image" :alt="artist.name">
            </div>
            <div class="bar-container">
              <div class="bar" :style="{ height: artist.plays + '%' }">
                <span>{{ artist.plays }}%</span>
              </div>
            </div>
            <p>{{ artist.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    data() {
      return {
        showScrollText: false,
        showLogo: true,
        tracks: [
          { number: '01', title: "No Puedo", duration: '3.33 Min' },
          { number: '02', title: 'Relax', duration: '3.30 Min' },
          { number: '03', title: 'Paracaídas ', duration: '3.18 Min' },
          { number: '04', title: 'Julieta', duration: '4.11 Min' },
          { number: '05', title: 'Ella', duration: '5.05 Min' },
          { number: '06', title: 'Luces', duration: '5.59 Min' },
          { number: '07', title: 'Chanse', duration: '3.33 Min' },
          { number: '08', title: 'Julieta', duration: '3.33 Min' },
          { number: '09', title: 'Adan y Eva', duration: '4.33 Min' },
        ],
        artists: [
          { name: 'Bad Bunny', plays: 100, image: require('@/assets/Paulo.jpg') },
          { name: 'Rauw Alejandro', plays: 80, image: require('@/assets/Paulo.jpg') },
          { name: 'J Balvin', plays: 60, image: require('@/assets/Paulo.jpg') },
          { name: 'Daddy Yankee', plays: 40, image: require('@/assets/Paulo.jpg') },
          { name: 'Karol G', plays: 20, image: require('@/assets/Paulo.jpg') },
        ],
      };
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      setInterval(() => {
        this.showLogo = !this.showLogo;
      }, 3000); // Alterna el estado de showLogo cada 3 segundos
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        if (window.scrollY > 100) {
          this.showScrollText = true;
        }
      },
      playTrack(track) {
        // Aquí puedes agregar la lógica para reproducir la pista seleccionada
        console.log (`Reproduciendo: ${track.title}`);
      },
    },
  };
  </script>
  
  <style scoped>
  @import 'animate.css';
  
  body,
  html {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Helvetica', sans-serif;
    background: rgb(26, 188, 156);
    background: -moz-linear-gradient(-45deg, rgba(26, 188, 156, 1) 0%, rgba(142, 68, 173, 1) 100%);
    background: -webkit-linear-gradient(-45deg, rgba(26, 188, 156, 1) 0%, rgba(142, 68, 173, 1) 100%);
    background: linear-gradient(135deg, rgba(26, 188, 156, 1) 0%, rgba(142, 68, 173, 1) 100%);
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(2, 2, 2);
    padding: 10px 20px;
    color: white;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
    text-align: center;
  }
  
  .logo {
    font-size: 24px;
    font-weight: bold;
    margin-left: 10px;
  }
  
  .logo-image {
    width: 50px;
    height: auto;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  
  .botones-autenticacion {
    display: flex;
    justify-content: flex-end; /* Coloca el botón en la esquina superior derecha */
    width: 100%;
  }
  
  .iniciar-sesion {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    background: transparent;
    color: white;
    border: 2px solid white;
  }
  
  .avatar-section {
    width: 100%;
    height: calc(100vh - 60px); /* Ajusta la altura para llenar la ventana menos la altura del encabezado */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, rgba(197, 38, 241, 1) 0%, rgba(26, 188, 156, 1) 50%, rgba(142, 68, 173, 1) 100%);
  }
  
  .avatar {
    width: 150px;
    height: 150px;
    box-sizing: border-box;
    border: 5px solid white;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
    transform: translateY(0px);
    animation: flotar 6s ease-in-out infinite;
  }
  
  .avatar img {
    width: 100%;
    height: auto;
  }
  
  .contenido {
    width: 100%;
    max-width: 600px;
    padding: 20px 40px;
    box-sizing: border-box;
    text-align: center;
  }
  
  .registrarse-gratis {
    background-color: rgb(169, 30, 255); /* Azul */
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    margin-top: 20px;
  }
  
  
.carousel {
  width: 100%;
  max-width: 600px; /* Ajusta el ancho máximo según tu diseño */
  margin: 20px auto; /* Centra el carrusel horizontalmente */
}

.carousel-image {
  width: 100%;
  height: auto;
}
  
  .music-box {
  width: 30%;
  background: linear-gradient(135deg, #4caf50, #2196f3); /* Fondo con degradado verde y azul */
  padding: 10px;
  margin: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.music-box-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}

.music-box img {
  width: 100px; /* Ajusta el tamaño de la imagen según sea necesario */
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}
  
  .audio {
    width: 100%;
  }
  
  .video {
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
  }
  
  .scroll-text {
    position: fixed;
    bottom: 10px;
    right: 10px;
    background: rgba(0,0,0,0.7);
    color: white;
    padding: 10px;
    border-radius: 5px;
  }
  
  .dynamic-text {
    margin: 20px auto;
    text-align: center;
    font-size: 18px;
  }
  
  /* Estilos para la sección de música detallada */
  .music-section {
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
    padding: 20px;
    background-color: #1e1e1e;
    color: white;
  }
  
  .album-cover img {
    width: 300px;
    height: auto;
  }
  
  .music-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  
  .music-details h2 {
    margin: 0;
  }
  
  .music-details span {
    margin: 5px 0;
  }
  
  .music-details ul {
    list-style: none;
    padding: 0;
  }
  
  .music-details ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
  }
  
  .lyrics {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  
  .lyrics h3 {
    margin: 10px 0 0 0;
  }
  
  .more-audio {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    background: #d9534f;
    color: white;
    border-radius: 5px;
    margin-top: 20px;
  }
  
  @keyframes flotar {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes slide {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }
  
  /* Estilos para la sección About Us */
  .about-us {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    padding: 40px 0;
  }
  
  .about-us-content {
  display: flex;
  max-width: 1200px;
  width: 100%;
  background-color: #f5f5f5; /* Fondo gris */
  color: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  background: linear-gradient(135deg, #f1b143, #9d03fd); /* Fondo con degradado rosa y gris */
}
  
  .about-us-image {
    width: 50%;
    height: auto;
    margin-right: 20px;
  }
  
  .about-us-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .about-us-text h2 {
    font-size: 36px;
    margin-bottom: 20px;
  }
  
  .about-us-text h2 span {
    color: #d4af37;
  }
  
  .about-us-text p {
    margin-bottom: 20px;
  }
  
  .learn-more {
    background-color: #d4af37;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
  }
  
  /* Estilos para la sección de ranking */
  .ranking-section {
    background-color: #f5f5f5;
    padding: 20px 0;
  }
  
  .ranking {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 300px;
    margin: 20px 0;
  }
  
  .artist {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    margin: 0 10px;
  }
  
  .circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 10px;
  }
  
  .circle img {
    width: 100%;
    height: auto;
  }
  
  .bar-container {
    width: 50px;
    height: 100px;
    background-color: #ddd;
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;
  }
  
  .bar {
    width: 100%;
    background-color: #4caf50;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    color: white;
    font-weight: bold;
    padding-bottom: 5px;
  }
  </style>

