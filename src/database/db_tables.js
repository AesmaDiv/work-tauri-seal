export const RECORD_SEARCH_COLUMNS = [
  { col: 1, row: 1, name: "datetest", label: "Дата испытания"},
  { col: 1, row: 3, name: "customer", label: "Заказчик"},
  { col: 1, row: 4, name: "ordernum", label: "Наряд-заказ" },
  { col: 1, row: 6, name: "producer", label: "Производитель" },
  { col: 1, row: 7, name: "serial",   label: "Заводской номер" },
  { col: 1, row: 8, name: "sealtype", label: "Тип ГЗ"},
]
export const RECORD_COLUMNS = [
  ...RECORD_SEARCH_COLUMNS,
  // { col: 0, row: 0, name: "id",       label: "Номер записи"},
  { col: 1, row: 2, name: "daterecv", label: "Дата поступления"},
  { col: 2, row: 1, name: "field",    label: "Месторождение" },
  { col: 2, row: 2, name: "lease",    label: "Куст"},
  { col: 2, row: 3, name: "well",     label: "Скважина"},
  { col: 2, row: 4, name: "daysrun",  label: "Суточный пробег" },
  { col: 2, row: 6, name: "pwrlimit", label: "Предел мощности"},
  { col: 2, row: 7, name: "tmplimit", label: "Предел температуры"},
  { col: 2, row: 8, name: "thrlimit", label: "Предел нагрузки"},
  { col: 3, row: 1, name: "head",     label: "Состояние головки" },
  { col: 3, row: 2, name: "base",     label: "Состояние основания" },
  { col: 3, row: 3, name: "coupling", label: "Наличие муфты" },
  { col: 3, row: 4, name: "pressure", label: "Давление опрессовки"},
  { col: 3, row: 6, name: "rotation", label: "Вал, вращение" },
  { col: 3, row: 7, name: "topexten", label: "Вал, вылет верх" },
  { col: 3, row: 8, name: "btmexten", label: "Вал, вылет низ"},
  { col: 4, row: 1, name: "oilcolor", label: "Масло, цвет" },
  { col: 4, row: 2, name: "oilwater", label: "Масло, вода" },
  { col: 4, row: 3, name: "oilshavs", label: "Масло, стружка"},
  { col: 4, row: 4, name: "oilkv",    label: "Масло, диэл.прочность" },
  { col: 1, row: 9, name: "comments", label: "Примечания"},
];

export const DICT_COLUMNS = {
  id: "Номер",
  name: "Имя",
};
