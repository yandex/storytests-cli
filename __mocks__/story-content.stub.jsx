import React from 'react';

export default {
  title: 'Components/RoundedButton',
  argTypes: {
    view: {
      name: 'view',
      defaultValue: 'primary',
      control: { type: 'boolean' },
    },
    label: {
      name: 'label',
      defaultValue: 'Label',
      control: { type: 'text' },
    },
  },
};

const Template = (args) => <RoundedButton {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  view: 'primary',
  label: 'Primary',
};

export const Secondary = Template.bind({});

Secondary.args = {
  view: 'secondary',
  label: 'Secondary',
};

export const SecondaryWithLongLabel = Template.bind({});

SecondaryWithLabel.args = {
  view: 'secondary',
  label: 'Very very very long label',
};
