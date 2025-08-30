import {Text, View, StyleSheet} from "react-native";

export default function about() {
    return (
        <View style={style.container}>
            <Text style={style.text}>About</Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: "#fff",
    }
});