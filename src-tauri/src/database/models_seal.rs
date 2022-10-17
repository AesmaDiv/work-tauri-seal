#![allow(non_snake_case)]
extern crate rusqlite_helper;
use rusqlite_helper::dbtable;

dbtable!(
  struct Dictionary {
    id: i32,
    name: String
  }
);
dbtable!(
  struct Types {
    id: i32,
    name: String,
    producer: i32
  }
);
dbtable!(
  struct TLRow {
    id: i32,
    datetest: String,
    ordernum: String,
    serial: String
  }
);
dbtable!(
  struct Tests {
    id: i32, 
    datetest: String,
    daterecv: String,
    customer: String,
    ordernum: String,
    producer: String,
    series  : String,
    sealtype: String,
    serial  : String,
    field   : String,
    lease   : String,
    well    : String,
    daysrun : String,
    head    : String,
    base    : String,
    coupling: String,
    oilcolor: String,
    oilshavs: String,
    oilwater: String,
    oilkv   : String,
    pressure: String,
    rotation: String,
    topexten: String,
    btmexten: String,
    coating : String,
    // vibr1   : String,
    // vibr2   : String,
    // vibr3   : String,
    // vibr4   : String,
    comments: String
  }
);