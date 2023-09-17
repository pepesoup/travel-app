import { useSchemaUiStoreBase } from '../schemaUiStore'
import { EditDay } from './editDay'

export const EditModal = () => {
    const uiStore = useSchemaUiStoreBase()
    console.log('isAdminMode', uiStore.isAdminMode)
    console.log('selectedDay', uiStore.selectedDay)
    console.log('selectedTime', uiStore.selectedTime)

    if (!uiStore.isAdminMode) {
        return null
    }
    if (uiStore.selectedDay !== null && uiStore.selectedTime !== null) {
        return <EditDay />
    }
    if (uiStore.selectedDay !== null) {
        return null
    }
}
