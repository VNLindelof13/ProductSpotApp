import React from 'react';
import { View, TouchableOpacity,StyleSheet, Text } from 'react-native';

const Grid = () => {
    const rows = [];
    const gridSize = 8 * 2;

    // Create 8 rows with 2 items each
    for (let i = 0; i < gridSize; i += 2) {
        rows.push(
            <View key={i} style={{ flexDirection: 'row', marginBottom: 10  }}>
                <TouchableOpacity 
                style={styles.leftColumn}
                onPress={() => console.log(i)}
                >
                    <Text>{i}</Text>
                    {/* Add your content for the first item here */}
                </TouchableOpacity>
                <TouchableOpacity 
                style={{ flex: 1, backgroundColor: 'gray' }}
                onPress={() => console.log(i)}
                >
                    <Text>{i}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return <View style={{ marginHorizontal: 10 }}>{rows}</View>;
};

export default Grid;

const styles = StyleSheet.create({
    leftColumn:{
        flex: 1, 
        marginRight: 10, 
        backgroundColor: 'pink',
    },

})