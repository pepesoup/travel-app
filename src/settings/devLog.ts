export enum origin {
    // ----------- API --------------
    firebaseDbApi = 'firebaseDbApi',
    // --------- services -----------
    authService = 'authService',
    // -------- state -----------
    navigationState = 'navigationState',
    companyState = 'companyState',
    moodState = 'moodState',
    challengeState = 'challengeState',
    authState = 'authState',
    userState = 'userState',
    // -------- navigation -----------
    router = 'router',
    appStack = 'appStack',
    authStack = 'authStack',
    // -------- screens --------------
    loadGlobalDataScreen = 'loadGlobalDataScreen',
}

const logSettings = new Map<string, boolean>()
    // ----------- API --------------
    .set(origin.firebaseDbApi, false)

    // --------- services -----------
    .set(origin.authService, true)

    // -------- state -----------
    .set(origin.navigationState, true)
    .set(origin.companyState, false)
    .set(origin.moodState, false)
    .set(origin.challengeState, false)
    .set(origin.authState, false)
    .set(origin.userState, false)

    // -------- navigation -----------
    .set(origin.router, false)
    .set(origin.appStack, false)
    .set(origin.authStack, false)

    // -------- screens --------------
    .set(origin.loadGlobalDataScreen, false)

const logWrapper = (origin: string, department: string, filler: string) => {
    const length = 80
    const text = ` ${origin}${department.length > 0 ? ' - ' : ''}${department} `
    const fillersEachSide = ''.padEnd((length - text.length) / 2, filler)
    return fillersEachSide + text + fillersEachSide
}

export class Log {
    doLog: boolean
    origin: string
    constructor(origin: origin) {
        this.doLog = logSettings.get(origin) || false
        this.origin = origin
    }

    start(department = '') {
        this.doLog && console.log(' ')
        this.doLog && console.log(logWrapper(this.origin, department, '>'))
    }
    end(department = '') {
        this.doLog && console.log(logWrapper(this.origin, department, '<'))
        this.doLog && console.log(' ')
    }
    variable(name: string, data?: any) {
        const d = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
        const n = name.padEnd(30 - name.length, '.') + ': ' + d
        this.doLog && console.log('', n)
    }
    info(text: string, data?: any) {
        const d = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
        const n = ''.padEnd(30, '+') + ' (' + this.origin + '): ' + text
        this.doLog && console.log('', n, d)
    }
}
