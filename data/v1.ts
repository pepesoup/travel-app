/*
Min resa, den kan vara kvar, vi lägger in info om Hotell,
akutnummer på resmålet, etc. På kontakt så har vi retreafy-mail som det är.

https://www.apollo.se/grekland/rhodos/afandou-och-kolymbia/hotell/levante--powered-by-playitas?productCategoryCode=FlightAndHotel&catalogueItemId=165291&page=priceCalendar&departureAirportCode=ARN&duration=0&paxAges=18,18&departureDate=2023-09-10&isExternalFlight=false&arrivalAirportCode=RHO&flightPackageCode=1~v:3;onr:NVR279;inr:NVR280;dair:ARN;ddate:2023-09-10;dur:7;cls:Y;i_tp:0;aair:RHO;outdeptime:20230910T0705;outarrtime:20230910T1200;indeptime:20230917T1300;inarrtime:20230917T1600;cyc:20230910%7C20230917;fcd:ARNRHO71ARNRHO%7CARNRHO71RHOARN;id:187931625%2F403211%7C187933865%2F403212

Hotell Levante – powered by Playitas, Afandou & Kolymbia | apollo.se

*/

import { eventTypes } from '@root/src/stores/events/event.constants'
import { schemaActions } from '@root/src/services/schema/schemaActions'

/*************************** TEST ********************************/

const s1 = {
    1: {
        '8:00': { type: eventTypes.walk, description: 'Morgonpromenad' },
    },
    2: {
        '8:30': { type: eventTypes.meal, description: 'Frukost' },
    },
}

const s2 = {
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
}

export default function Main() {
    let test
    console.log('******* TEST ********')

    console.log('******* Add ********')
    test = schemaActions.day(s1, 1).eventAction('11:11').add(eventTypes.exercise, 'description')
    console.log(JSON.stringify(test, null, 4))

    console.log('******* Delete ********')
    test = schemaActions.day(test, 1).eventAction('11:11').delete()
    console.log(JSON.stringify(test, null, 4))

    console.log('******* Update ********')
    test = schemaActions.day(s1, 1).eventAction('11:11').add(eventTypes.exercise, 'description')

    console.log('******* Update - nothing ********')
    test = schemaActions.day(test, 1).eventAction('11:11').update()
    console.log(JSON.stringify(test, null, 4))

    console.log('******* Update - time ********')
    test = schemaActions.day(test, 1).eventAction('11:11').update('22:22')
    console.log(JSON.stringify(test, null, 4))

    console.log('******* Update - eventType ********')
    test = schemaActions
        .day(test, 1)
        .eventAction('22:22')
        .update(undefined, eventTypes.meal, undefined)
    console.log(JSON.stringify(test, null, 4))

    console.log('******* Update - description ********')
    test = schemaActions
        .day(test, 1)
        .eventAction('22:22')
        .update(undefined, eventTypes.meal, undefined)
    console.log(JSON.stringify(test, null, 4))
}
Main()
