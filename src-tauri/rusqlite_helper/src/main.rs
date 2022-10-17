use rusqlite_helper::{DBTable, dbtable};
use rusqlite_helper::reading::{read_where};
use rusqlite_helper::writing::write;

dbtable!(
    struct Customers {
      id: i32,
      name: String
  });


fn main() {
  println!("This is RuSQLite helper libary");
  // let db_path = "/home/aesmadiv/Документы/fresh-start/assets/tcs.sqlite3";
  // let items = read_where::<Customers>(db_path, "ID=6").unwrap();
  // println!("{:?}", items);
  // let mut last_item = items[items.len() - 1].clone();
  // println!("{:?}", last_item);
  // last_item.name = Some(String::from("Some name"));
  // println!("{:?}", last_item);
  // let us = write::<Customers>(db_path, &last_item);
  // println!("{:?}", us);

  let cc = Customers {
    id: Some(3),
    name: Some("default".to_owned())
  };
  println!("{}", cc.generate_delete("id"));
}
