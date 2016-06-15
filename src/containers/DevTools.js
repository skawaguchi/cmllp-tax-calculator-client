import React from 'react';

import {createDevTools} from 'redux-devtools';

import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

const DevTools = createDevTools(
    <DockMonitor
        changePositionKey='ctrl-h'
        defaultIsVisible={true}
        toggleVisibilityKey='ctrl-h'
    >
        <LogMonitor theme='tomorrow'/>
    </DockMonitor>
);

export default DevTools;
