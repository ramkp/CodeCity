/**
 * @license
 * Code City: Registry
 *
 * Copyright 2018 Google Inc.
 * https://github.com/NeilFraser/CodeCity
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview The Registry class, for e.g. registering built-ins.
 * @author cpcallen@google.com (Christohper Allen)
 */
'use strict';

/**
 * Class for a registry provinding a bidirectional mapping between
 * string-valued keys and arbitrary values.
 * @constructor
 * @template T
 */
class Registry {
  constructor() {
    /** @private @const @type {!Object<string, T>} */
    this.values_ = Object.create(null);
    /** @private @const @type {!Map<T, string>} */
    this.keys_ = new Map();
  }

  /**
   * Look up a registered value.  Throws an error if the given key has
   * not been registered.
   * @param {string} key The key to get the registered value for.
   * @return {T} The registered value.
   */
  get(key) {
    if (!this.has(key)) {
      throw Error('Key "' + key + '" not registered');
    }
    return this.values_[key];
  }

  /**
   * Look up the key for a registered value.  Returns undefined if the
   * given value has not been registered.  If the value has been
   * registered with more than one key then one of those keys will be
   * returned but there is no guarantee which.
   * @param {T} value The value to get the key for.
   * @return {string|undefined} The key for value, or undefined if
   *     value never registered.
   */
  getKey(value) {
    return this.keys_.get(value);
  }

  /**
   * Check if a key exists in the registry.
   * @param {string} key The key to check.
   * @return {boolean} True iff key has previously been registered.
   */
  has(key) {
    return key in this.values_;
  }

  /**
   * Register a value.  Throws an error if the given key has already
   * been used for a previous registration.
   * @param {string} key The key to register value with.
   * @param {T} value The value to be registered.
   */
  set(key, value) {
    if (key in this.values_) {
      throw Error('Key "' + key + '" already registered');
    }
    this.values_[key] = value;
    this.keys_.set(value, key);
  }
}

module.exports = Registry;