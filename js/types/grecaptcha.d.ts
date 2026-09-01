declare var grecaptcha: {
    execute(siteKey: string, options?: { action: string }): Promise<string>;
    render(container: string | HTMLElement, parameters: any): number;
    reset(widgetId?: number): void;
    getResponse(widgetId?: number): string;
};