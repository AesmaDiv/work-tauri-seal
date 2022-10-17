use std::io::prelude::*;
use std::net::{TcpStream, UdpSocket};
use models::{SlotParam, Convert, Endian};

pub mod models;

const TCP_ADDRESS: &str = "10.10.10.10:502";
const UDP_ADDRESS: &str = "10.10.10.3:5168";


pub fn read<T: Convert  + SlotParam>(endian: Endian) -> Option<T> {
  let data: Vec<u8> = read_data::<T>().unwrap_or(Vec::new());
  let values: Vec<u16> = to_values(&data, endian);
  let result: Option<T> = T::convert(values);

  result
}

pub fn listen() -> std::io::Result<()> {
  let socket = UdpSocket::bind(UDP_ADDRESS)?;
  let mut buf = [0; 255];
  let mut count = 0;
  while count < 1 {
      let (_, _) = socket.recv_from(&mut buf)?;
      println!("Message №{} => {:?}", &count, &buf);
      count += 1;
  }
  Ok(())
}

fn read_data<T: SlotParam>() -> std::io::Result<Vec<u8>> {
  let mut stream = TcpStream::connect(TCP_ADDRESS)?;
  let mut bytes = vec![0x0; T::SIZE[0]];
  let mut result = vec![0x0; T::SIZE[1]];
  
  if stream.write(&T::COMMAND).is_ok() { stream.read(&mut bytes)?; }
  result.copy_from_slice(&bytes[9..]);

  Ok(result)
}

fn to_values(source: &Vec<u8>, endian: Endian) -> Vec<u16> {
  match endian {
    Endian::BIG => { 
      source.chunks(2).map(|bytes| u16::from_be_bytes([bytes[0],bytes[1]])).collect::<Vec<u16>>()
    },
    _ => {
      source.chunks(2).map(|bytes| u16::from_ne_bytes([bytes[0],bytes[1]])).collect::<Vec<u16>>()
    }
  }
}
