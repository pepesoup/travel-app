export const createDate = (dateString: any) => {
    const date: any = new Date(dateString.toString())
    if (isNaN(date)) {
        throw new Error(
            'Error: Wrong value in database:' + dateString + '. Not able to parse to date.'
        )
    }
    return date
}
