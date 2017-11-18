
declare type Error = {
    date: date;
    message: string;
}

declare type ErrorsState = {
    items: Array<Error>;
    show: ?Error;
}
