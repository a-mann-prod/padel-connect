export type Nillable<T> = { [K in keyof T]?: T[K] | null | undefined }
