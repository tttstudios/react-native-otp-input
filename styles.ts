import { StyleSheet, TextStyle } from 'react-native';

interface Styles {
    defaultTextFieldStyle: TextStyle;
}

const styles = StyleSheet.create<Styles>({
    defaultTextFieldStyle : {
        width : 45, 
        height : 45, 
        borderColor : 'rgba(226, 226, 226, 1)', 
        borderWidth : 1,
        borderRadius : 2, 
        textAlign : 'center',
        color: 'rgba(226, 226, 226, 1)', 
    },
});

export default styles;