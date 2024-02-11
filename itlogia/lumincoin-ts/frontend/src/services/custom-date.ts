export class CustomDate {
    public static toCustomDateFormat(date: string): string {
        let rawDate: string[] = date.split('-');
        return  rawDate[2] + '.' + rawDate[1] + '.' + rawDate[0];
    }
}