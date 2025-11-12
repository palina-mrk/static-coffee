import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { useCatalogStore } from "./stores/catalog";
import { useFilterStore } from "./stores/filter";
import { useArticlesStore } from "./stores/articles";

const app = createApp(App);
app.use(router);
app.use(createPinia());

const catalogStore = useCatalogStore();
const filterStore = useFilterStore();
const articlesStore = useArticlesStore();
catalogStore.loadCatalog();
filterStore.loadFilter();
articlesStore.loadArticles();

app.mount("#app");
