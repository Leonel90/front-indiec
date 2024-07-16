<template>
  <header>
    <div class="logo">
      <span>indiEC</span>
    </div>
    <nav>
      <button class="open-player2" @click="goToLogin">Iniciar sesión</button>   
       </nav>
  </header>
  <main class="main1">
    <section class="intro">
      <h1>UNA EXPERIENCIA ÚNICA</h1>
      <div class="text-container">
        <p class="text1">
          Con nuestras funciones conseguirás la experiencia musical más personalizada que
          existe.
        </p>
        <p class="text2">
          Con nuestras funciones conseguirás la experiencia musical más personalizada que
          existe.
        </p>
        <p class="text3">
          Con nuestras funciones conseguirás la experiencia musical más personalizada que
          existe.
        </p>
      </div>
      <button class="register">Regístrate gratis</button>
      <div class="imagen"></div>
    </section>
  </main>
  <main class="main2">
    <section class="features">
      <h2>Nuestra Misión</h2>
      <p class="feature-text">
        En indiEC, creemos en el poder transformador de la música independiente. Nos
        dedicamos a proporcionar un espacio donde los artistas pueden compartir su
        creatividad sin restricciones y donde los oyentes pueden descubrir sonidos nuevos
        y emocionantes que no encontrarán en las plataformas convencionales.
      </p>
      <div class="imagen2"></div>
    </section>
  </main>
  <main class="main3">
    <section class="titulo">
      <h1>UTILIZA NUESTRA PAGINA</h1>
    </section>

    <div class="video-container">
      <video
        ref="videoElement"
        width="640"
        height="360"
        controls
        @mouseover="playVideo"
        @mouseleave="pauseVideo"
      >
        <source
          src="/img/invideo-ai-480 ¡Descubre cómo funciona nuestra web de m 2024-07-12 (1).mp4"
          type="video/mp4"
        />
        Tu navegador no soporta el elemento de video.
      </video>
    </div>
  </main>
</template>

<script>
export default {

  mounted() {
    window.addEventListener("scroll", this.checkVideoInView);
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    playVideo() {
      const video = this.$refs.videoElement;
      video.play();
    },
    pauseVideo() {
      const video = this.$refs.videoElement;
      video.pause();
    },
    checkVideoInView() {
      const video = this.$refs.videoElement;
      if (!video) return;

      const rect = video.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top >= 0 && rect.bottom <= windowHeight) {
        this.playVideo();
      } else {
        this.pauseVideo();
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.checkVideoInView);
  },
};



</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Oswald:wght@300;400;500;600;700&display=swap");
.main1 {
  background-image: url("/public/img/imagen8.png");
  background-size: cover;
  padding: 40px 20px;
  min-height: auto;
  flex: 1; /*mein es el contenedor principal */
  margin-top: 80px; /* Asegura que el contenido esté debajo del header */
  max-width: 2100px;
  background-position: calc(0% + 60px) calc(2% + 2px);
}
.main2 {
  background-image: url("/public/img/imagen5.png");
  background-size: cover;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  height: 80vh;
  max-width: 2100px;
  margin: 0 auto;
  margin-bottom: 5px;
}

.main3 {
  background-image: url("/public/img/imagen9\ .png");
  background-size: cover;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  height: 80vh;
  max-width: 2500px;
  margin: -10px auto;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #1a1a1a;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 80px;
  margin-bottom: 20px;
}

.imagen {
  background-image: url("/public/img/dezer4.webp.png");
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 340px;
  margin: 20px auto;
  animation: zoomEffect 10s infinite;
  overflow: visible;
}

@keyframes zoomEffect {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.imagen2 {
  background-image: url("/public/img/dezer3.webp.png");
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 340px;
  margin: 20px auto;
  animation: floatEffect 10s infinite;
  overflow: visible;
  border-radius: 10px; /* Agrega bordes redondeados si lo deseas */
  position: relative;
  bottom: 290px;
  left: 350px;
}

@keyframes floatEffect {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}

.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  position: relative;
  left: 345px;
  border-radius: 50px;
}

.titulo {
  font-family: "Roboto Slab";
  font-size: 45px;
  font-weight: 700;
  transition: color 0.3s ease, transform 10.3s ease;
  position: relative;
  top: 5px;
}

.titulo h1:hover {
  color: #ada7a7;
  transform: scale(1.1);
}

