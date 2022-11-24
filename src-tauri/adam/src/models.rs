use std::convert::TryInto;

pub enum Endian {
  BIG,
  LITTLE
}

#[derive(std::fmt::Debug, serde::Serialize, serde::Deserialize, Clone)]
pub struct Analog {
  pub slot0: [u16; 8],
  pub slot1: [u16; 8],
  pub slot2: [u16; 8],
  pub slot3: [u16; 8],
  pub slot4: [u16; 8],
  pub slot5: [u16; 8],
  pub slot6: [u16; 8],
  pub slot7: [u16; 8],
}


#[derive(std::fmt::Debug, serde::Serialize, serde::Deserialize, Clone)]
pub struct Digital {
  pub slot0: u16,
  pub slot1: u16,
  pub slot2: u16,
  pub slot3: u16,
  pub slot4: u16,
  pub slot5: u16,
  pub slot6: u16,
  pub slot7: u16,
}

pub trait SlotParam {
  const SIZE: [usize; 2];
  const COMMAND: [u8; 12];
}

impl SlotParam for Analog {
  const SIZE: [usize; 2] = [0x89, 0x80];
  const COMMAND: [u8; 12] = [0x0,0x0,0x0,0x0,0x0,0x6,0x1,0x4,0x0,0x0,0x0,0x40];
}

impl SlotParam for Digital {
  const SIZE: [usize; 2] = [0x19, 0x10];
  const COMMAND: [u8; 12] = [0x0,0x0,0x0,0x0,0x0,0x6,0x1,0x1,0x0,0x0,0x0,0x80];  
}

impl Analog {
  pub fn to_array(&self) -> [[u16; 8]; 8] {
    [
      self.slot0,
      self.slot1,
      self.slot2,
      self.slot3,
      self.slot4,
      self.slot5,
      self.slot6,
      self.slot7,
    ]
  }
}
impl Digital {
  pub fn to_array(&self) -> [u16; 8] {
    [
      self.slot0,
      self.slot1,
      self.slot2,
      self.slot3,
      self.slot4,
      self.slot5,
      self.slot6,
      self.slot7,
    ]
  }
}

pub trait Convert {
  fn convert(data: Vec<u16>) -> Option<Self>
  where Self: Sized;
}

impl Convert for Analog {
  fn convert(data: Vec<u16>) -> Option<Self>
  where Self: Sized {
    let obj: Analog;
    unsafe {
      let values = data.try_into().unwrap();
      obj = std::mem::transmute::<[u16; 0x40], Analog>(values);
    }
    Some(obj)
  }
}

impl Convert for Digital {
  fn convert(data: Vec<u16>) -> Option<Self>
  where Self: Sized {
    let obj: Digital;
    unsafe {
      let values = data.try_into().unwrap();
      obj = std::mem::transmute::<[u16; 0x8], Digital>(values);
    }
    Some(obj)
  }
}
