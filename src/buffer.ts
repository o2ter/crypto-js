//
//  buffer.ts
//
//  The MIT License
//  Copyright (c) 2021 - 2025 O2ter Limited. All rights reserved.
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
import {
  Awaitable,
  binaryToBuffer,
  stringToBuffer,
  iterableToArray,
  asyncIterableToArray,
  isBinaryData,
  BinaryData,
} from '@o2ter/utils-js';

type _Buffer = BinaryData | string;
export type Message = _Buffer | Iterable<_Buffer> | AsyncIterable<_Buffer>;

const isMessage = (x: Awaitable<Message>): x is Message => _.isString(x) || isBinaryData(x) || Symbol.iterator in x || Symbol.asyncIterator in x;

const _resolveBuffer = async (msg: Message) => { 
  if (_.isString(msg)) return stringToBuffer(msg);
  if (Symbol.iterator in msg) {
    const buffers = iterableToArray(msg);
    return Buffer.concat(_.map(buffers, x => _.isString(x) ? stringToBuffer(x) : binaryToBuffer(x)))
  }
  if (Symbol.asyncIterator in msg) {
    const buffers = await asyncIterableToArray(msg);
    return Buffer.concat(_.map(buffers, x => _.isString(x) ? stringToBuffer(x) : binaryToBuffer(x)))
  }
  return binaryToBuffer(msg);
}

export const resolveBuffer = async (
  msg: Awaitable<Message>,
) => {
  return isMessage(msg) ? _resolveBuffer(msg) : _resolveBuffer(await msg);
}

export const resolveBufferStream = async function* (msg: Awaitable<Message>) { 
  const _msg = isMessage(msg) ? msg : await msg;
  if (_.isString(_msg)) { 
    yield stringToBuffer(_msg);
  } else if (Symbol.iterator in _msg) {
    for (const chunk of _msg) yield _.isString(chunk) ? stringToBuffer(chunk) : binaryToBuffer(chunk);
  } else if (Symbol.asyncIterator in _msg) {
    for await (const chunk of _msg) yield _.isString(chunk) ? stringToBuffer(chunk) : binaryToBuffer(chunk);
  } else {
    yield binaryToBuffer(_msg);
  }
}