.feature-text {
  font-family: "Abezee";
  font-size: 40px;
  color: #ada7a7;
  font-weight: 500;
  display: inline-block; /* Hace que el texto se comporte como si estuviera dentro de un contenedor */
  width: 70%; /* Ocupa todo el ancho disponible */
  text-align: justify; /* Puedes ajustar la alineación según necesites */
  padding: 60px; /* Agrega relleno para simular el espacio del contenedor */
  margin: 0 20px; /* Agrega márgenes para controlar el espacio alrededor del texto */
  position: relative;
  right: 150px;
}

.logo {
  display: flex;
  align-items: center;
  background-image: url("/public/img/logo.png");
  background-size: contain;
  background-repeat: no-repeat;
  animation: shake 10.1s infinite; /* Aplica la animación 'shake' de 0.5 segundos de duración, infinitamente */
}

@keyframes shake {
  0% {
    transform: translateX(0);
  } /* Estado inicial */
  25% {
    transform: translateX(-5px) rotate(-5deg);
  } /* Movimiento hacia la izquierda */
  50% {
    transform: translateX(5px) rotate(5deg);
  } /* Movimiento hacia la derecha */
  75% {
    transform: translateX(-5px) rotate(-5deg);
  } /* Movimiento hacia la izquierda */
  100% {
    transform: translateX(0);
  } /* Vuelve al estado inicial */
}

.logo span {
  font-family: "Roboto Slab";
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  height: 50px;
  margin-left: 50px;
  position: relative;
  top: 5px;
}

.open-player2 {
  background: none;
  border: 1px solid #ffffff;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.5s ease;
}

.open-player2:hover {
  background-color: #122e56;
  border-color: #00202e;
  transform: scale(1.1);
}

.intro {
  text-align: center;
}

h1 {
  font-family: "Roboto Slab";
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 40px;
  color: #e6e6fa;
  transition: transform 0.1s ease-in-out, color 0.1s ease-in-out;
  animation: blinkEffect 10s infinite;
}

h1:hover {
  transform: scale(1);
  color: #fff;
}

@keyframes blinkEffect {
  0%,
  100% {
    opacity: 1;
  }
  5% {
    opacity: 0;
  }
}

.text-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  font-family: "Abezee";
}

.text-container p {
  flex: 1; /* Para que los párrafos ocupen el espacio disponible */
  margin-right: 260px; /* Espacio entre los párrafos */
}

.text1,
.text2,
.text3 {
  font-size: 20px;
  font-weight: 300;
  color: #b0b0b0;
  margin-bottom: 30px;
  width: 35%; /* Ajustar según necesites */
  animation-duration: 8s; /* Duración total de la animación */
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  white-space: nowrap; /* Evita que el texto se divida en varias líneas */
}

.text1 {
  animation-name: textEffect1;
}

.text2 {
  animation-name: textEffect2;
}

.text3 {
  animation-name: textEffect3;
}

@keyframes textEffect1 {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  10%,
  40% {
    opacity: 1;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
  90%,
  120% {
    opacity: 0;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
}

@keyframes textEffect2 {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  10%,
  40% {
    opacity: 1;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
  90%,
  120% {
    opacity: 1;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
}

@keyframes textEffect3 {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  10%,
  40% {
    opacity: 1;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
  90%,
  120% {
    opacity: 1;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
}

.register {
  background-color: #122e56;
  border: none;
  color: #ffffff;
  padding: 15px 30px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.5s ease;
  box-shadow: 0 10px 20px rgba(194, 193, 193, 0.2);
  position: relative;
  bottom: 6px;
}

.register:hover {
  background-color: #00202e;
  transform: scale(1.1);
}

.features {
  text-align: center;
  margin-top: 40px;
}

.features h2 {
  font-family: "Roboto Slab";
  font-size: 45px;
  font-weight: 700;
  transition: color 0.3s ease, transform 0.3s ease;
  position: relative;
  bottom: 50px;
}

.features h2:hover {
  color: #ada7a7;
  transform: scale(1.1);
}

.feature-text {
  font-family: "Abezee";
  font-size: 20px;
  color: #ada7a7;
  font-weight: 500;
  display: inline-block; /* Hace que el texto se comporte como si estuviera dentro de un contenedor */
  width: 30%; /* Ocupa todo el ancho disponible */
  text-align: justify; /* Puedes ajustar la alineación según necesites */
  padding: 10px; /* Agrega relleno para simular el espacio del contenedor */
  margin: 0 20px; /* Agrega márgenes para controlar el espacio alrededor del texto */
  position: relative;
  right: 360px;
  transition: color 0.3s ease; /* Añade una transición para el cambio de color */
}
.feature-text:hover {
  color: #ffffff; /* Cambia el color al pasar el mouse */
}
</style>
