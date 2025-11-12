import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import articlesData from "../data/articles";

export const useArticlesStore = defineStore("articles", () => {
  const isLoaded = ref(false);
  const articles = reactive([]);
  const news = reactive([]);
  const tags = reactive([]);

  async function loadArticles() {
      setTimeout(() => {
        articlesData.forEach((el) => {
          articles.push(el);
          news.push(el);
          if (!tags.includes(el.tag)) tags.push(el.tag);
        });
        isLoaded.value = true;
        console.log(articles)
      }, Math.random*1000);
  }


  function getFullInfo(itemId) {
    return articles.find((i) => i.id === itemId);
  }

  function getTitle(itemId) {
    return articles.find((i) => i.id === itemId)
      ? articles.find((i) => i.id === itemId).title
      : "";
  }

  return {
    loadArticles,
    isLoaded,
    getFullInfo,
    articles,
    news,
    getTitle,
    tags,
  };
});
