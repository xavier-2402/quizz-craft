export class RegularExpressions{
    static REG_EXP_LETTERS:RegExp = /^[a-zA-ZñÑ\s]+$/;
    static REG_EXP_NUMBERS:RegExp = /^[0-9]+$/;
    static REG_EXP_USERNAME:RegExp = /^[a-zA-Z0-9@_.]{5,40}$/;
    static REG_EXP_CELLPHONE:RegExp = /^[0-9]{7,10}$/;
    static REG_EXP_TELEPHONE: RegExp = /^[0-9]{7,10}$/;
    static REG_EXP_EMAIL: RegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    static REG_EXP_PASSWORD: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
    static REG_EXP_USER: RegExp = /(^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$)|(^[a-zA-Z0-9]{3,20}$)/;
}