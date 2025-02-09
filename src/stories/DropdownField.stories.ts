import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { DropdownSearch } from './DropdownField';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/DropdownField',
  component: DropdownSearch,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
    // options: [],
    // outline: true,
    // multiple: false,
    onReturnValue: fn()
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    options: ['option one', 'option two', 'option three', 'option four', 'option five'],
    outline: false,
    multiple: true
  },
} satisfies Meta<typeof DropdownSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    options: ['option one', 'option two', 'option three', 'option four', 'option five'],
    outline: false,
    multiple: true,
    onReturnValue: (value: string[] | string) => {
      // setValueFromChild(value);
      console.log('handleValueFromChild',value)
    }
  },
};
