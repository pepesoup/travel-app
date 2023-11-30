import { useNavigation, useRoute } from '@react-navigation/native';
import {
    useSendbirdChat,
    createGroupChannelListFragment,
    createGroupChannelCreateFragment,
    createGroupChannelFragment,
} from '@sendbird/uikit-react-native';
import { useGroupChannel } from '@sendbird/uikit-chat-hooks';
import { useLocalSearchParams, router } from 'expo-router';
import { SurfaceCmn } from '@root/src/rn-components/src/components/commonUi';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from 'react-native-paper'

const GroupChannelListFragment = createGroupChannelListFragment();
const GroupChannelCreateFragment = createGroupChannelCreateFragment();
const GroupChannelFragment = createGroupChannelFragment();

const GroupChannelScreen = () => {
    const navigation = useNavigation<any>();
    const { params } = useRoute<any>();
    const theme = useTheme()

    const { sdk } = useSendbirdChat();
    const { channel } = useGroupChannel(sdk, params.channelUrl);
    if (!channel) return null;

    return ( 
        <GroupChannelFragment
            channel={channel}
            onChannelDeleted={() => {
                // Navigate to GroupChannelList function.
                // navigation.navigate('GroupChannelList');
                router.push('/chat/groupChannelListScreen')
            }}
            onPressHeaderLeft={() => {
                // Go back to the previous screen.
                // navigation.goBack();
                router.back()
            }}
            onPressHeaderRight={() => {
                // Navigate to GroupChannelSettings function.
                // navigation.navigate('GroupChannelSettings', { channelUrl: params.channelUrl });
            }}
        />
    );
};

export default GroupChannelScreen
