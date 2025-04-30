import { Button } from 'react-native';

export default function HomeButton ({ navigation }) {
    return (
        <Button 
            title='Home'
            onPress={() => navigation.navigate('Home')}
            >          
        </Button>
    )
}