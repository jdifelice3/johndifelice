import React, { useEffect, useState } from 'react';
//import type { Work } from '@johndifelice/types';
import type { Work } from '../types';
import { fetchWorksByForm } from '../services/worksService';
import PdfViewer from './PdfViewer';
import { useToggleVisibility } from "../hooks/useToggleVisibility";

const ShortStories = () => {
    const [shortStories, setShortStories] = useState<Work[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { handleToggle } = useToggleVisibility(setShortStories);

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

    return (
        <>
        {shortStories.map((work, index) => ( 
            <React.Fragment key={index ?? work.title}>
                <div className="workTitle">{work.title}</div>
                <div>{work.description}</div>
                {work.fileName.length > 0 &&
                    <button
                        id={"btn" + index}
                        type="button"
                        aria-expanded={work.manuscriptIsVisible}
                        aria-controls={`manuscript-${work.id}`}
                        onClick={(e) => handleToggle(e, work.id)} // Option A: pass id at call time
                                                                // Option B: bind once per render (nice & tidy)
                                                                // onClick={getToggleHandler(work.id)}
                    >
                        {work.manuscriptIsVisible ? "Hide" : "View"}
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