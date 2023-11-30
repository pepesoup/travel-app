import { useNavigation, useRoute } from '@react-navigation/native';
import {
    useSendbirdChat,
    createGroupChannelListFragment,
    createGroupChannelCreateFragment,
    createGroupChannelFragment,
} from '@sendbird/uikit-react-native';
import { useGroupChannel } from '@sendbird/uikit-chat-hooks';
import { ScreenCmn, TextCmn } from '@rn-components/commonUi'
import { Stack, router, useRouter } from 'expo-router'

const GroupChannelListFragment = createGroupChannelListFragment();
const GroupChannelCreateFragment = createGroupChannelCreateFragment();
const GroupChannelFragment = createGroupChannelFragment();

const GroupChannelCreateScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <GroupChannelCreateFragment
            onCreateChannel={async (channel) => {
                // Navigate to GroupChannel function.
               navigation.replace('GroupChannel', { channelUrl: channel.url });
            }}
            onPressHeaderLeft={() => {
                // Go back to the previous screen.
                // navigation.goBack();
                router.back()
            }}
        />
    );
};

export default GroupChannelCreateScreen
