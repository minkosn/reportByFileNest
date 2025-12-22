interface alphabetConverterMap {
    text: string;
    convert?: {
        [key: string]: string;
    };
}
export declare const alphabetConverter: ({ text, convert }: alphabetConverterMap) => string;
export {};
