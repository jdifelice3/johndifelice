import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
//import type { Work } from '@johndifelice/types';
import type { Work } from '../types';
import { fetchWorksByForm } from '../services/worksService';
import PdfViewer from './PdfViewer';
import Button from '@mui/material/Button';

const Plays = () => {
    const [plays, setPlays] = useState<Work[]>([]);
    const [showPdf, setShowPdf] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const data: Work[] = await fetchWorksByForm('play');
                console.log('data', data);
                setPlays(data);
            } catch (err) {
                if ((err as any)?.name !== 'AbortError') setError(String(err));
                console.log(error);
            }
        })();
    }, []);

    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
        event.stopPropagation();

        const idx = plays.findIndex(w => w.id === id);
        if (idx === -1) return;

        const next = [...plays]; // new array
        next[idx] = { ...next[idx], manuscriptIsVisible: !next[idx].manuscriptIsVisible }; // new object
        setPlays(next); // new reference -> re-render
    };

    return (
        <>
        {plays.map((work, index) => ( 
            <React.Fragment key={index ?? work.title}>
                <div className="workTitle">{work.title}</div>
                <div>{work.description}</div>
                {work.fileName.length > 0 &&
                    <button id={'btn' + index} key={index} onClick={ (e) => handleOnClick(e, work.id)}>
                        {work.manuscriptIsVisible ? "Hide Play" : "View Play"}
                    </button>
                }
                {work.manuscriptIsVisible && (
                    <div id={'pdf' + index} style={{ marginTop: 12 }}>
                        <PdfViewer fileUrl={`http://localhost:3000/api/pdf/${encodeURIComponent(work.fileName)}`} zoom='page-fit' />
                        <div>&nbsp;</div>
                    </div>
                )}
                <div>&nbsp;</div>
            </React.Fragment>   
        ))}
        </>
    )
}

export default Plays;