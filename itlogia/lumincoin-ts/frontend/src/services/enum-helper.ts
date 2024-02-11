export class EnumHelper {
    public static stringToEnum<T extends { [index: string]: string }>(value: string, enumType: T): T[keyof T] | undefined {
        let enumKeys: string[] = Object.keys(enumType).filter(x => enumType[x] == value);
        if (enumKeys.length > 0) {
            return enumType[enumKeys[0]] as T[keyof T];
        }
        return undefined;
    }
}