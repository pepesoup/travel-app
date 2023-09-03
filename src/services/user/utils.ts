import { User } from 'firebase/auth'

export const getCompanyFromAuthUserEmail = (authUser: User) => {
    console.log('------ utils/getCompanyFromAuthUserEmail', authUser.email)
    const domain = authUser.email?.split('@')[1].replaceAll('.', '-')
    const company = domain ? domain : 'NA'
    return company
}
