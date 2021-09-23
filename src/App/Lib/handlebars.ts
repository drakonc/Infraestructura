export function isEqualHelperHandlerbar (v1:any, v2:any, options:any): boolean {
    if (v1 === v2) 
        return options.fn()
    else 
        return false;
}