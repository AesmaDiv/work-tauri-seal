extern crate adam;

use rand::Rng;

use adam::models::{Analog, Digital, Endian};
use adam::read;


static mut ANALOG: Analog = Analog {
  slot0: [0,0,0,0, 0,0,0,0],
  slot1: [0,0,0,0, 0,0,0,0],
  slot2: [0,0,0,0, 0,0,0,0],
  slot3: [0,0,0,0, 0,0,0,0],
  slot4: [0,0,0,0, 0,0,0,0],
  slot5: [0,0,0,0, 0,0,0,0],
  slot6: [0,0,0,0, 0,0,0,0],
  slot7: [0,0,0,0, 0,0,0,0],
};
static mut DIGITAL: Digital = Digital {
  slot0: 0,
  slot1: 0,
  slot2: 0,
  slot3: 0,
  slot4: 0,
  slot5: 0,
  slot6: 0,
  slot7: 0,
};

pub fn read_adam(address: &str) -> (Option<Analog>, Option<Digital>) {
  let mut analog = read::<Analog>(address, Endian::BIG);
  let mut digital = read::<Digital>(address, Endian::BIG);

  unsafe {
    if analog.is_none() {
      randomize_analog();
      analog = Some(ANALOG.clone());
    }
    if digital.is_none() { digital = Some(DIGITAL.clone())}
  }

  return (analog, digital);
}

fn randomize_analog() {
  unsafe {
    let mut rng = rand::thread_rng();
    for val in ANALOG.slot0.iter_mut() {
      let new_val = *val as i16 + rng.gen_range(0..0x01FE) - 0xFF;
      *val = if new_val < 0 { 0 } else { new_val as u16 };
    }
    // for val in ANALOG.slot1.iter_mut() {
    //   let new_val = *val as i16 + rng.gen_range(0..0x01FE) - 0xFF;
    //   *val = if new_val < 0 { 0 } else { new_val as u16 };
    // }
    // for val in ANALOG.slot2.iter_mut() {
    //   let new_val = *val as i16 + rng.gen_range(0..0x01FE) - 0xFF;
    //   *val = if new_val < 0 { 0 } else { new_val as u16 };
    // }
    // for val in ANALOG.slot3.iter_mut() {
    //   let new_val = *val as i16 + rng.gen_range(0..0x01FE) - 0xFF;
    //   *val = if new_val < 0 { 0 } else { new_val as u16 };
    // }
    // for val in ANALOG.slot4.iter_mut() {
    //   let new_val = *val as i16 + rng.gen_range(0..0x01FE) - 0xFF;
    //   *val = if new_val < 0 { 0 } else { new_val as u16 };
    // }
    // for val in ANALOG.slot5.iter_mut() {
    //   let new_val = *val as i16 + rng.gen_range(0..0x01FE) - 0xFF;
    //   *val = if new_val < 0 { 0 } else { new_val as u16 };
    // }
    // for val in ANALOG.slot6.iter_mut() {
    //   let new_val = *val as i16 + rng.gen_range(0..0x01FE) - 0xFF;
    //   *val = if new_val < 0 { 0 } else { new_val as u16 };
    // }
    // for val in ANALOG.slot7.iter_mut() {
    //   let new_val = *val as i16 + rng.gen_range(0..0x01FE) - 0xFF;
    //   *val = if new_val < 0 { 0 } else { new_val as u16 };
    // }
  }
}
