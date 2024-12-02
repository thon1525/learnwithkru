import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Button> = {
  title: "./components/atoms/button/button.tsx",
  component: Button,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/proto/ij4jlwjEniD1K69xLpaSt0/KRU-UI?node-id=3414-4244&t=F8NlMt5fanGHi8bf-0&scaling=min-zoom&page-id=3414%3A4204",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const FirstStory: Story = {
  args: {
    className:"w-[100px] h-[45px]",
    children: "Button",
    colorScheme: "primary",
    isDisabled: false,
    radius: "md",
    fontColor: "white",
    fontSize: "sm",
  },
  //👇 The args you need here will depend on your component
};
