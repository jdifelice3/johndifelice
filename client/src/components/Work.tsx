import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import type { Work } from '@johndifelice/types';
import type { Work } from '../types';
import { Form } from '../types';
import { fetchWorksByForm } from '../services/worksService';
import PdfViewer from './PdfViewer';
import { useToggleVisibility } from "../hooks/useToggleVisibility";

const WorkComponent = () => {
    const [works, setWorks] = useState<Work[]>([]);
    const [error, setError] = useState<string | null>(null);

    const { handleToggle } = useToggleVisibility(setWorks);

    // Hooks at top level
    let { writingForm } = useParams<{ writingForm?: string }>();
    writingForm = Form.parse(writingForm);

    useEffect(() => {
        (async () => {
        try {
            Form.parse(writingForm);
            if (!writingForm){
                const errorMessage = "A form of writing must be provided";
                console.log(errorMessage);
                setError(errorMessage);
            } else {
                const data = await fetchWorksByForm(writingForm);
                setWorks(data);
            }
        } catch (err) {
            if ((err as any)?.name !== "AbortError") setError(String(err));
            console.log(err);
        }
        })();
    }, [writingForm]); // reruns if the URL param changes

    if (error) return <div role="alert">{error}</div>;

    return (
        <>
        {works.map((work, index) => ( 
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
                        {work.manuscriptIsVisible ? "Hide" : "Read"}
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

export default WorkComponent;