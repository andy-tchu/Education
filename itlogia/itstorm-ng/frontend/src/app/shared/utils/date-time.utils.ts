export class DateTimeUtils {

    static dateCustomFormatting(date: Date): string {
        function padStart(value: number): string {
            return value.toString().padStart(2, '0');
        }

        return `${padStart(date.getDate())}.${padStart(date.getMonth() + 1)}.${date.getFullYear()} ${padStart(date.getHours())}:${padStart(date.getMinutes())}`;
    }
}
