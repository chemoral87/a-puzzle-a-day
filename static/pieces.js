export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
]

export const pieces = [
  {
    shape: [
      [1, 1, 0, 0],
      [0, 1, 1, 1],
    ],
    name: 'a',
    color: 'red',
    transforms: [
      'rotate90',
      'rotate90',
      'rotate90',
      'flipH',
      'rotate90',
      'rotate90',
      'rotate90',
      'flipH',
    ],
  },
  {
    shape: [
      [1, 1, 1],
      [1, 1, 1],
    ],
    name: 'b',
    color: 'blue',
    transforms: ['rotate90', 'rotate90'],
  },
  {
    shape: [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    name: 'c',
    color: 'green',
    transforms: ['rotate90', 'flipH', 'rotate90', 'flipH'],
  },
  {
    shape: [
      [0, 0, 1],
      [0, 0, 1],
      [1, 1, 1],
    ],
    name: 'd',
    color: 'pink',
    transforms: ['rotate90', 'rotate90', 'rotate90', 'rotate90'],
  },
  {
    shape: [
      [0, 1, 1],
      [1, 1, 1],
    ],
    name: 'e',
    color: 'orange',
    transforms: [
      'rotate90',
      'rotate90',
      'rotate90',
      'flipH',
      'rotate90',
      'rotate90',
      'rotate90',
      'flipH',
    ],
  },
  {
    shape: [
      [0, 0, 1, 0],
      [1, 1, 1, 1],
    ],
    name: 'f',
    color: 'purple',
    transforms: [
      'rotate90',
      'rotate90',
      'rotate90',
      'flipH',
      'rotate90',
      'rotate90',
      'rotate90',
      'flipH',
    ],
  },
  {
    shape: [
      [1, 0, 1],
      [1, 1, 1],
    ],
    name: 'g',
    color: 'violet',
    transforms: ['rotate90', 'rotate90', 'rotate90', 'rotate90'],
  },
  {
    shape: [
      [0, 0, 0, 1],
      [1, 1, 1, 1],
    ],
    name: 'h',
    color: 'DarkTurquoise',
    transforms: [
      'rotate90',
      'rotate90',
      'rotate90',
      'flipH',
      'rotate90',
      'rotate90',
      'rotate90',
      'flipH',
    ],
  },
]
