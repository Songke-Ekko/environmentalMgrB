import React, { Fragment, useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Carousel } from 'antd';
import heart from '@/assets/xinOnce.gif';
import styles from './index.less';
import green from '@/assets/green.jpg';
import green1 from '@/assets/green1.jpg';
import green2 from '@/assets/green2.jpg';
import green3 from '@/assets/green3.jpg';
import green4 from '@/assets/green4.jpg';

const imgList = [green, green1, green2, green3, green4];

const WorkSpace = (props) => {
  const [vislble1, setVislble1] = useState(false);
  const [vislble, setVislble] = useState(false);
  const [array, setArray] = useState([]);

  const parents = () => {
    setVislble1(!vislble1);
    setVislble(true);
    // setTimeout(() => {
    //   setVislble(false);
    // }, 2000);
  }

  const arrayAdd = () => {
    array.push(1)
    setArray([...array]);
  }

  useEffect(() => {
    console.log(imgList);
  }, [])
  
  return (
    <Fragment>
      <Header />
      {/* <div onClick={parents} style={{ border: '1px solid', height: 100, width: 100 }}>
        {
          !vislble1 ? <div className={styles.heartWhite} /> : <div style={ vislble ? { backgroundImage: `url(${heart}?+${Math.random()})`} : null} className={styles.heart} />
        }
        <span onClick={arrayAdd}>数组自增</span>
      </div> */}
      <div className={styles.mainBox}>
        <Carousel autoplay>
          {imgList.map((item, i) => (
            <div key={i}>
              <div className={styles.carouselItem} style={{ backgroundImage: `url(${item})` }} />
            </div>
          ))}
        </Carousel>
      </div>
    </Fragment>
  );
};

export default WorkSpace;
