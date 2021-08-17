/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Handler} from '@netlify/functions';

import {createPlaygroundResponse} from '../functionUtils/playgroundUtils';

export const handler: Handler = async function (_event, _context) {
  return createPlaygroundResponse('stackblitz');
};
