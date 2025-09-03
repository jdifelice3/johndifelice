import React, { useEffect, useState } from 'react';
//import type { Work } from '@johndifelice/types';
import type { Work } from '../types';
import { fetchWorksByForm } from '../services/worksService';
import PdfViewer from './PdfViewer';

const ShortStories = () => {
    const [shortStories, setShortStories] = useState<Work[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const data: Work[] = await fetchWorksByForm('short story');
                console.log('data', data);
                setShortStories(data);
            } catch (err) {
                if ((err as any)?.name !== 'AbortError') setError(String(err));
                console.log(error);
            }
        })();
    }, []);

    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
        event.stopPropagation();

        const idx = shortStories.findIndex(w => w.id === id);
        if (idx === -1) return;

        const next = [...shortStories]; // new array
        next[idx] = { ...next[idx], manuscriptIsVisible: !next[idx].manuscriptIsVisible }; // new object
        setShortStories(next); // new reference -> re-render
    };

    return (
        <>
        {shortStories.map((work, index) => ( 
            <React.Fragment key={index ?? work.title}>
                <div className="workTitle">{work.title}</div>
                <div>{work.description}</div>
                {work.fileName.length > 0 &&
                    <button id={'btn' + index} key={index} onClick={ (e) => handleOnClick(e, work.id)}>
                        {work.manuscriptIsVisible ? "Hide Short Story" : "View Short Story"}
                    </button>
                }
                <div>&nbsp;</div>
                {work.manuscriptIsVisible && (
                    <div id={'pdf' + index} style={{ marginTop: 12 }}>
                        <PdfViewer fileUrl={`http://localhost:3000/api/pdf/${encodeURIComponent(work.fileName)}`} zoom='page-fit' />
                        <div>&nbsp;</div>
                    </div>
                )}
            </React.Fragment>   
        ))}
        </>
    )
}

export default ShortStories;