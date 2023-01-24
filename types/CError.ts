export class CError extends Error {
    statusCode: number | undefined
    details: any | undefined
}
