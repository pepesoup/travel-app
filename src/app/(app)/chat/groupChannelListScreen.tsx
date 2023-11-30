import { useNavigation, useRoute } from '@react-navigation/native';
import {
    useSendbirdChat,
    createGroupChannelListFragment,
    createGroupChannelCreateFragment,
    createGroupChannelFragment,
} from '@sendbird/uikit-react-native';
import { useGroupChannel } from '@sendbird/uikit-chat-hooks';
import { View, Text } from 'react-native';

const GroupChannelListFragment = createGroupChannelListFragment();
const GroupChannelCreateFragment = createGroupChannelCreateFragment();
const GroupChannelFragment = createGroupChannelFragment();

const GroupChannelListScreen = () => {
    const navigation = useNavigation<any>();
    return (
        <GroupChannelListFragment
            onPressCreateChannel={(channelType) => {
                // Navigate to GroupChannelCreate function.
                // navigation.navigate('GroupChannelCreate', { channelType });
            }}
            onPressChannel={(channel) => {
                // Navigate to GroupChannel function.
                navigation.navigate('GroupChannel', { channelUrl: channel.url });
            }}
        />
    );
};

export default GroupChannelListScreen

//add