//
//  index.test.ts
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

import { expect, test } from '@jest/globals';
import { Hamc } from '../src';
import { sha1, sha256, sha384, sha512 } from '../src/digest';

test('test hmac', async () => {
  const buffer = await Hamc('sha256', 'abc', 'def');
  expect(Buffer.from(buffer).toString('base64')).toBe('IOvA8JNERwE081BA9j6pix2OQUISlJ7lxQBCnRXqsIE=');
});

test('test sha1', async () => {
  const buffer = await sha1('hello');
  expect(Buffer.from(buffer).toString('hex')).toBe('aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d');
});

test('test sha256', async () => {
  const buffer = await sha256('hello');
  expect(Buffer.from(buffer).toString('hex')).toBe('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
});

test('test sha384', async () => {
  const buffer = await sha384('hello');
  expect(Buffer.from(buffer).toString('hex')).toBe('59e1748777448c69de6b800d7a33bbfb9ff1b463e44354c3553bcdb9c666fa90125a3c79f90397bdf5f6a13de828684f');
});

test('test sha512', async () => {
  const buffer = await sha512('hello');
  expect(Buffer.from(buffer).toString('hex')).toBe('9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043');
});
