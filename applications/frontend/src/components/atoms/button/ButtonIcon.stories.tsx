import type { Meta, StoryObj } from '@storybook/react';
import { ButtonIcon } from './ButtonIcon';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof ButtonIcon> = {
    title: "components/atoms/button/ButtonIcon.tsx",
  component: ButtonIcon ,
  parameters: {
      layout: "centered",
  },
  tags:["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonIcon>;

export const FirstStory: Story = {
  args: {
  
  },

    //👇 The args you need here will depend on your component
}
