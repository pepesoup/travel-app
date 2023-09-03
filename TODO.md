## ************* LOGOUT *************
- Remove listeners from firebase DB, they will not longer have permission to read data
    and error/warning will be launched
    

## ************* Challenge screen **************
- knappen "join challenge" visar inte lottie animationen, men väntar 3 sekunder.
    Fick lottie att funka tidigare med en ny "component".
    Nu när koden blev kopierad som den var från gamla appen anropas nog <Overlay> ??
    istället för att visa lottie animationer. Byt anrop till nya komponenten för lottie.
    --- FIXED ---

- bottom sheet går inte att få upp, <ChallengeForm>
    --- TODO ---    Adding a visible handle, needs to code and surrender bottom sheet 
                    with a <GestureHandlerRootView>. Otherwise the video pages 
                    cannot be slided up/down, gestgure is lost for them

- "i" knappen till höger svarar inte på klick och visar bottom-sheet
    --- FIXED ---

- fixa till utseendet av titeln på video-pages
    --- FIXED ---


## ************* Mood screen *************
- animationen startar inte automatiskt på fysiska iPhone - 
    på emulatorn funkar det. 
    --- FIXED --- Seems to work mostly :-) 

- Just den här animationen gör att Android krashar när den körs.
    en del andra lottie filer funkar dock att köra på Android.
    Så, får hitta en sådan kanske att byta ut till.
    --- FIXED --- Blocking the playing on Android for now...

## ************* Profile screen *************
- fixa varningen från text-input att en del värden är boolean, istället för string
    --- FIXED --- built new one from scratch

## ************* Login screen *************
- Dirigerar inte längre till "app-stack" när man har loggat in, 
    så man fastnar där (tills man startar om appen).
    --- FIXED ---

## ************* Score screen *************
- kopiera över från gamla appen
    --- FIXED ---
- Run backend to produce scores properly
    
