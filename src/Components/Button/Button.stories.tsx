import type { Meta, StoryObj } from "@storybook/react";
import Button from ".";

const meta = {
    title : "Components/Button",
    component : Button
}satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Book : Story = {
    args : {
        title : 'Book',
        className : 'border-[#55CB82] text-[#16A64D] text-extrabold',
        disabled : false,
        loader : true,
        loaderClassName : 'border-[#16A64D] border-r-[#CAEFD8] border-b-[#CAEFD8]'
    }
}

export const Cancel : Story = {
    args : {
        title : 'Cancel',
        className : 'border-[#FE93B3] text-[#E2006A] text-extrabold',
        disabled : false,
        loaderClassName : 'border-[#E2006A] border-r-[#EED2DF] border-b-[#EED2DF]'
    }
}