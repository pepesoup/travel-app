import { Schema, Travel, EventType, Event, TravelFromDb } from './types'
import { eventTypes } from '../../constants/event.constants'
import { noteTypes } from '@root/src/constants/note.constants'

/******************** Travels *********************/

export const travels: { [travelId: string]: Travel } = {
    travelId1: {
        info: {
            //startDate: '2023-10-1',
            startDate: new Date('2023-10-1'),
            //endDate: '2023-10-7',
            endDate: new Date('2023-10-7'),
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
        },
        schema: {
            day_0: {
                info: { day: 0 },
                events: {
                    guid1: {
                        uuid: 'guid1',
                        day: 0,
                        time: '19:00',
                        type: eventTypes.meal,
                        description: 'Gemensam middag',
                    },
                },
            },
            day_1: {
                info: { day: 1 },
                events: {
                    guid2: {
                        uuid: 'guid2',
                        day: 1,
                        time: '08:00',
                        type: eventTypes.walk,
                        description: 'Morgonpromenad',
                    },
                },
            },
            day_2: {
                info: { day: 2 },
                events: {
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
            },
            day_3: { info: { day: 3 }, events: {} },
            day_4: { info: { day: 4 }, events: {} },
            day_5: { info: { day: 5 }, events: {} },
            day_6: { info: { day: 6 }, events: {} },
        },
        notes: {
            '1695239895': {
                uuid: '1695239895',
                subject: 'Nytt inlägg i bloggen',
                message: 'Liten beskrivning vad det handlar om',
                timestamp: 1695239895,
                type: noteTypes.schema,
                subIcon: eventTypes.walk.icon,
            },
            '1695299896': {
                uuid: '1695299896',
                subject: 'Nytt uppdatering i schemat',
                message: 'Liten beskrivning vad det handlar om',
                timestamp: 1695299896,
                type: noteTypes.travel,
                subIcon: { name: 'information', type: 'MaterialCommunityIcons' },
            },
            '1695739895': {
                uuid: '1695739895',
                subject: 'Nytt inlägg i info',
                message: 'Liten beskrivning vad det handlar om',
                timestamp: 1695739895,
                type: noteTypes.schema,
                subIcon: eventTypes.exercise.icon,
            },
            '1695299895': {
                uuid: '1695299895',
                subject: 'Träningspass inställt',
                message: 'Liten beskrivning vad det handlar om',
                timestamp: 1695299895,
                type: noteTypes.schema,
                subIcon: eventTypes.meal.icon,
            },
        },
    },
}
