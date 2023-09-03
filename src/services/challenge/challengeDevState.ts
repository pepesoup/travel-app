import { firebaseDbApi } from '@app/firebase/firebaseDbApi'
import { Challenge } from '@app/types/challengeTypes'
import { LoadedStateByDb } from '@app/types/stateTypes'
import { ref } from 'firebase/database'
import { RecoilState, atom } from 'recoil'
import { db } from '../../../firebaseConfig'

export const challengeListState: RecoilState<LoadedStateByDb<{ [key: string]: Challenge }>> = atom<
    LoadedStateByDb<{ [key: string]: Challenge }>
>({
    key: 'services/challengeDev/challengesState',
    default: { state: 'loading', contents: null },
    effects: [
        (ctx) =>
            firebaseDbApi.streamDbValueToAtom(
                ref(db, '/challenges/weeklyChallenges/data'),
                challengeListState
            ),
    ],
})

const test1: LoadedStateByDb<{ [key: string]: Challenge }> = {
    state: 'hasValue',
    contents: {
        timestampCreated1: {
            config: { profile: 'Mårten', version: 'v1' },
            data: {
                Fri: {
                    description: 'Description of challenge',
                    instructions: 'Instructions how to do the challenge',
                    tasks: {
                        '0-t1': { label: 'en label för 1', taskType: 't1' },
                        '1-t2': { label: 'en label för 2', taskType: 't2' },
                        videoDoAlong: { label: 'lbl', taskType: 'videoDoAlong', video: 'v1' },
                    },
                    title: 'a title',
                    videoId: 'v6',
                },
                Mon: {
                    description:
                        'Idag går Anna igenom övningen från dag 1 samt går igenom Asana (ställning) som heter "Dog Position". ',
                    instructions:
                        'Se filmen till slutet, titta igen om det behövs och genomför övningen. I denna vida gör du en enkel Vinyasa Flow mellan 2 olika asanas (ställningar).',
                    tasks: {
                        '0-t1': { label: 'foo', taskType: 't1' },
                        '1-t2': { label: 'Jag har gjort "Dog Position"', taskType: 't2' },
                        videoDoAlong: { label: 'lbl', taskType: 'videoDoAlong', video: 'v1' },
                    },
                    title: 'Dog Position',
                    videoId: 'v2',
                },
                Thu: {
                    description:
                        'One of my wife’s third graders was wearing a Fitbit watch, which prompted my wife to ask, “Are you tracking your steps?” “No,” said the little girl. “I wear this...',
                    instructions: 'Instructions how to do the challenge',
                    tasks: {
                        '0-t1': { label: 'foo', taskType: 't1' },
                        '1-t2': { label: 'Jag har gjort "Dog Position"', taskType: 't2' },
                        videoDoAlong: { label: 'lbl', taskType: 'videoDoAlong', video: 'v1' },
                    },
                    title: "Thurday's title",
                    videoId: 'v5',
                },
                Tue: {
                    description:
                        'Idag går Anna igenom övningen från dag 1 samt går igenom Asana (ställning) som heter "Kobra". Utmärkt övning för att sträcka ut magmuskulaturen på ett enkelt sätt. ',
                    instructions:
                        'Glöm inte att markera hjärtat när du gjort övningen, så du får dina poäng!',
                    tasks: {
                        '0-t1': { label: 'foo', taskType: 't1' },
                        '1-t2': { label: 'Jag har gjort "Kobran"', taskType: 't2' },
                        videoDoAlong: { label: 'lbl', taskType: 'videoDoAlong', video: 'v1' },
                    },
                    title: 'Kobran',
                    videoId: 'v3',
                },
                Wed: {
                    description:
                        'Idag går Anna igenom övningen från dag 1 samt går igenom Asana (ställning) som heter "Kobra". Utmärkt övning för att sträcka ut magmuskulaturen på ett enkelt sätt. ',
                    instructions:
                        'Glöm inte att markera hjärtat när du gjort övningen, så du får dina poäng!',
                    tasks: {
                        '0-t1': { label: 'foo', taskType: 't1' },
                        '1-t2': { label: 'Jag har gjort "Dog Position"', taskType: 't2' },
                        videoDoAlong: { label: 'lbl', taskType: 'videoDoAlong', video: 'v1' },
                    },
                    title: 'Kobran',
                    videoId: 'v4',
                },
                intro: {
                    description:
                        'I denna yoga-challenge kommer Anna att gå igenom 5 olika positioner, eller Asanas, som det heter på Yogaspråk.',
                    instructions:
                        'Varje dag, måndag till Fredag kommer du lära dig en nu Asanas. Du kommer också att få lära dig att förflytta dig mellan varje asanas. Så på Fredagen, så kommer du ha ett flow med 5 olika asanas. Att "flöda", eller förflytta sig mellan olika asanas kallas i yogaspråk för Vinyasa. Du lär dig ett Vinyasa Flow.',
                    tasks: { '0-t1': { label: 'foo', taskType: 't1' } },
                    title: 'Vinyasa Flow',
                    videoId: 'v1',
                },
            },
            info: { createdAt: 'Human readable date' },
        },
        timestampCreated2: {
            config: { profile: 'Mårten', version: 'v1' },
            data: {
                Fri: {
                    description: 'Description of challenge',
                    instructions: 'Instructions how to do the challenge',
                    tasks: {
                        '0-t1': { label: 'en label för 1', taskType: 't1' },
                        '1-t2': { label: 'en label för 2', taskType: 't2' },
                        videoDoAlong: { label: 'lbl', taskType: 'videoDoAlong', video: 'v1' },
                    },
                    title: 'a title',
                    videoId: 'v6',
                },
                Mon: {
                    description:
                        'Idag går Anna igenom övningen från dag 1 samt går igenom Asana (ställning) som heter "Dog Position". ',
                    instructions:
                        'Se filmen till slutet, titta igen om det behövs och genomför övningen. I denna vida gör du en enkel Vinyasa Flow mellan 2 olika asanas (ställningar).',
                    tasks: {
                        '0-t1': { label: 'foo', taskType: 't1' },
                        '1-t2': { label: 'Jag har gjort "Dog Position"', taskType: 't2' },
                        videoDoAlong: { label: 'lbl', taskType: 'videoDoAlong', video: 'v1' },
                    },
                    title: 'Dog Position',
                    videoId: 'v2',
                },
                Thu: {
                    description:
                        'One of my wife’s third graders was wearing a Fitbit watch, which prompted my wife to ask, “Are you tracking your steps?” “No,” said the little girl. “I wear this...',
                    instructions: 'Instructions how to do the challenge',
                    tasks: {
                        '0-t1': { label: 'foo', taskType: 't1' },
                        '1-t2': { label: 'Jag har gjort "Dog Position"', taskType: 't2' },
                        videoDoAlong: { label: 'lbl', taskType: 'videoDoAlong', video: 'v1' },
                    },
                    title: "Thurday's title",
                    videoId: 'v5',
                },
                Tue: {
                    description:
                        'Idag går Anna igenom övningen från dag 1 samt går igenom Asana (ställning) som heter "Kobra". Utmärkt övning för att sträcka ut magmuskulaturen på ett enkelt sätt. ',
                    instructions:
                        'Glöm inte att markera hjärtat när du gjort övningen, så du får dina poäng!',
                    tasks: {
                        '0-t1': { label: 'foo', taskType: 't1' },
                        '1-t2': { label: 'Jag har gjort "Kobran"', taskType: 't2' },
                        videoDoAlong: { label: 'lbl', taskType: 'videoDoAlong', video: 'v1' },
                    },
                    title: 'Kobran',
                    videoId: 'v3',
                },
                Wed: {
                    description:
                        'Idag går Anna igenom övningen från dag 1 samt går igenom Asana (ställning) som heter "Kobra". Utmärkt övning för att sträcka ut magmuskulaturen på ett enkelt sätt. ',
                    instructions:
                        'Glöm inte att markera hjärtat när du gjort övningen, så du får dina poäng!',
                    tasks: {
                        '0-t1': { label: 'foo', taskType: 't1' },
                        '1-t2': { label: 'Jag har gjort "Dog Position"', taskType: 't2' },
                        videoDoAlong: { label: 'lbl', taskType: 'videoDoAlong', video: 'v1' },
                    },
                    title: 'Kobran',
                    videoId: 'v4',
                },
                intro: {
                    description:
                        'I denna yoga-challenge kommer Anna att gå igenom 5 olika positioner, eller Asanas, som det heter på Yogaspråk.',
                    instructions:
                        'Varje dag, måndag till Fredag kommer du lära dig en nu Asanas. Du kommer också att få lära dig att förflytta dig mellan varje asanas. Så på Fredagen, så kommer du ha ett flow med 5 olika asanas. Att "flöda", eller förflytta sig mellan olika asanas kallas i yogaspråk för Vinyasa. Du lär dig ett Vinyasa Flow.',
                    tasks: { '0-t1': { label: 'foo', taskType: 't1' } },
                    title: 'Vinyasa Flow',
                    videoId: 'v1',
                },
            },
            info: { createdAt: 'Human readable date' },
        },
    },
}
