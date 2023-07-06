export interface OgPreview {
    success: number;
    meta: {
        title: string;
        description: string;
        siteName: string;
        url: string;
        image: {
            url: string;
            alt: string;
            width: string;
            height: string;
        }
    }
}