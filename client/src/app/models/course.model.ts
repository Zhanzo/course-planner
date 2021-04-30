export interface Course {
    code: string,
    name: string,
    credits: number,
    semester: Array<string>,
    level: string,
    module: Array<number>
}