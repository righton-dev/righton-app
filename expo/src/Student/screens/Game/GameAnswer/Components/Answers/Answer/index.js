import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { fontFamilies, fonts } from '../../../../../../../utils/theme'

const Answer = ({ answer, isSelected }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.answer}>{answer}</Text>
            <Image
                source={require('../../../img/Team1Pick.png')}
                resizeMethod='resize'
                resizeMode='contain'
                style={{ opacity: (isSelected || false) ? 1 : 0 }}
            />
        </View>
    )
}

export default Answer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderColor: '#E4E4E6',
        borderRadius: 12,
        borderWidth: 1,
    },
    answer: {
        fontSize: fonts.xMedium,
        fontFamily: fontFamilies.karlaRegular,
        fontWeight: 'bold',
        color: '#384466',
        flex: 1,
        paddingLeft: 9,
        height: 47,
        textAlignVertical: 'center'
    }
})
