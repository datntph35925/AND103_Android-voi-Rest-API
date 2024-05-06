import { Alert, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { OptionsCommon, ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker'
import { ImagePickerResponse } from 'react-native-image-picker'

const L42 = () => {
    const [images, setImages] = useState(null);
    const commonOptions: OptionsCommon = {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
    };

    const libraryOptions: ImageLibraryOptions = {
        selectionLimit: 10,
        ...commonOptions,
    };

    const onOpenLibrary = async () => {
        const response: ImagePickerResponse = await launchImageLibrary(libraryOptions);
        if (response?.assets) {
            setImages(response.assets);
        } else {
            Alert.alert('Có lỗi xảy ra', response.errorMessage || 'Không có ảnh được chọn');
        }
    }

    return (
        <View style={styles.container}>
            {images && images.map((image, index) => (
                <Image key={index} source={{ uri: image.uri }} style={styles.image} />
            ))}
            <TouchableOpacity style={styles.button} onPress={onOpenLibrary}>
                <Text style={styles.buttonText}>Chọn ảnh từ thư viện</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        marginTop: 30,
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default L42;
