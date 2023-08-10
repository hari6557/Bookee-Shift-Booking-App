import type { Meta, StoryObj } from "@storybook/react";
import Loader from ".";

const meta = {
    title : "Components/Loader",
    component : Loader
}satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GreenSpinner : Story = {
    args : {
        className : 'border-[#16A64D] border-r-[#CAEFD8] border-b-[#CAEFD8]',

    }
}

export const RedSpinner : Story = {
    args : {
        className : 'border-[#E2006A] border-r-[#EED2DF] border-b-[#EED2DF]',

    }
}