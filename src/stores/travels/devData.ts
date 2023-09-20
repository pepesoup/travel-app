import { Schema, Travel, EventType, Event, TravelFromDb } from '../types'
import { eventTypes } from './schema/event.constants'

/******************** Travels *********************/

export const travels: { [travelId: string]: TravelFromDb } = {
    travelId1: {
        startDate: '2023-10-1',
        endDate: '2023-10-7',
        residence: {
            name: 'Hotell Levante',
            place: 'Rhodos',
            address: ['Levante', 'GR-851 03', 'Rhodes'],

            web: 'https://www.apollo.se/grekland/rhodos/afandou-och-kolymbia/hotell/levante--powered-by-playitas?productCategoryCode=FlightAndHotel&catalogueItemId=165291&page=priceCalendar&departureAirportCode=ARN&duration=0&paxAges=18,18&departureDate=2023-09-10&isExternalFlight=false&arrivalAirportCode=RHO&flightPackageCode=1~v:3;onr:NVR279;inr:NVR280;dair:ARN;ddate:2023-09-10;dur:7;cls:Y;i_tp:0;aair:RHO;outdeptime:20230910T0705;outarrtime:20230910T1200;indeptime:20230917T1300;inarrtime:20230917T1600;cyc:20230910%7C20230917;fcd:ARNRHO71ARNRHO%7CARNRHO71RHOARN;id:187931625%2F403211%7C187933865%2F403212',
            email: 'hotel@email.com',
            tel: '+33 33 33',
            pictureUrl:
                'https://bilder.apollo.se/levante--powered-by-playitas-1662716385-553846-WideInspirationalPhoto.jpg',
        },
        acuteContact: [
            {
                name: 'Acute Charles',
                tel: ['+33 33 33', '+33 44 44'],
                email: 'hotel@email.com',
            },
        ],
        schema: {
            0: {
                guid1: {
                    uuid: 'guid1',
                    day: 0,
                    time: '19:00',
                    type: eventTypes.meal,
                    description: 'Gemensam middag',
                },
            },
            1: {
                guid2: {
                    uuid: 'guid2',
                    day: 1,
                    time: '08:00',
                    type: eventTypes.walk,
                    description: 'Morgonpromenad',
                },
            },
            2: {
                guid3: {
                    uuid: 'guid3',
                    day: 2,
                    time: '08:00',
                    type: eventTypes.meal,
                    description: 'Frukost',
                },
                guid5: {
                    uuid: 'guid5',
                    day: 2,
                    time: '19:00',
                    type: eventTypes.meal,
                    description: 'Gemensam middag',
                },
                guid4: {
                    uuid: 'guid4',
                    day: 2,
                    time: '12:30',
                    type: eventTypes.meal,
                    description: 'Lunch',
                },
            },
            3: {},
            4: {},
            5: {},
            6: {},
        },
        notes: {
            id4: {
                subject: 'Nytt inlägg i bloggen',
                message: 'Liten beskrivning vad det handlar om',
                timestamp: '1695239895',
                type: 'schema',
                icon: 'calendar-month-outline',
            },
            id3: {
                subject: 'Nytt uppdatering i schemat',
                message: 'Liten beskrivning vad det handlar om',
                timestamp: '1695237895',
                type: 'travel',
                icon: 'airplane',
            },
            id2: {
                subject: 'Nytt inlägg i info',
                message: 'Liten beskrivning vad det handlar om',
                timestamp: '1695236895',
                type: 'schema',
                icon: 'calendar-month-outline',
            },
            id1: {
                subject: 'Träningspass inställt',
                message: 'Liten beskrivning vad det handlar om',
                timestamp: '1695235895',
                type: 'schema',
                icon: 'calendar-month-outline',
            },
        },
    },
}

/******************** Schemas *********************/
/*
export const schemas: { [travelId: string]: Schema } = {
    travelId1: {
        1: {
            '8:00': { type: eventTypes.walk, description: 'Morgonpromenad' },
            '8:30': { type: eventTypes.meal, description: 'Frukost' },
            '10:30': { type: eventTypes.yoga, description: 'Yoga' },
            '12:30': { type: eventTypes.meal, description: 'Lunch' },
            '15:30': { type: eventTypes.exercise, description: 'Smart träning med Mårten' },
            '17:30': { type: eventTypes.lecture, description: 'Föreläsning med Mårten' },
            '19:00': { type: eventTypes.meal, description: 'Gemensam middag' },
        },
        2: {
            '8:30': { type: eventTypes.meal, description: 'Frukost' },
            '12:30': { type: eventTypes.meal, description: 'Lunch' },
            '19:00': { type: eventTypes.meal, description: 'Gemensam middag' },
        },
    },
    travelId2: {
        1: {
            '8:00': { type: eventTypes.walk, description: 'Morgonpromenad' },
        },
        2: {
            '8:30': { type: eventTypes.meal, description: 'Frukost' },
            '12:30': { type: eventTypes.meal, description: 'Lunch' },
            '19:00': { type: eventTypes.meal, description: 'Gemensam middag' },
        },
    },
}
*/
