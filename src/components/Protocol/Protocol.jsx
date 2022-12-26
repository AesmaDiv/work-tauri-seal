
import { useRef } from "react";
import { useSelector } from "react-redux";
import ReactToPrint from "react-to-print";

import PressureCharts from "../TestingForms/Charts/PressChart";
import PowerConsumptionCharts from "../TestingForms/Charts/PowerChart";

import { roundValue, decimal2time } from "../../shared/funcs_common";
import { RECORD_COLUMNS } from "../../database/db_tables";
import logo from "./logo_epu.png";
import cls from './Protocol.module.css'

export default function Protocol() {
  const record = useSelector(state => state.recordReducer.record);
  const points = useSelector(state => state.recordReducer.points);
  const sealtype = useSelector(state => state.recordReducer.current_type);
  const printRef = useRef();

  const connection = ['Эвольвентное', 'Прямобочное'][record.shaft_connection - 1]
  const rotation = ['Правое', 'Левое'][record.shaft_rotation - 1]

  const buildPointsTable = () => {
    let rows = [];
    for (let i = 0; i < points.test_power.length; i++) {
      rows.push(
        <tr key={`test_table_row_${i}`}>
          <td>{i + 1}</td>
          <td>{roundValue(points.test_power[i].y3, 3)}</td>
          <td>{roundValue(points.test_power[i].y1, 3)}</td>
          <td>{roundValue(points.test_power[i].y2, 1)}</td>
          <td>{decimal2time(points.test_power[i].x)}</td>
        </tr>
      )
    }
    return (
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Осевая нагрузка, кгс/см²</th>
            <th>Потребляемая мощность, кВт</th>
            <th>Температура, °C</th>
            <th>Время, мин</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }

  console.warn("Protocol points %o", points);
  console.log("*** PROTOCOL RENDER ***");
  return (
    <div className={cls.protocol}>
      <ReactToPrint 
          trigger={() => <button>Print this out!</button>}
          content={() => printRef.current}
      />
      <div className={cls.body} ref={printRef}>
        <header>
          <div className={cls.header_pump_type}>№ { record.id }</div>
          <div className={cls.header_title}>
            <img src={logo}/>
            <p>ЭПУ СЕРВИС</p>
            <p>г.Когалым</p>
          </div>
          <div className={cls.header_test_time}>{ record.datetest }</div>
        </header>
        <main>
          <p style={{marginTop: 40}}>Информация по гидрозащите:</p>
          <hr/>
          <div className={cls.info_block}>
            <span>Производитель</span>
            <span>Тип ГЗ</span>
            <span>Заводской номер</span>
            <br/>
            <span>Предел мощности</span>
            <span>Предел температуры</span>
            <span>Предел нагрузки</span>
            <span>Шлицевое соединение</span>
            <span>Направление вращения</span>

            <span>{sealtype.producer}</span>
            <span>{sealtype.name}</span>
            <span>{record.serial}</span>
            <br/>
            <span>{sealtype.limit_pwr}</span>
            <span>{sealtype.limit_tmp}</span>
            <span>{record.limit_thr}</span>
            <span>{connection}</span>
            <span>{rotation}</span>
            
            <span>Вал, вылет верх</span>
            <span>Вал, вылет низ</span>
            <span>Вал, текучесть</span>
            <span>Вал, диаметр</span>
            <br/>
            <span>Радиальное биение</span>
            <span>Торцевое биение</span>
            <span>Осевой люфт</span>
            <span>Момент проворота</span>

          
            <span>{record.exten_top}</span>
            <span>{record.exten_btm}</span>
            <span>{record.shaft_yield}</span>
            <span>{record.shaft_diam}</span>
            <br/>
            <span>{record.outrun_rad}</span>
            <span>{record.outrun_end}</span>
            <span>{record.axial_play}</span>
            <span>{record.momentum}</span>

            <span/>
            <span/>
            <span/>
            <span/>
            <span/>
            <span>&#8804; 0.18 мм</span>
            <span>&#8804; 0.10 мм</span>
            <span>0.25 .. 1.2 мм</span>
            <span>&#8804; 0.48 кгс/см²</span>
          </div>
          <br/>
          <p>Информация по испытанию:</p>
          <hr/>
          <div className={cls.info_block}>
            <span>Дата испытания</span>
            <span>Дата поступления</span>
            <span>Заказчик</span>
            <span>Наряд-заказ №</span>
            <br/>
            <span>Месторождение</span>
            <span>Куст</span>
            <span>Скважина</span>
            <span>Пробег, сут</span>

            <span>{record.datetest}</span>
            <span>{record.daterecv}</span>
            <span>{record.customer}</span>
            <span>{record.ordernum}</span>
            <br/>
            <span>{record.field}</span>
            <span>{record.lease}</span>
            <span>{record.well}</span>
            <span>{record.daysrun}</span>

            <span>Состояние головки</span>
            <span>Состояние основания</span>
            <span>Наличие муфты</span>
            <span>Давление опрессовки</span>
            <br/>
            <span>Масло: цвет</span>
            <span>Масло: вода</span>
            <span>Масло: стружка</span>
            <span>Масло: диэл.проводимость</span>

            <span>{record.head}</span>
            <span>{record.base}</span>
            <span>{record.coupling}</span>
            <span>{record.pressure}</span>
            <br/>
            <span>{record.oil_color}</span>
            <span>{record.oil_water}</span>
            <span>{record.oil_shavs}</span>
            <span>{record.oil_kvolt}</span>
          </div>
          <br/>
          <p>Результат испытаний:</p>
          <hr/>
          <div className={cls.test_charts}>
            <PressureCharts for_protocol/>
            <PowerConsumptionCharts for_protocol/>
          </div>
          <div className={cls.test_table}>
            {buildPointsTable()}
          </div>
          <p style={{alignSelf: 'left'}}>Гидрозащита обкатывалась в течении 15 минут, при частоте вращения вала 2910 об/мин.</p>
        </main>
        <footer>
          <div className={cls.comments}>
            <p>Примечания:</p>
            <div>
              Должен заметить, что мы продолжаем мониторинг, и должен также заметить,
              что это не первый случай, когда после предостережений, высказанных в том
              числе и членами нашей комиссии, такие компании, как Google, удаляют
              вредоносный контент, который, по сути, является противоправным.
            </div>
          </div>
          <div className={cls.signatures}>
            <p>Испытатель :</p>
            <p>Мастер :</p>
            <p>_________________________</p>
            <p>_________________________</p>
          </div>
        </footer>
      </div>
    </div>
  )
}