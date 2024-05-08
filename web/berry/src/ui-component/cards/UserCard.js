/*
 * UserCard.js
 *
 * This file uses code from the Minimal UI project, available at
 * https://github.com/minimal-ui-kit/material-kit-react/blob/main/src/sections/blog/post-card.jsx
 *
 * Minimal UI is licensed under the MIT License. A copy of the license is included below:
 *
 * MIT License
 *
 * Copyright (c) 2021 Minimal UI (https://minimals.cc/)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { Box, Avatar } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Card from '@mui/material/Card';
import shapeAvatar from 'assets/images/icons/shape-avatar.svg';
import coverAvatar from 'assets/images/invite/cover.jpg';
import userAvatar from 'assets/images/users/user-round.svg';
import SvgColor from 'ui-component/SvgColor';

import React from 'react';

export default function UserCard({ children }) {
  const renderShape = (
    <SvgColor
      color="paper"
      src={shapeAvatar}
      sx={{
        width: '100%',
        height: 62,
        zIndex: 10,
        bottom: -26,".```jsx
format: Return only the translated content, not including the original text.
```