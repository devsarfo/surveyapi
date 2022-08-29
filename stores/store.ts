export interface Store<T> {
    get(id: string) : T;
    getAll() : T[];
    insert(data: any) : any; 
    update(data: any) : any; 
    delete(data: any) : any; 
} 