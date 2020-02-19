let usage = `
<Button ref="dropButton" @click="dropdownOpened = !dropdownOpened">
  Position
</Button>
<Dropdown
  :target="$refs.dropButton"
  :opened.sync="dropdownOpened"
  :position="position"
  :borderColor="borderColor"
>
  ...
</Dropdown>
`.slice(1);

const scheme = `
+--- ----- --------------------------------------------------------+
|              top-left      top-middle     top-right              |
|                +--------------------------------+                |
|                |       |                |       |                |
|                |       |                |       |                |
|  left-top      |       |                |       |     right-top  |
|   +------------------+ |                | +------------------+   |
|   |            |     | |                | |     |            |   |
|   |            |     | |                | |     |            |   |
|   |            |     | |                | |     |            |   |
|   |            +--------------------------------+            |   |
|   +------------------+ +----------------+ +------------------+   |
|   |                  | |                | |                  |   |
|  left-center         | |     default    | |        right-center  |
|   |                  | |                | |                  |   |
|   +------------------+ +----------------+ +------------------+   |
|   |            +--------------------------------+            |   |
|   |            |     | |                | |     |            |   |
|   |            |     | |                | |     |            |   |
|   |            |     | |                | |     |            |   |
|   +------------------+ |                | +------------------+   |
|  left-bottom   |       |                |       |   right-bottom |
|                |       |                |       |                |
|                |       |                |       |                |
|                +--------------------------------+                |
|            bottom-left   bottom-middle   bottom-right            |
|                                                                  |
+------------------------------------------------------------------+
`;

let positions = [
  'bottom-left',
  'bottom-middle',
  'bottom-right',
  'left-bottom',
  'left-center',
  'left-top',
  'default',
  'right-bottom',
  'right-center',
  'right-top',
  'top-left',
  'top-middle',
  'top-right'
];

export default {
  usage,
  scheme,
  positions
};
