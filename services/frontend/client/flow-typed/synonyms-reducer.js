
declare type Synonym = {
    id: string;
}

declare type SynonymsState = {
    items: Array<Synonym>;
    show: ?Synonym;
}
