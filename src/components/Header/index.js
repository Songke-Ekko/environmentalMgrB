import React, { Fragment } from 'react';
import tree from '@/assets/tree.svg';
import styles from './index.less'

const Header = () => {
  return (
    <Fragment>
      <div className={styles.mainBox}>
        <div className={styles.title}>
          <img src={tree} />
          <span>环境管理系统B期</span>
        </div>
        <div className={styles.slogan}>
          <span>请您爱护绿色，绿是生命之源</span>
        </div>
        <ul className={styles.headerUl}>
          <li className="login">
            <span className="member-name">您好，请登录</span>
          </li>
          {/* <li
            className="login login-username"
          >
            <span className="member-name login-username-title"></span>
          </li> */}
          {/* <li className="sign-out">
            <span className="sign-out-leave">退出</span>
            <span className="sign-out-editPsw">修改密码</span>
          </li> */}
          <li>
              <span className="register">免费注册</span>
          </li>
          <li>
              <span className="register">服务中心</span>
          </li>
          <li className="header-phone">
            <a href="#">
              {/* <img src="../../static/images/手机.png" className="phone-icon" /> */}
            </a>
          </li>
          <li className="header-weixin">
            <a href="#">
              {/* <img src="../assets/微信.png" className="weixin-icon" /> */}
            </a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default Header;
