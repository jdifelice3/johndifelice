import { useEffect, useState } from 'react';
import type { Work } from '@johndifelice/types';
//import { fetchWorks } from '../services/fetchWorks';

const Novels = () => {
    const [novels, setNovels] = useState<Work[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log('in useEffect');
        const ac = new AbortController();

        (async () => {
            try {
                const res = await fetch('/api/works', { signal: ac.signal });
                if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
                setNovels(await res.json());
                console.log('novels', JSON.stringify(novels));
            } catch (err) {
                if ((err as any)?.name !== 'AbortError') setError(String(err));
            }
        })();
        return () => ac.abort();
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