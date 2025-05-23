/**
* DevExtreme (esm/viz/funnel.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dxFunnel from './funnel/funnel';
import { plugin as pluginLabel } from './funnel/label';
import { plugin as pluginExport } from './core/export';
import { plugin as pluginTitle } from './core/title';
import { plugin as pluginLegend } from './components/legend';
import { plugin as pluginTracker } from './funnel/tracker';
import { plugin as pluginTooltip } from './funnel/tooltip';
import { plugin as pluginLoadingIndicator } from './core/loading_indicator';
dxFunnel.addPlugin(pluginLabel);
dxFunnel.addPlugin(pluginExport);
dxFunnel.addPlugin(pluginTitle);
dxFunnel.addPlugin(pluginLegend);
dxFunnel.addPlugin(pluginTracker);
dxFunnel.addPlugin(pluginTooltip);
dxFunnel.addPlugin(pluginLoadingIndicator);
export default dxFunnel;

/**
 * @name dxFunnelItem
 * @publicName Item
 */
