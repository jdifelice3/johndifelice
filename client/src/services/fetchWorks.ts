import type { Work } from '@johndifelice/types'; 

export const fetchWorks = async() => {
    const response = await fetch('/api/works');
    console.log('response', response);
    const data:Work[] = await response.json();

    return data;
}