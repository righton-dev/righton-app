import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { fontFamilies, fonts } from '../../../../utils/theme'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ContentItem = (props) => {

    const [backgroundColor, setBackgroundColor] = React.useState("white")
    const style = { ...styles.container, ...props.style }

    const handlePress = () => {
        const { onPress } = props
        onPress && onPress()
    }

    return (
        <View style={[style, { backgroundColor }]}>
            <TouchableOpacity
                onPress={handlePress}
                onPressIn={() => setBackgroundColor('#ffffff0f')}
                onPressOut={() => setBackgroundColor('white')}
            >
                <Text style={styles.category}>{props.category}</Text>
                <Text style={styles.header}>{props.title}</Text>
                <Text style={styles.body}>{props.body}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ContentItem

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingStart: 18,
        paddingEnd: 18,
        borderRadius: 18,
    },
    category: {
        fontFamily: fontFamilies.poppinsRegular,
        fontSize: fonts.tiny,
        color: '#9BA9D0',
    },
    header: {
        color: '#384466',
        fontFamily: fontFamilies.poppinsBold,
        fontSize: fonts.small
    },
    body: {
        color: '#717D9F',
        fontSize: fonts.xSmall,
        fontFamily: fontFamilies.poppinsRegular,
        lineHeight: 18
    },
})
