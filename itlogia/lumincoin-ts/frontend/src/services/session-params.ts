export class SessionParams {
    private static categoryIdKey = 'categoryId';
    private static operationIdKey = 'operationId';

    public static setCategoryId(value: string):void {
        sessionStorage.setItem(this.categoryIdKey, value);
    }

    public static getCategoryId(): string | null {
        return sessionStorage.getItem(this.categoryIdKey);
    }

    public static setOperationId(value: string): void {
        sessionStorage.setItem(this.operationIdKey, value);
    }

    public static getOperationId(): string | null {
        return sessionStorage.getItem(this.operationIdKey);
    }
}