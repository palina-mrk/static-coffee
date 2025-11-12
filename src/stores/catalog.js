import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import coffeesData from "../data/coffee";
import teasData from "../data/teas";
import vendingsData from "../data/vending";
import healthiesData from "../data/healthy";

export const useCatalogStore = defineStore("catalog", () => {
  const isLoaded = ref(false);
  const catalog = reactive([]);
  const coffees = reactive([]);
  const coffeeSales = reactive([]);
  const teas = reactive([]);
  const healthies = reactive([]);
  const vendings = reactive([]);

  async function loadCatalog() {
    setTimeout(() => {
      coffeesData.forEach((el) => {
        catalog.push(el);
        coffees.push(el);
        if (el.actions.includes("Скидки")) coffeeSales.push(el);
      });
      teasData.forEach((el) => {
        catalog.push(el);
        teas.push(el);
      });
      vendingsData.forEach((el) => {
        catalog.push(el);
        vendings.push(el);
      });
      healthiesData.forEach((el) => {
        catalog.push(el);
        healthies.push(el);
      });
        isLoaded.value = true;
      }, Math.random*1000);
    }

  function getPrice(itemId, weight) {
    return getSellInfo(itemId, weight).price;
  }

  function getTitle(itemId) {
    return catalog.find((i) => i.id === itemId)
      ? catalog.find((i) => i.id === itemId).title
      : "";
  }

  function getCategory(itemId) {
    switch (catalog?.find((i) => i.id === itemId)?.category) {
      case "coffee":
        return "кофе";
      case "tea":
        return "чая";
      case "healthy":
        return "для здорового питания";
      case "vending":
        return "для вендинга";
      default:
        return "";
    }
  }

  function getKind(itemId) {
    const item = catalog.find((i) => i.id == itemId);
    if (item.category != "coffee") return item.kind;

    const kinds = item.details.map((d) => d.kind);
    if (kinds.length == 1) return kinds[0];
    else if (!kinds.includes("Арабика")) return "Робуста";
    else if (!kinds.includes("Робуста")) return "Смесь арабик";
    else return "Смесь арабикa/робуста";
  }

  function getShortDescription(itemId) {
    const item = catalog.find((i) => i.id == itemId);
    if (item.category != "coffee") return item.kind;

    if (item.details.length == 1)
      return `${Object.values(item.details[0])
        .filter((str) => str != "Detail" && str != undefined)
        .join(", ")}`;

    const kinds = item.details.map((d) => d.kind);
    if (!kinds.includes("Арабика")) return "Робуста, смесь";
    else if (!kinds.includes("Робуста")) return "Смесь арабик";
    else return "Смесь арабикa/робуста";
  }

  function getFullInfo(itemId) {
    return catalog.find((i) => i.id === itemId);
  }

  function getSellInfo(itemId, weight) {
    return catalog
      .find((i) => i.id == itemId)
      .weights.find((w) => w.value == weight);
  }

  function getSaleIndexes() {
    return catalog
      .filter((i) => i.actions.includes("Скидки"))
      .map((i) => i.id)
      .sort();
  }

  return {
    isLoaded,
    catalog,
    coffees,
    teas,
    vendings,
    healthies,
    coffeeSales,
    loadCatalog,
    getPrice,
    getFullInfo,
    getSellInfo,
    getSaleIndexes,
    getShortDescription,
    getKind,
    getTitle,
    getCategory,
  };
});
