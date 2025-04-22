import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["customerId", "maxVersionAllowed", "format", "internalUsageId"];
import config from '../../../core/config';
import errors from '../../../core/errors';
import { fullVersion } from '../../../core/version';
import { assertedVersionsCompatible, getPreviousMajorVersion, parseVersion } from '../../utils/version';
import { base64ToBytes } from './byte_utils';
import { INTERNAL_USAGE_ID, PUBLIC_KEY } from './key';
import { pad } from './pkcs1';
import { compareSignatures } from './rsa_bigint';
import { sha1 } from './sha1';
import { showTrialPanel } from './trial_panel';
import { TokenKind } from './types';
const FORMAT = 1;
const RTM_MIN_PATCH_VERSION = 3;
const KEY_SPLITTER = '.';
const BUY_NOW_LINK = 'https://go.devexpress.com/Licensing_Installer_Watermark_DevExtremeJQuery.aspx';
const LICENSING_DOC_LINK = 'https://go.devexpress.com/Licensing_Documentation_DevExtremeJQuery.aspx';
const GENERAL_ERROR = {
  kind: TokenKind.corrupted,
  error: 'general'
};
const VERIFICATION_ERROR = {
  kind: TokenKind.corrupted,
  error: 'verification'
};
const DECODING_ERROR = {
  kind: TokenKind.corrupted,
  error: 'decoding'
};
const DESERIALIZATION_ERROR = {
  kind: TokenKind.corrupted,
  error: 'deserialization'
};
const PAYLOAD_ERROR = {
  kind: TokenKind.corrupted,
  error: 'payload'
};
const VERSION_ERROR = {
  kind: TokenKind.corrupted,
  error: 'version'
};
let validationPerformed = false;
// verifies RSASSA-PKCS1-v1.5 signature
function verifySignature(_ref) {
  let {
    text,
    signature: encodedSignature
  } = _ref;
  return compareSignatures({
    key: PUBLIC_KEY,
    signature: base64ToBytes(encodedSignature),
    actual: pad(sha1(text))
  });
}
export function parseLicenseKey(encodedKey) {
  if (encodedKey === undefined) {
    return GENERAL_ERROR;
  }
  const parts = encodedKey.split(KEY_SPLITTER);
  if (parts.length !== 2 || parts[0].length === 0 || parts[1].length === 0) {
    return GENERAL_ERROR;
  }
  if (!verifySignature({
    text: parts[0],
    signature: parts[1]
  })) {
    return VERIFICATION_ERROR;
  }
  let decodedPayload = '';
  try {
    decodedPayload = atob(parts[0]);
  } catch {
    return DECODING_ERROR;
  }
  let payload = {};
  try {
    payload = JSON.parse(decodedPayload);
  } catch {
    return DESERIALIZATION_ERROR;
  }
  const {
      customerId,
      maxVersionAllowed,
      format,
      internalUsageId
    } = payload,
    rest = _objectWithoutPropertiesLoose(payload, _excluded);
  if (internalUsageId !== undefined) {
    return {
      kind: TokenKind.internal,
      internalUsageId
    };
  }
  if (customerId === undefined || maxVersionAllowed === undefined || format === undefined) {
    return PAYLOAD_ERROR;
  }
  if (format !== FORMAT) {
    return VERSION_ERROR;
  }
  return {
    kind: TokenKind.verified,
    payload: _extends({
      customerId,
      maxVersionAllowed
    }, rest)
  };
}
function isPreview(patch) {
  return isNaN(patch) || patch < RTM_MIN_PATCH_VERSION;
}
function getLicenseCheckParams(_ref2) {
  let {
    licenseKey,
    version
  } = _ref2;
  let preview = false;
  try {
    preview = isPreview(version.patch);
    const {
      major,
      minor
    } = preview ? getPreviousMajorVersion(version) : version;
    if (!licenseKey) {
      return {
        preview,
        error: 'W0019'
      };
    }
    const license = parseLicenseKey(licenseKey);
    if (license.kind === TokenKind.corrupted) {
      return {
        preview,
        error: 'W0021'
      };
    }
    if (license.kind === TokenKind.internal) {
      return {
        preview,
        internal: true,
        error: license.internalUsageId === INTERNAL_USAGE_ID ? undefined : 'W0020'
      };
    }
    if (!(major && minor)) {
      return {
        preview,
        error: 'W0021'
      };
    }
    if (major * 10 + minor > license.payload.maxVersionAllowed) {
      return {
        preview,
        error: 'W0020'
      };
    }
    return {
      preview,
      error: undefined
    };
  } catch {
    return {
      preview,
      error: 'W0021'
    };
  }
}
export function validateLicense(licenseKey) {
  let versionStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : fullVersion;
  if (validationPerformed) {
    return;
  }
  validationPerformed = true;
  const version = parseVersion(versionStr);
  const versionsCompatible = assertedVersionsCompatible(version);
  const {
    internal,
    error
  } = getLicenseCheckParams({
    licenseKey,
    version
  });
  if (!versionsCompatible && internal) {
    return;
  }
  if (error && !internal) {
    const buyNowLink = config().buyNowLink ?? BUY_NOW_LINK;
    const licensingDocLink = config().licensingDocLink ?? LICENSING_DOC_LINK;
    showTrialPanel(buyNowLink, licensingDocLink, fullVersion);
  }
  const preview = isPreview(version.patch);
  if (error) {
    errors.log(preview ? 'W0022' : error);
    return;
  }
  if (preview && !internal) {
    errors.log('W0022');
  }
}
export function peekValidationPerformed() {
  return validationPerformed;
}
export function setLicenseCheckSkipCondition() {
  let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
}
// NOTE: We need this default export
// to allow QUnit mock the validateLicense function
export default {
  validateLicense
};