import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './typography';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Typography> = {
    title: "components/atoms/typography/Typography.tsx",
  component: Typography ,
  parameters: {
      layout: "centered",
      design: {
        type: "figma",
        url: "https://www.figma.com/proto/ij4jlwjEniD1K69xLpaSt0/KRU-UI?node-id=3414-4140&t=F8NlMt5fanGHi8bf-0&scaling=min-zoom&page-id=3412%3A854",
      }
  },
  tags:["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const FirstStory: Story = {
  args: {
      children: "Hello world",
      className: "",
      align: "center",
      fontSize: "base",
      variant: "normal",
      colorscheme:"primary"
  },

    //👇 The args you need here will depend on your component
}
