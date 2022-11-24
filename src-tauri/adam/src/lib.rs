use std::io::prelude::*;
use std::net::{TcpStream, UdpSocket, SocketAddr};
use std::time::Duration;
use models::{SlotParam, Convert, Endian};

pub mod models;

// const TCP_ADDRESS: &str = "10.10.10.10:502";
const UDP_ADDRESS: &str = "10.10.10.3:5168";
const CONNECT_TIMEOUT: u64 = 100;


pub fn read<T: Convert  + SlotParam>(address: &str, endian: Endian) -> Option<T> {
  match read_data::<T>(address) {
      Ok(data) => {
        let values: Vec<u16> = to_values(&data, endian);
        let result: Option<T> = T::convert(values);

        return result;
      },
      Err(error) => {
        println!(
          "!!! Error getting {} from {address} >> {:?}",
          std::any::type_name::<T>(),
          error.to_string()
        );
        return None;
      }
  };
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

fn read_data<T: SlotParam>(address: &str) -> std::io::Result<Vec<u8>> {
  let sock: SocketAddr = address.parse().expect("Error parsing IP address");
  let timeout = Duration::from_millis(CONNECT_TIMEOUT);
  let mut stream = TcpStream::connect_timeout(&sock, timeout)?;
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
