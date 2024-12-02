import React from 'react';
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./select";

const meta: Meta<typeof Select> = {
  title: "components/atoms/select/select.tsx",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const FirstStory: Story = {
  render: (args) => (
    <Select {...args}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  ),
  args: {
    className: "border",
    borderColor: "primary",
    borderSize: "sm",
    paddingX: "sm",
    paddingY: "sm",
    borderRadius: "md",
    // onChange: action("dfg"),
  },
};
