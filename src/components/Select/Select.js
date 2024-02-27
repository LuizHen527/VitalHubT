import RNPickerSelect from 'react-native-picker-select';
import { SelectComponent } from './Style';

export const Select = () => {
    return(
        <SelectComponent
            onValueChange={(value) => console.log(value)}
            items={[
                { label: '7h00', value: '7h00' },
                { label: '10h00', value: '10h00' },
                { label: '15h00', value: '15h00' },
            ]}

            
        />
    )
}