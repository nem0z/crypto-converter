export type currency = {
    id: string;
    symb: string;
    name: string;
    rank: number
    price: number;
    img: string;
}

export type selectedCurrency = currency & {
    amount: string;
};

export type propsConverter = {
    currencies: currency[];
}

export type propsConvertField = {
    currencies: currency[];
    current: selectedCurrency;
    onChange: (c: selectedCurrency) => void;
}

export type propsConverterList = {
    currencies: currency[];
    onSelect: (c: currency) => void;
    onClose: () => void;
}