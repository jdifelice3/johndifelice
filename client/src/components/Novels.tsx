import { useEffect, useState } from 'react';
import type { Work } from '@johndifelice/types';
import { fetchWorksByForm } from '../services/worksService';

const Novels = () => {
    const [novels, setNovels] = useState<Work[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const data: Work[] = await fetchWorksByForm('novel');
                setNovels(data);
            } catch (err) {
                if ((err as any)?.name !== 'AbortError') {
                    setError(String(err));
                    console.log(error);
                }
            }
        })();
    }, []);

    return (
        <>
        <div className="sectionTitle">
            Novels:
        </div>
            {novels.map((work: Work, index: number) => {
                return <div key={index}>{work.title}</div>
            })
            }
        </>
    )
}

export default Novels;