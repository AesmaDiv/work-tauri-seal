#![allow(non_snake_case)]
extern crate rusqlite_helper;
use rusqlite_helper::dbtable;

dbtable!(
  struct Dictionary {
    id        : i32,
    name      : String
  }
);
dbtable!(
  struct SType {
    id        : i32,
    name      : String,
    producer  : String,
    date      : String,
    rpm       : i32,
    limit_thr : f64,
    limit_tmp : f64,
    limit_pwr : f64,
    do_press  : bool,
    do_thrust : bool,
    rotation  : i32
  }
);
dbtable!(
  struct TLRow {
    id        : i32,
    datetest  : String,
    ordernum  : String,
    serial    : String
  }
);
dbtable!(
  struct Records {
    id         : i32, 
    datetest   : String,
    daterecv   : String,
    customer   : String,
    ordernum   : String,
    series     : String,
    sealtype   : i32,
    serial     : String,
    field      : String,
    lease      : String,
    well       : String,
    daysrun    : String,
    head       : String,
    base       : String,
    coupling   : String,
    oilcolor   : String,
    oilshavs   : String,
    oilwater   : String,
    oilkv      : String,
    pressure   : String,
    rotation   : String,
    exten_top  : String,
    exten_btm  : String,
    coating    : String,
    // vibr1   : String,
    // vibr2   : String,
    // vibr3   : String,
    // vibr4   : String,
    comments   : String,
    test_press : String,
    test_power : String,
    rawdata    : Vec<u8>
  }
);
