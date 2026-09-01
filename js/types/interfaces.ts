export interface PopupData {
    [key: string]: string;
}

export interface Response {
    status: string;
    error: string | null;
    successAction: string;
    url: unknown;
}

export interface CookieOptions {
    path?: string;
    domain?: string;
    expires?: Date | string;
    secure?: boolean;
    'max-age'?: number;
    [key: string]: any;
}