use adam::{read, listen};
use adam::models::{Analog, Digital, Endian};

fn main() {
    println!("This is Adam5000TCP library");
    let a = read::<Analog>(Endian::BIG);
    println!("ANALOG {:?}", a);

    let d = read::<Digital>(Endian::LITTLE);
    println!("DIGITAL {:?}", d);

    if listen().is_ok() {
        println!("Listen success");
    } else {
        println!("Listen failed");
    }
}
