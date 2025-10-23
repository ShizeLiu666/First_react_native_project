import { View, Text, TextInput} from 'react-native'
import { CustomInputProps } from '@/type'
import { useState } from 'react'
import cn from 'clsx'


const CustomInput = ({
    placeholder = 'Enter text', 
    value,
    onChangeText,
    label,
    secureTextEntry = false,
    keyboardType = 'default',
}:CustomInputProps) => {
    const[isFocused, setIsFocused] = useState(false);
    
    return (
        <View className='w-full mb-6'>
            <Text className='label'>{label}</Text>
            <TextInput 
                className={cn('input', isFocused ? 'border-primary' : 'border-gray-300')} 
                placeholder={placeholder} 
                placeholderTextColor='#888'
                value={value} 
                onChangeText={onChangeText} 
                secureTextEntry={secureTextEntry} 
                keyboardType={keyboardType} 
                autoCapitalize='none' 
                autoCorrect={false} 
                autoComplete='off' autoFocus={false} 
                onFocus={()=> setIsFocused(true)}
                onBlur={()=> setIsFocused(false)}/>
        </View>
    )
}

export default CustomInput