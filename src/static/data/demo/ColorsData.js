let usage = `
@import '~@betao/ds/vars';

.some-class {
  color: @color-gray-100;
}
`.slice(1);

let colors = {
  grays: [
    'color-gray-100',
    'color-gray-200',
    'color-gray-300',
    'color-gray-400',
    'color-gray-500'
  ],
  primary: ['color-dark', 'color-primary', 'color-white'],
  system: ['color-blue', 'color-red', 'color-yellow']
};

export default {
  usage,
  colors
};
