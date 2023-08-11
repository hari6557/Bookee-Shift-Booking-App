declare namespace IShifts {
    export interface IProps{
        area : any
        booked : boolean
        timeStamp  : any
        showArea : any
        isOverlapping : any
        canBeCancelled : any
        handleBook : ()=> void
        handleCancel : () => void
        loader : boolean
    }
}