<template>
  <div class="product-page">
    <main>
      <div class="product-grid">
        <div
          v-for="product in products"
          :key="product.name"
          class="product-card"
        >
          <!-- Imagem do produto -->
          <img
            :src="product.image_url"
            :alt="product.name"
            class="product-image"
          />

          <!-- Informações do produto -->
          <div class="product-info">
            <h2 class="product-name">{{ product.name }}</h2>
            <p class="product-description">{{ product.description }}</p>
          </div>

          <!-- Links do produto -->
          <ul class="product-links">
            <li
              v-for="link in product.product_links"
              :key="link.name"
              class="link-item"
            >
              <a
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="link-button"
              >
                <img
                  v-if="link.icon"
                  :src="`/src/assets/icons/${link.icon.toLowerCase()}.svg`"
                  :alt="link.name"
                  width="20"
                />
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

import tiktokIcon from '../assets/icons/tiktok.svg';
import amazonIcon from '../assets/icons/amazon.svg';
import instagramIcon from '../assets/icons/instagram.svg';
import twitterIcon from '../assets/icons/twitter.svg';
import shopeeIcon from '../assets/icons/shopee.svg';
import whatsappIcon from '../assets/icons/whatsapp.svg';


export default {
  name: "ProductsView",
  setup() {
    const route = useRoute();
    const products = ref([]);

    const icons = {
      tiktok: tiktokIcon,
      amazon: amazonIcon,
      instagram: instagramIcon,
      twitter: twitterIcon,
      shopee: shopeeIcon,
      whatsapp: whatsappIcon,
    };

    const getIcon = (iconName) => icons[iconName] || '';

    // Fetch products data
    const fetchProducts = async () => {
      const { username } = route.params;
      const url = `api/p/${username}`;

      try {
        const response = await axios.get(url);
        products.value = response.data;
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    // Call fetchProducts on mount
    fetchProducts();

    return {
      products,
      getIcon
    };
  },
};
</script>

<style scoped>
/* Estilos Gerais */
.product-page {
  background-color: #f8f8f8;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Garante que preencha toda a tela */
}

main {
  width: 100%;
  max-width: 1200px; /* Limita a largura máxima do container */
  margin: 0 auto;
}

/* Grid Responsivo */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  justify-items: center; /* Centraliza os cards no grid */
  align-content: center; /* Centraliza o conteúdo verticalmente */
  min-height: 100vh; /* Garante que o grid ocupe toda a tela */
}

/* Cartão do Produto */
.product-card {
  background-color: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  max-width: 800px; /* Limita a largura máxima dos cards */
  width: 100%;
}

/* Imagem do Produto */
.product-image {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  object-fit: cover;
}

/* Informações do Produto */
.product-info {
  margin-top: 1rem;
}

.product-name {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
}

.product-description {
  color: #666;
  font-size: 0.9rem;
}

/* Links do Produto */
.product-links {
  list-style: none;
  margin: 1rem 0 0 0;
  padding: 0;
  width: 100%;
}

.link-item {
  margin-bottom: 0.5rem;
}

.link-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #fffa;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 2px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  color: #333;
  text-decoration: none;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.link-button:hover {
  background-color: #f0f0f0;
  border-color: #bbb;
}
</style>
