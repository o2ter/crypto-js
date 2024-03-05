//
//  digest.ts
//
//  The MIT License
//  Copyright (c) 2021 - 2024 O2ter Limited. All rights reserved.
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
//

import _ from 'lodash';
import type { createHash } from 'node:crypto';
import { binaryToBuffer, stringToBuffer } from '@o2ter/utils-js';

const algMap = {
  'sha1': 'SHA-1',
  'sha256': 'SHA-256',
  'sha384': 'SHA-384',
  'sha512': 'SHA-512',
};

const WebDigest = (alg: keyof typeof algMap) => (
  message: BinaryData | string,
) => {
  const _message = _.isString(message) ? stringToBuffer(message) : message;
  return crypto.subtle.digest(algMap[alg], _message);
}

const NodeDigest = (alg: keyof typeof algMap) => async (
  message: BinaryData | string,
) => {
  const _createHash = require('node:crypto').createHash as typeof createHash;
  const _message = _.isString(message) ? stringToBuffer(message) : message;
  const hash = _createHash(alg);
  hash.update(binaryToBuffer(_message));
  return hash.digest();
}

export const sha1 = typeof window === 'undefined' ? NodeDigest('sha1') : WebDigest('sha1');
export const sha256 = typeof window === 'undefined' ? NodeDigest('sha256') : WebDigest('sha256');
export const sha384 = typeof window === 'undefined' ? NodeDigest('sha384') : WebDigest('sha384');
export const sha512 = typeof window === 'undefined' ? NodeDigest('sha512') : WebDigest('sha512');