/**
* DevExtreme (cjs/__internal/grids/grid_core/error_handling/module.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlingModule = void 0;
var renderer_1 = __importDefault(require("../../../../core/renderer"));
var events_engine_1 = __importDefault(require("../../../../events/core/events_engine"));
var click_1 = require("../../../../events/click");
var iterator_1 = require("../../../../core/utils/iterator");
var modules_1 = __importDefault(require("../modules"));
var ERROR_ROW_CLASS = 'dx-error-row';
var ERROR_MESSAGE_CLASS = 'dx-error-message';
var ERROR_CLOSEBUTTON_CLASS = 'dx-closebutton';
var ACTION_CLASS = 'action';
var ErrorHandlingController = modules_1.default.ViewController.inherit({
    init: function () {
        var that = this;
        that._columnHeadersView = that.getView('columnHeadersView');
        that._rowsView = that.getView('rowsView');
    },
    _createErrorRow: function (error, $tableElements) {
        var that = this;
        var $errorRow;
        var $closeButton;
        var $errorMessage = this._renderErrorMessage(error);
        if ($tableElements) {
            $errorRow = renderer_1.default('<tr>').addClass(ERROR_ROW_CLASS);
            $closeButton = renderer_1.default('<div>').addClass(ERROR_CLOSEBUTTON_CLASS).addClass(that.addWidgetPrefix(ACTION_CLASS));
            events_engine_1.default.on($closeButton, click_1.name, that.createAction(function (args) {
                var e = args.event;
                var $errorRow;
                var errorRowIndex = renderer_1.default(e.currentTarget).closest("." + ERROR_ROW_CLASS).index();
                e.stopPropagation();
                iterator_1.each($tableElements, function (_, tableElement) {
                    $errorRow = renderer_1.default(tableElement).children('tbody').children('tr').eq(errorRowIndex);
                    that.removeErrorRow($errorRow);
                });
                that.getController('resizing') && that.getController('resizing').fireContentReadyAction();
            }));
            renderer_1.default('<td>')
                // @ts-expect-errors
                .attr({
                colSpan: that.getController('columns').getVisibleColumns().length,
                role: 'presentation',
            })
                .prepend($closeButton)
                .append($errorMessage)
                .appendTo($errorRow);
            return $errorRow;
        }
        return $errorMessage;
    },
    _renderErrorMessage: function (error) {
        var message = error.url ? error.message.replace(error.url, '') : error.message || error;
        var $message = renderer_1.default('<div>').addClass(ERROR_MESSAGE_CLASS).text(message);
        if (error.url) {
            renderer_1.default('<a>').attr('href', error.url).text(error.url).appendTo($message);
        }
        return $message;
    },
    renderErrorRow: function (error, rowIndex, $popupContent) {
        var that = this;
        var $errorMessageElement;
        var $firstErrorRow;
        if ($popupContent) {
            $popupContent.find("." + ERROR_MESSAGE_CLASS).remove();
            $errorMessageElement = that._createErrorRow(error);
            $popupContent.prepend($errorMessageElement);
            return $errorMessageElement;
        }
        var viewElement = rowIndex >= 0 || !that._columnHeadersView.isVisible() ? that._rowsView : that._columnHeadersView;
        var $tableElements = viewElement.getTableElements();
        iterator_1.each($tableElements, function (_, tableElement) {
            $errorMessageElement = that._createErrorRow(error, $tableElements);
            $firstErrorRow = $firstErrorRow || $errorMessageElement;
            if (rowIndex >= 0) {
                var $row = viewElement._getRowElements(renderer_1.default(tableElement)).eq(rowIndex);
                that.removeErrorRow($row.next());
                $errorMessageElement.insertAfter($row);
            }
            else {
                var $tbody = renderer_1.default(tableElement).children('tbody');
                var rowElements = $tbody.children('tr');
                if (that._columnHeadersView.isVisible()) {
                    that.removeErrorRow(rowElements.last());
                    renderer_1.default(tableElement).append($errorMessageElement);
                }
                else {
                    that.removeErrorRow(rowElements.first());
                    $tbody.first().prepend($errorMessageElement);
                }
            }
        });
        var resizingController = that.getController('resizing');
        resizingController && resizingController.fireContentReadyAction();
        return $firstErrorRow;
    },
    removeErrorRow: function ($row) {
        if (!$row) {
            var $columnHeaders = this._columnHeadersView && this._columnHeadersView.element();
            $row = $columnHeaders && $columnHeaders.find("." + ERROR_ROW_CLASS);
            if (!$row || !$row.length) {
                var $rowsViewElement = this._rowsView.element();
                $row = $rowsViewElement && $rowsViewElement.find("." + ERROR_ROW_CLASS);
            }
        }
        $row && $row.hasClass(ERROR_ROW_CLASS) && $row.remove();
    },
    optionChanged: function (args) {
        var that = this;
        switch (args.name) {
            case 'errorRowEnabled':
                args.handled = true;
                break;
            default:
                that.callBase(args);
        }
    },
});
exports.errorHandlingModule = {
    defaultOptions: function () {
        return {
            errorRowEnabled: true,
        };
    },
    controllers: {
        errorHandling: ErrorHandlingController,
    },
    extenders: {
        controllers: {
            data: {
                init: function () {
                    var that = this;
                    var errorHandlingController = that.getController('errorHandling');
                    that.callBase();
                    that.dataErrorOccurred.add(function (error, $popupContent) {
                        if (that.option('errorRowEnabled')) {
                            errorHandlingController.renderErrorRow(error, undefined, $popupContent);
                        }
                    });
                    that.changed.add(function (e) {
                        if (e && e.changeType === 'loadError') {
                            return;
                        }
                        var errorHandlingController = that.getController('errorHandling');
                        var editingController = that.getController('editing');
                        if (editingController && !editingController.hasChanges()) {
                            errorHandlingController && errorHandlingController.removeErrorRow();
                        }
                    });
                },
            },
        },
    },
};
