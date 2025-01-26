<template>
  <div>
    <main>
      <!-- Header com informações do usuário -->
      <header>
        <img :src="profile.avatar" alt="Profile Picture" />
        <a href="#">
          <h1>@{{ profile.first_name }}</h1>
        </a>
        <p>{{ profile.bio }}</p>
      </header>

      <!-- Lista de redes sociais -->
      <ul>
        <li v-for="social in socials" :key="social.id">
          <a :href="social.url" target="_blank" rel="noopener noreferrer">
            <img
              v-if="social.icon"
              :src="`/src/assets/icons/${social.icon.toLowerCase()}.svg`"
              :alt="social.name"
              width="20"
            />
            {{ social.name }}
          </a>
        </li>

        <li v-if="products.length > 0">
          <a :href="urlProducts" target="_blank" rel="noopener noreferrer">
            <img
              :src="`/src/assets/icons/products.svg`"
              alt="produtos"
              width="20"
            />
            Meus Produtos
          </a>
        </li>
      </ul>

      <!-- Rodapé -->
      <footer></footer>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  name: 'BioView',
  setup() {
    const route = useRoute();
    const profile = ref({});
    const socials = ref([]);
    const products = ref([]);
    const { username } = route.params;
    const urlProducts = `/p/${username}`;

    //alterar o titulo da página
    document.title = `Bio de ${username}`;

    // Função para buscar os dados do perfil
    const fetchBio = async () => {
      const url = `api/b/${username}`;

      try {
        const response = await axios.get(url);
        console.log(response)
        profile.value = response.data.profile; // Dados do perfil
        socials.value = response.data.socials; // Redes sociais
        products.value = response.data.products; // Produtos

        console.log(products.value.length)
      } catch (error) {
        console.error('Error fetching bio', error);
      }
    };

    // Carregar dados ao montar o componente
    fetchBio();

    return {
      profile,
      socials,
      products,
      urlProducts
    };
  },
};
</script>

<style scoped>
/* Estilos principais para o layout */
body,
html {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  background: url(./images/background.jpg) no-repeat center center fixed;
  background-size: cover;
  color: #fff;
}

main {
  position: relative;
}

header {
  margin-top: 3em;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

header > img {
  width: 7em;
  height: 7em;
  border-radius: 100%;
  border: 4px solid #1B1B1B;
  box-shadow: 5px 5px 15px 5px #1B1B1B;
}

header > a > h1 {
  font-size: 1.5em;
  font-weight: bold;
  border-radius: 1em;
  background-color: #1B1B1B;
  color: #fff;
  padding: 0.3em 0.6em;
  border: 2px solid #fff;
  backdrop-filter: blur(10px) saturate(160%) contrast(180%);
}

header > p {
  text-align: center;
  font-weight: bold;
  text-shadow: 2px 2px 3px #1B1B1B;
}

ul {
  list-style: none;
  margin: 0 auto;
  padding: 2em;
  max-width: 480px;
}

ul > li {
  background-color: #fffa;
  backdrop-filter: blur(10px) saturate(160%) contrast(180%);
  border: 4px solid #1B1B1B;
  border-radius: 0.9em;
  margin: 1.4em 0;
  box-shadow: 5px 5px 15px 5px #1B1B1B;
}

ul > li > a {
  display: flex;
  align-items: center;
  padding: 1em;
  color: #1B1B1B;
  text-decoration: none;
}

footer {
  font-weight: bold;
  margin-top: 1em;
  text-align: center;
  text-shadow: 2px 2px 3px #1B1B1B;
}
</style>
