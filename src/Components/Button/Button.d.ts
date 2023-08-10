

declare namespace IButton {
    export interface IProps {
        title : string,
        className ?: string,
        disabled ?: boolean,
        loader ?: boolean,
        loaderClassName : string,
        onClick : (event: MouseEvent<HTMLDivElement, MouseEvent>) => void;
    }
}

export default IButton;