import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

async function getLocalImage() {
    const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
        console.log('Permission to access media library not granted.');
        throw new Error('Permission not granted');
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
        const selectedImagePath = result.assets[0].uri;

        const fileInfo = await FileSystem.getInfoAsync(selectedImagePath);

        if (fileInfo.exists) {
            return selectedImagePath;
        } else {
            console.error('Source image does not exist.');
            throw new Error('Image does not exist');
        }
    } else {
        console.log('Image selection canceled or result.uri is null.');
        throw new Error('Image selection canceled');
    }
}

export default getLocalImage;
