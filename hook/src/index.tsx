import React, { memo } from 'react';
import { render } from 'react-dom';

// 工具
import { createElement, attr } from './utils/element';

// 组件
import App from './Containers/App';
import multiple from './utils/multiple';

const NodeElementId = 'root';
const root: HTMLElement = document.getElementById(NodeElementId) || attr(createElement('div'), 'id', NodeElementId);
render(<App />, root);


const double = multiple(2);
double(2);
