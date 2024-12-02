import type { Meta, StoryObj } from "@storybook/react";
import { InputForm } from "./inputform";
import { action } from '@storybook/addon-actions';
import { userEvent, within, expect } from '@storybook/test';

const meta: Meta<typeof InputForm> = {
    title: "components/atoms/input/InputForm.tsx",
    component: InputForm,
    argTypes: {
        onChange: { action: "input" }
    },
    parameters: {
        layout: "centered",
        design: {
            type: "figma",
            url: "https://www.figma.com/proto/ij4jlwjEniD1K69xLpaSt0/KRU-UI?node-id=3414-4437&t=F8NlMt5fanGHi8bf-0&scaling=min-zoom&page-id=3414%3A4436",
        }
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputForm>

export const FirstStory: Story = {
    args: {
        className: "",
        type: "text",
        placeholder: "example@gmail.com", // Ensure this matches your test
        borderColor: "primary",
        borderSize: "sm",
        paddingX: "sm",
        paddingY: "sm",
        borderRadius: "sm",
        onChange: action("input")
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = await canvas.getByPlaceholderText(
            /example@gmail.com/i // Ensure this matches your placeholder
        );
    
        // Simulate typing into the input field
        await userEvent.type(input, "Write to testing input");
    
        // Check if the input value has changed
        await expect(input).toHaveValue("Write to testing input");
    },
}
