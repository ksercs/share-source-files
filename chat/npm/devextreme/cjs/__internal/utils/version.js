/**
* DevExtreme (cjs/__internal/utils/version.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertDevExtremeVersion = assertDevExtremeVersion;
exports.assertedVersionsCompatible = assertedVersionsCompatible;
exports.clearAssertedVersions = clearAssertedVersions;
exports.getPreviousMajorVersion = getPreviousMajorVersion;
exports.parseVersion = parseVersion;
exports.stringifyVersion = stringifyVersion;
var _errors = _interopRequireDefault(require("../../core/errors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MAX_MINOR_VERSION = 2;
const MIN_MINOR_VERSION = 1;
const assertedVersions = [];
const VERSION_SPLITTER = '.';
function stringifyVersion(version) {
  const {
    major,
    minor,
    patch
  } = version;
  return [major, minor, patch].join(VERSION_SPLITTER);
}
function parseVersion(version) {
  const [major, minor, patch] = version.split('.').map(Number);
  return {
    major,
    minor,
    patch
  };
}
function assertDevExtremeVersion(packageName, version) {
  assertedVersions.push({
    packageName,
    version
  });
}
function clearAssertedVersions() {}
function stringifyVersionList(assertedVersionList) {
  return assertedVersionList.map(assertedVersion => `${assertedVersion.packageName}: ${assertedVersion.version}`).join('\n');
}
function versionsEqual(versionA, versionB) {
  return versionA.major === versionB.major && versionA.minor === versionB.minor && versionA.patch === versionB.patch;
}
function getPreviousMajorVersion(_ref) {
  let {
    major,
    minor,
    patch
  } = _ref;
  const previousMajorVersion = minor === MIN_MINOR_VERSION ? {
    major: major - 1,
    minor: MAX_MINOR_VERSION,
    patch
  } : {
    major,
    minor: minor - 1,
    patch
  };
  return previousMajorVersion;
}
function assertedVersionsCompatible(currentVersion) {
  const mismatchingVersions = assertedVersions.filter(assertedVersion => !versionsEqual(parseVersion(assertedVersion.version), currentVersion));
  if (mismatchingVersions.length) {
    _errors.default.log('W0023', stringifyVersionList([{
      packageName: 'devextreme',
      version: stringifyVersion(currentVersion)
    }, ...mismatchingVersions]));
    return false;
  }
  return true;
}
