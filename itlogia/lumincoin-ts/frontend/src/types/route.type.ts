export type RouteType =
    {
        route: string,
        title: string,
        template: string,
        styles: string,
        navbar: boolean;
        load(): void
    }