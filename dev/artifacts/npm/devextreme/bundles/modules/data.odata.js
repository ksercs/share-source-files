/**
* DevExtreme (bundles/modules/data.odata.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

/* global DevExpress */
/* eslint-disable import/no-commonjs */
require('./data');
DevExpress.data.ODataStore = require('../../data/odata/store');
DevExpress.data.ODataContext = require('../../data/odata/context');
DevExpress.data.utils = DevExpress.data.utils || {};
DevExpress.data.utils.odata = {};
DevExpress.data.utils.odata.keyConverters = require('../../data/odata/utils').keyConverters;
DevExpress.data.EdmLiteral = require('../../data/odata/utils').EdmLiteral;
var ODataUtilsModule = require('../../data/odata/utils');
DevExpress.data.utils.odata.serializePropName = ODataUtilsModule.serializePropName;
DevExpress.data.utils.odata.serializeValue = ODataUtilsModule.serializeValue;
DevExpress.data.utils.odata.serializeKey = ODataUtilsModule.serializeKey;
DevExpress.data.utils.odata.sendRequest = ODataUtilsModule.sendRequest;
DevExpress.data.queryAdapters = DevExpress.data.queryAdapters || {};
DevExpress.data.queryAdapters.odata = require('../../data/odata/query_adapter').odata;
