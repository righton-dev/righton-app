import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, Platform, StatusBar } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors, fonts, fontFamilies } from '../../../../utils/theme'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'

const NavBarView = (props, navigation) => {
    const { title, avatar } = props

    return (
        <View>
            <LinearGradient
                colors={['#003668', '#0B5EA2']}
                style={styles.container}
            >
                <View style={styles.navBarContainer}>
                    <TouchableOpacity onPress={() => console.log('tapped avatar')}>
                        <View style={styles.avatar}>
                            <Image source={avatar} resizeMode='contain' />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.title}>{title}</Text>
                    <TouchableOpacity style={styles.drawer} onPress={() => console.log('tapped drawer')}>
                        <Image source={require('../../../../assets/images/menu.png')} style={styles.drawer} resizeMode='contain' />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    )
}

NavBarView.propTypes = {
    title: PropTypes.string.isRequired,
    avatar: PropTypes.number.isRequired,
}

export default NavBarView

const styles = StyleSheet.create({
    container: {
        height: 75,
    },
    navBarContainer: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        paddingEnd: 13,
        paddingStart: 27,
    },
    avatar: {
        width: 32,
        justifyContent: 'flex-start',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
            },
            android: {
                elevation: 5,
            },
        })
    },
    title: {
        fontFamily: fontFamilies.poppinsBold,
        fontSize: fonts.large,
        color: 'white',
        textAlign: 'center',
        flex: 8
    },
    drawer: {
        width: 32,
        justifyContent: 'flex-end',
    }
})
