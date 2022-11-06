import { Heading, VStack } from "native-base";
import { api } from "../services/api";
import { Button } from "../components/Button";
import { Header } from '../components/Header';
import { Input } from "../components/Input";
import { useToast} from "native-base";
import { useState } from 'react';
import { Loading } from "../components/Loading";
import { useNavigation } from "@react-navigation/native";

export function Find(){
    const { navigate } = useNavigation();
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();

    async function handleJoinPool(){
        try {
            setIsLoading(true);

            if(!code.trim())
                return toast.show({
                    title: 'Informe o código do bolão.',
                    placement: 'top',
                    bgColor: 'red.500',
                });

            await api.post('/pools/join', { code });

            toast.show({
                title: 'Você entrou no bolão!',
                placement: 'top',
                bgColor: 'green.500',
            });

            setCode('');
            navigate('pools');

        } catch(e) {
            console.log(e);
            setIsLoading(false);
            if(e.response?.data?.message === 'Poll not found.')
                return toast.show({
                    title: 'Bolão não encontrado!',
                    placement: 'top',
                    bgColor: 'red.500'
                });
            
            if(e.response?.data?.message === 'You already joined this poll.')
                return toast.show({
                    title: 'Você já entrou nesse bolão!',
                    placement: 'top',
                    bgColor: 'red.500'
                });

            return toast.show({
                title: 'Não foi possível encontrar o bolão.',
                placement: 'top',
                bgColor: 'red.500'
            });
        }
    }

    return(
        <VStack flex={1} bgColor="gray.900">
            <Header title='Buscar por código' showBackButton/>

            <VStack mt={8} mx={5} alignItems='center'>
                <Heading fontFamily='heading' color='white' fontSize='xl' mb={8} textAlign='center'>
                    Encontre um bolão através de {'\n'} 
                    seu código único
                </Heading>

                <Input 
                    mb={2}
                    placeholder='Qual o código do bolão?'
                    value={code}
                    onChangeText={setCode}
                />

                <Button 
                    title='BUSCAR BOLÃO'
                    isLoading={isLoading}
                    onPress={handleJoinPool}
                />
            </VStack>

            {
                isLoading
                 ? <Loading />
                  : null    
            }
        </VStack>
    );
}