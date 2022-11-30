export const DBPATH = '/home/aesmadiv/Develop/Projects/Tauri/work-tauri-seal/assets/seal.sqlite' //'/home/aesmadiv/Develop/Projects/DB/seal.sqlite'
// export const DBPATH = '/home/jhwh/Develop/Projects/Tauri/work-tauri-seal/assets/seal.sqlite' //'/home/aesmadiv/Develop/Projects/DB/seal.sqlite'
export const RECORD_SEARCH_COLUMNS = [
  { col: 1, row: 1, name: "datetest",     required: false,  label: "Дата испытания"},
  { col: 1, row: 3, name: "customer",     required: true,   label: "Заказчик"},
  { col: 1, row: 4, name: "ordernum",     required: true,   label: "Наряд-заказ" },
  { col: 1, row: 7, name: "serial",       required: true,   label: "Заводской номер" },
]
export const SEALTYPE_COLUMNS = [
  { col: 1, row: 8, name: "id",           required: true,   label: "Тип ГЗ"},
  { col: 1, row: 6, name: "producer",     required: false,  label: "Производитель" },
  { col: 2, row: 6, name: "limit_pwr",    required: false,  label: "Предел мощности"},
  { col: 2, row: 7, name: "limit_tmp",    required: false,  label: "Предел температуры"},
  { col: 2, row: 8, name: "limit_thr",    required: false,  label: "Предел нагрузки"},
]
export const RECORD_COLUMNS = [
  ...RECORD_SEARCH_COLUMNS,
  // { col: 0, row: 0, name: "id",           label: "Номер записи"},
  { col: 1, row: 2, name: "daterecv",     required: false,  label: "Дата поступления"},
  { col: 2, row: 1, name: "field",        required: false,  label: "Месторождение" },
  { col: 2, row: 2, name: "lease",        required: false,  label: "Куст"},
  { col: 2, row: 3, name: "well",         required: false,  label: "Скважина"},
  { col: 2, row: 4, name: "daysrun",      required: false,  label: "Суточный пробег" },
  { col: 3, row: 1, name: "head",         required: false,  label: "Состояние головки" },
  { col: 3, row: 2, name: "base",         required: false,  label: "Состояние основания" },
  { col: 3, row: 3, name: "coupling",     required: false,  label: "Наличие муфты" },
  { col: 3, row: 4, name: "pressure",     required: false,  label: "Давление опрессовки"},
  { col: 3, row: 6, name: "rotation",     required: false,  label: "Вал, вращение" },
  { col: 3, row: 7, name: "exten_top",    required: false,  label: "Вал, вылет верх" },
  { col: 3, row: 8, name: "exten_btm",    required: false,  label: "Вал, вылет низ"},
  { col: 4, row: 1, name: "oilcolor",     required: false,  label: "Масло, цвет" },
  { col: 4, row: 2, name: "oilwater",     required: false,  label: "Масло, вода" },
  { col: 4, row: 3, name: "oilshavs",     required: false,  label: "Масло, стружка"},
  { col: 4, row: 4, name: "oilkv",        required: false,  label: "Масло, диэл.прочность" },
  { col: 1, row: 9, name: "comments",     required: false,  label: "Примечания"},
  { col: 0, row: 0, name: "test_press",   required: false,  label: "Давление диафрагм"},
  { col: 0, row: 0, name: "test_power",   required: false,  label: "Потребляемая мощность"},
  { col: 0, row: 0, name: "rawdata",      required: false,  label: "Данные испытания"},
];

export const DICT_COLUMNS = {
  id: "Номер",
  name: "Имя",
};
