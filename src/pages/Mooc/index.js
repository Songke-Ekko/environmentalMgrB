import React, { Fragment } from 'react';
import styles from './index.less';
import star from '@/assets/star.svg';
import robot from '@/assets/robot.svg';
import down from '@/assets/down.png';

const Mooc = (props) => {
  const { history } = props;
  const handleRouter = () => {
    history.push({ pathname: '/work-space' });
  };

  return (
    <Fragment>
      <div className={styles.mainBox}>
        <div className={styles.header}>
          <span>WHAT I DO</span>
          <img src={star} alt="" />
          <span>MY WORK</span>
          <img src={star} alt="" />
          <span>CONTACT US</span>
          <img src={star} alt="" />
          <span>WEBUCATION</span>
        </div>
        <div className={styles.middleContent}>
          <img src={robot} alt="" />
        </div>
        <p>HELLO</p>
        <p>I 'M SK</p>
        <div style={{ height: 40 }}>
          <img className={styles.enter} src={down} alt="" onClick={handleRouter} />
        </div>
        <p className={styles.title}>WEB DESIGNER</p>
      </div>
    </Fragment>
  );
};

export default Mooc;
