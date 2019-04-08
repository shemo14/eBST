import { Dimensions } from "react-native";

const height = Dimensions.get('window').height;
const styles = ({

    // Language Screen Styles
    imageBackgroundStyle: {
        width: null,
        height: null,
        flex: 1,
        alignItems: 'center',
    },
    logoStyle: {
        width: 130,
        height: 130,
        marginTop: (height*11)/100
    },
    langContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: (height*15)/100,
        alignItems: 'center'
    },
    langStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },

    // Login Screen Styles
    loginFormContainerStyle: {
        width: '100%',
        height: (height*60)/100,
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center'
    },

    // Register Screen Styles
    registerFormContainerStyle: {
        width: '100%',
        height: (height*70)/100,
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center'
    }
});

export default styles;