import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import SiderMenu from '@components/SiderMenu/Index';
import classNames from 'classnames';

import { RLogo } from '@components/SvgIcon';
import './navigator.scss';

class Navigater extends Component {
    handleLinkGithub() {
        window.open('https://github.com/EzioReturner/RATurbo-react-admin');
    }
    render() {
        const { collapsed } = this.props;
        console.log(collapsed);

        return (
            <div
                className={classNames('navigator', {
                    collapsed
                })}
                mode="inline"
            >
                <div className="controlBut" onClick={this.handleLinkGithub}>
                    <div className="rotateIcon">
                        <Icon component={RLogo} className="logoBorder" />
                    </div>
                    <span className="title ml-3">RA-TURBO</span>
                </div>
                <SiderMenu />
            </div>
        );
    }
}
export default Navigater;
