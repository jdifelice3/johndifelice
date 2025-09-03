//import type { Work } from '@johndifelice/types'; 
import type { Work } from '../types';
export const fetchWorks = async() => {
    const res = await fetch('/api/works');

    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

    const data:Work[] = await res.json();

    return data;
}

export const fetchWorksByForm = async(form: string) => {
    const res = await fetch(`http://localhost:3000/api/works/${form}`);

    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

    const data:Work[] = await res.json();

    return data;
}