import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import Answer from './Answer'

const Answers = ({ selectedAnswer }) => {
    const [answers, setAnswers] = useState([8, 540, 360, 1080])
    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={answers}
                numColumns={2}
                keyExtractor={item => `${item}`}
                renderItem={({ item }) =>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            margin: 10
                        }}>
                        <Answer answer={item} isSelected={selectedAnswer == item} />
                    </View>
                }
            />
        </View>
    )
}

export default Answers

const styles = StyleSheet.create({
    mainContainer: {
        padding: 12
    }
})
