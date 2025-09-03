// import { useState } from 'react';
// import type { Work } from '../types';

// export const usePageLogic = () => {

//     const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
//         event.stopPropagation();

//         const idx = plays.findIndex(w => w.id === id);
//         if (idx === -1) return;

//         const next = [...plays]; // new array
//         next[idx] = { ...next[idx], manuscriptIsVisible: !next[idx].manuscriptIsVisible }; // new object
//         setPlays(next); // new reference -> re-render
//     };
// }