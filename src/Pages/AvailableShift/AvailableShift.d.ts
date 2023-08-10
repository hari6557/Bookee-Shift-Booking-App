declare namespace IAvailableShift {
    export interface IProps {
        
    }

    export interface IShiftCardProps {
        totalDays : any;
        handleTabClick : (event: MouseEvent<HTMLDivElement, MouseEvent>) => void;
        cityCounts : any
        loading: boolean
    }
}
