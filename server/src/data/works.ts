// import { Form, Genre } from '@johndifelice/types';
// import type { Work } from '@johndifelice/types';
import { Form, Genre, WorkSchema } from '../types.js';
import type { Work } from '../types.js'
import { z } from 'zod';

export const Works = z.array(WorkSchema).parse([
    {
        id: '1',
        title: 'American Zeroes',
        description: ' ',
        form: Form.Enum.novel,
        wordCount: 90000,
        pageCount: 230,
        genre: Genre.enum.literary,
        fileName: 'Blind Study.pdf',
        manuscriptIsVisible: false
    },
    {
        id: '2',
        title: 'Traffic Girl Wars',
        description: ' ',
        form: Form.Enum.novel,
        wordCount: 60000,
        pageCount: 175,
        genre: Genre.enum.literary,
        fileName: '',
        manuscriptIsVisible: false

    },
    {
        id: '3',
        title: 'Real Pearls',
        description: ' ',
        form: Form.Enum['short story'],
        wordCount: 0,
        pageCount: 0,
        genre: Genre.enum.literary,
        fileName: 'Real Pearls.pdf',
        manuscriptIsVisible: false
    },
    {
        id: '4',
        title: 'Blind Study',
        description: 'In a lavish room disguised as a research site, five strangers are told they’re part of a memory experiment. But when the doors lock and participants begin to collapse, the true nature of the study unravels. Blind Study is a psychological thriller that explores obedience, isolation, and the desperate need to make sense of the senseless. As trust erodes and reality blurs, the question remains: who’s conducting the experiment, and who is the real subject?',
        form: Form.Enum.play,
        wordCount: 0,
        pageCount: 0,
        genre: Genre.enum.literary,
        fileName: 'Blind Study.pdf',
        manuscriptIsVisible: false
    },
    {
        id: '5',
        title: 'Half the Rent',
        description: 'Half the Rent is a comedy about T.J., a disillusioned bookstore employee whose life takes an unexpected turn when he moves into a luxury apartment—shared with a lingerie modeling website. As he navigates a toxic workplace, a spiraling moral dilemma, and his feelings for a coworker, T.J. must decide what he’s willing to compromise for comfort, connection, and the illusion of success. A fast-paced exploration of modern masculinity, ambition, and the price of selling out.',
        form: Form.Enum.play,
        wordCount: 0,
        pageCount: 0,
        genre: Genre.enum.literary,
        fileName: '',
        manuscriptIsVisible: false
    },
    {
        id: '6',
        title: 'Himmler\'s Brain',
        description: 'Himmler’s Brain is a darkly comic stage play set in the final days of World War II, where British soldiers tasked with interrogating Nazi leader Heinrich Himmler instead bungle his custody, triggering a farcical cover-up. As his corpse becomes the centerpiece of increasingly absurd antics—from anatomical mockery to diplomatic deception—soldiers wrestle with trauma, guilt, repressed identity, and the meaning of justice. Blending historical satire with biting humor, the play confronts the grotesque legacy of war and the futility of trying to locate evil in a jar.',
        form: Form.Enum.play,
        wordCount: 0,
        pageCount: 0,
        genre: Genre.enum.literary,
        fileName: 'Himmlers Brain.pdf',
        manuscriptIsVisible: false
    },
    {
        id: '7',
        title: 'A Copenhagen Interpretation',
        description: 'In a university department, a rising professor, a troubled student, and a conflicted chairman become entangled in a web of ambition, power, and blurred truth. As a prestigious research paper hides a devastating lie, and a past violation surfaces, the characters confront the limits of knowledge, the cost of silence, and the peril of observation itself. Inspired by quantum theory and academic politics, A Copenhagen Interpretation is a psychological drama where no truth exists until someone chooses it.',
        form: Form.Enum.play,
        wordCount: 0,
        pageCount: 0,
        genre: Genre.enum.literary,
        fileName: 'Copenhagen Interpretation_v3.pdf',
        manuscriptIsVisible: false
    },
    {
        id: '8',
        title: 'Stan Slade and the Case of the Killer Meme',
        description: ' ',
        form: Form.Enum['short story'],
        wordCount: 0,
        pageCount: 0,
        genre: Genre.enum.literary,
        fileName: 'Stan Slade.pdf',
        manuscriptIsVisible: false
    },
    {
        id: '9',
        title: 'You, Me, and Dr. Sperm Makes Three',
        description: 'A married couple with fertility problems seek out the best doctor in the area, only to find that he is cavalier, abrasive, and jokes around inappropriately.',
        form: Form.Enum['short story'],
        wordCount: 0,
        pageCount: 0,
        genre: Genre.enum.literary,
        fileName: '',
        manuscriptIsVisible: false
    },
    {
        id: '10',
        title: 'Artifical Flame',
        description: ' ',
        form: Form.Enum['short story'],
        wordCount: 0,
        pageCount: 0,
        genre: Genre.enum.literary,
        fileName: '',
        manuscriptIsVisible: false
    },
    {
        id: '11',
        title: 'Spread My Ashes Like We Planned',
        description: ' ',
        form: Form.Enum['short story'],
        wordCount: 0,
        pageCount: 0,
        genre: Genre.enum.literary,
        fileName: '',
        manuscriptIsVisible: false
    },
    {
        id: '12',
        title: 'Christmas Cake',
        description: ' ',
        form: Form.Enum['short story'],
        wordCount: 0,
        pageCount: 0,
        genre: Genre.enum.literary,
        fileName: 'Christmas Cake.pdf',
        manuscriptIsVisible: false
    },
    {
        id: '13',
        title: 'Lure of the Unattainable',
        description: ' ',
        form: Form.Enum['short story'],
        wordCount: 0,
        pageCount: 0,
        genre: Genre.enum.literary,
        fileName: '',
        manuscriptIsVisible: false
    },
    { 
        id: '14',
        title: 'Are You Dead, Father?',
        description: ' ',
        form: Form.Enum['short story'],
        wordCount: 0,
        pageCount: 0,
        genre: Genre.enum.literary,
        fileName: 'are you dead father.pdf',
        manuscriptIsVisible: false
    },
    {
        id: '15',
        title: 'Does the World Make Sense?',
        description: ' ',
        form: Form.Enum['short story'],
        wordCount: 0,
        pageCount: 0,
        genre: Genre.enum.literary,
        fileName: '',
        manuscriptIsVisible: false
    },
    {
        id: '16',
        title: 'The Perils of Believing  in Santa Claus',
        description: ' ',
        form: Form.Enum['short story'],
        wordCount: 0,
        pageCount: 0,
        genre: Genre.enum.literary,
        fileName: 'Perils.pdf',
        manuscriptIsVisible: false
    },
    {
        id: '17',
        title: 'Sing For the Lonely',
        description: ' ',
        form: Form.Enum['short story'],
        wordCount: 0,
        pageCount: 0,
        genre: Genre.enum.literary,
        fileName: '',
        manuscriptIsVisible: false
    }
]);