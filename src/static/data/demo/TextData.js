let usage = `
@import '~@betao/ds/vars';

.some-class {
  .font-desktop-body-medium-dark-center();
}
`.slice(1);

let fontStyles = [
  'font-components-button-big',
  'font-components-button-normal',
  'font-components-button-normal-alt',
  'font-components-button-normal-alt-center',
  'font-components-button-normal-alt-dark',
  'font-components-button-normal-center',
  'font-components-button-normal-right',
  'font-components-tab-active',
  'font-components-tab-inactive',
  'font-desktop-body-medium-dark',
  'font-desktop-body-medium-dark-center',
  'font-desktop-body-medium-dark-right',
  'font-desktop-body-medium-gray',
  'font-desktop-body-medium-gray-center',
  'font-desktop-body-medium-light-gray',
  'font-desktop-body-medium-light-gray-center',
  'font-desktop-body-medium-primary',
  'font-desktop-body-medium-primary-center',
  'font-desktop-body-regular-accent',
  'font-desktop-body-regular-dark',
  'font-desktop-body-regular-dark-center',
  'font-desktop-body-regular-gray',
  'font-desktop-body-regular-gray-center',
  'font-desktop-h-2-dark',
  'font-desktop-h-2-dark-center',
  'font-desktop-h-3-dark',
  'font-desktop-h-3-dark-center',
  'font-desktop-small-italic-gray',
  'font-desktop-small-medium-accent-center',
  'font-desktop-small-medium-dark',
  'font-desktop-small-medium-dark-center',
  'font-desktop-small-medium-dark-right',
  'font-desktop-small-regular-accent',
  'font-desktop-small-regular-accent-center',
  'font-desktop-small-regular-dark',
  'font-desktop-small-regular-dark-center',
  'font-desktop-small-regular-dark-right',
  'font-desktop-small-regular-gray',
  'font-desktop-small-regular-gray-center',
  'font-desktop-small-regular-gray-right',
  'font-desktop-small-regular-light-gray',
  'font-desktop-x-small-regular-accent',
  'font-desktop-x-small-regular-dark',
  'font-desktop-x-small-regular-gray',
  'font-desktop-x-small-regular-gray-right'
];

export default {
  usage,
  fontStyles
};
