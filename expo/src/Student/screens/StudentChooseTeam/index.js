import React from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    ScrollView
} from 'react-native'
import { colors, fonts } from '../../../utils/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import PurpleBackground from '../../../components/PurpleBackground'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'

const index = ({ navigation }) => {

    var [overlayVisible, setOverlayVisibility] = React.useState(false)
    var [currentOverlayImage, setCurrentOverlayImage] = React.useState()

    const tappedTeam = (image, selectedTeam) => {
        setOverlayVisibility(true)
        setCurrentOverlayImage(image)
        setTimeout(() => {
            setOverlayVisibility(false)
            navigation.navigate('StudentGameIntro', {
                selectedTeam,
            })
        }, 2000)
    }

    return (
        <SafeAreaView style={styles.container}>
            <PurpleBackground>
                <ScrollView style={styles.mainContainer}>
                    <Text style={styles.titleText}>Pick a Team</Text>
                    <View style={styles.teamContainer}>
                        <TouchableOpacity onPress={() => tappedTeam(require('./img/Team1Picked.png'), 1)}>
                            <Image source={require('./img/Team1Small.png')} style={styles.teamImage} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => tappedTeam(require('./img/Team2Picked.png'), 2)}>
                            <Image source={require('./img/Team2Small.png')} style={styles.teamImage} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => tappedTeam(require('./img/Team3Picked.png'), 3)}>
                            <Image source={require('./img/Team3Small.png')} style={styles.teamImage} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => tappedTeam(require('./img/Team4Picked.png'), 4)}>
                            <Image source={require('./img/Team4Small.png')} style={styles.teamImage} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => tappedTeam(require('./img/Team5Picked.png'), 5)}>
                            <Image source={require('./img/Team5Small.png')} style={styles.teamImage} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Modal
                    isVisible={overlayVisible}
                    animationOut='slideOutUp'
                    onBackdropPress={() => setOverlayVisibility(false)}
                >
                    <SafeAreaView style={styles.overlayView}>
                        <Image source={currentOverlayImage} style={styles.overlayImage} />
                    </SafeAreaView>
                </Modal>
            </PurpleBackground>
        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundPurple,
        flex: 1
    },
    mainContainer: {
        zIndex: 100
    },
    titleText: {
        color: colors.white,
        fontSize: fonts.large,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 18
    },
    teamContainer: {
        paddingTop: 20
    },
    teamImage: {
        resizeMode: 'contain',
        width: Dimensions.get('window').width
    },
    overlayView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    overlayImage: {
        resizeMode: 'contain'
    },
})
