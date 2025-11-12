import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import coffeesData from "../data/coffee";

export const useFilterStore = defineStore("filter", () => {
  const isLoaded = ref(false);
  const coffeesExtended = reactive([]);
  const geographyVocabulary = reactive({
    Африка: [
      "Алжир",
      "Ангола",
      "Ботсвана",
      "Бурунди",
      "Гана",
      "Замбия",
      "Кения",
      "Ливан",
      "Марокко",
      "Мадагаскар",
      "Малави",
      "Намибия",
      "Руанда",
    ],
    Йемен: ["Йемен"],
    Уганда: ["Уганда"],
    Эфиопия: ["Эфиопия"],
    Азия: [
      "Австрия",
      "Азербайджан",
      "Албания",
      "Армения",
      "Афганистан",
      "Бахрейн",
      "Бельгия",
      "Болгария",
      "Босния",
      "Бруней",
      "Бутан",
      "Вьетнам",
      "Гватемала",
      "Германия",
      "Гренландия",
      "Греция",
      "Грузия",
      "Дания",
      "Израиль",
      "Индия",
      "Индонезия",
      "Иордания",
      "Ирак",
      "Иран",
      "Испания",
      "Италия",
      "Казахстан",
      "Кипр",
      "Киргизия",
      "Китай",
      "Кувейт",
      "Латвия",
      "Ливан",
      "Литва",
      "Малайзия",
      "Монголия",
      "Мьянма",
      "Непал",
      "Объединённые Арабские Эмираты",
      "Оман",
      "Пакистан",
      "Палестина",
      "Папуа-Новая Гвинея",
      "Саудовская Аравия",
      "Северная Корея",
      "Сингапур",
      "Сирия",
      "Суматра",
      "Таджикистан",
      "Таиланд",
      "Танзания",
      "Тимор",
      "Тунис",
      "Туркменистан",
      "Туркмения",
      "Турция",
      "Узбекистан",
      "Шри-Ланка",
      "Швейцария",
      "Южная Корея",
      "Япония",
    ],
    "Сев. Америка": ["Гавайи", "Канада"],
    Европа: ["Румыния", "Сербия", "Украина"],
    "Центр. Америка": ["Гватемала", "Никарагуа", "Панама", "Перу"],
    "Лат. Америка": [
      "Боливия",
      "Бразилия",
      "Доминиканская Республика",
      "Колумбия",
      "Коста-Рика",
      "Куба",
      "Эквадор",
      "Эль-Сальвадор",
      "Мексика",
      "Парагвай",
      "Перу",
      "Польша",
      "Финляндия",
      "Франция",
      "Хорватия",
      "Черногория",
      "Чехия",
      "Швеция",
      "Эстония",
      "Ямайка",
    ],
  });

  async function loadFilter() {
    setTimeout(() => {
      coffeesData.forEach((item) => {
          const kinds = item.details.map((d) => d.kind).sort();
          const kindDetail =
            kinds[0] != kinds[kinds.length - 1]
              ? "Смесь арабика/робуста"
              : kinds.length == 1
                ? kinds[0]
                : kinds[0] == "Арабика"
                  ? "Смесь арабик"
                  : "Робуста";
          const acidityDetail =
            item.hue.acidity <= 3
              ? "Низкая"
              : item.hue.acidity <= 6
                ? "Средняя"
                : "Высокая";
          const processingDetails = item.details.map((d) =>
            d["processing"] == "Сухой"
              ? "Сухая"
              : d["processing"] == "Мытая"
                ? "Мытая"
                : "Прочие",
          );
          const geographyDetails = item.details.map(
            (d) =>
              Object.keys(geographyVocabulary).find((key) =>
                geographyVocabulary[key].includes(d.geography),
              ) ?? d.geography,
          );

          coffeesExtended.push(
            Object.assign({}, item, {
              roastingDegree: item.roasting,
              geographyDetails,
              processingDetails,
              acidityDetail,
              actionsDetails: item.actions.map((a) => a),
              kindDetail,
            }),
          );
        });
        isLoaded.value = true;
      }, Math.random*1000);
    }

  
  return {
    coffeesExtended,
    isLoaded,
    loadFilter,
  };
});
