/**
* DevExtreme (file_management/error.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import FileSystemItem from './file_system_item';

/**
 * @docid FileSystemError
 * @namespace DevExpress.fileManagement
 * @public
 */
export default class FileSystemError {
   constructor(errorCode?: number, fileSystemItem?: FileSystemItem, errorText?: string);
    /**
     * @docid FileSystemError.fileSystemItem
     * @public
     */
    fileSystemItem?: FileSystemItem;

    /**
     * @docid FileSystemError.errorCode
     * @public
     */
    errorCode?: number;

    /**
     * @docid FileSystemError.errorText
     * @public
     */
     errorText?: string;
}
