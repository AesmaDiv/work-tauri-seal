use rusqlite::{Connection, Error};


/// Функция получения имени поля Primary key
pub fn get_pk_name(dbpath: &str, table: &str) -> String {
  fn read_pk(dbpath: &str, table: &str) -> Result<String, Error> {
    Connection::open(&dbpath)?.query_row(
      "Select * From pragma_table_info(?) Where pk",
      [table],
      |row| -> Result<String, Error> { row.get(1) }
    )
  }
  let result = read_pk(dbpath, table);
  result.unwrap_or(String::new())
}
/// Функция выполнения запроса к БД
pub fn execute(db_path: &str, sql: &str) -> Result<usize, Error> {
  // подключение к БД
  let connection = Connection::open(db_path)?;
  connection.execute(sql, [])
}
/// Функция транспонилования 2-мерного массива строк
pub fn transpose(arr: &Vec<[String; 2]>) -> Vec<Vec<String>> {
  let mut v1: Vec<String> = Vec::new();
  let mut v2: Vec<String> = Vec::new();
  for item in arr {
    v1.push(item[0].clone());
    v2.push(item[1].clone());
  }
  vec![v1, v2]
}
/// Функция замены слова в предложении
pub fn replace_word(source: &str, replace: &str, index: usize) -> String {
  source.split_whitespace()
    .enumerate()
    .map(|(i, orig)| if i == index { replace } else { orig })
    .collect::<Vec<&str>>()
    .join(" ")
}