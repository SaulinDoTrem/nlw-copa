import { VStack, Icon, useToast, FlatList, useTheme } from "native-base";
import { useCallback, useState } from 'react';
import { Octicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { api } from "../services/api";
import { Loading } from "../components/Loading";
import { PoolCard, PoolCardProps } from "../components/PoolCard";
import { EmptyPoolList } from "../components/EmptyPoolList";

export function Pools(){
    const { navigate } = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [pools, setPools] = useState<PoolCardProps[]>([]);

    const { sizes } = useTheme();

    const size = sizes[22];

    const toast = useToast();

    async function fetchPools(){
        try {
            setIsLoading(true);
            const poolResponse = await api.get('/pools');
            setPools(poolResponse.data.pools);

        } catch(e) {
            console.log(e);

            toast.show({
                title: 'Não foi possível carregar os bolões.',
                placement: 'top',
                bgColor: 'red.500'
            });
        } finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        fetchPools();
    }, []));

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title='Meus bolões' />

            <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor='gray.600' pb={4} mb={4}>
                <Button 
                    title='BUSCAR BOLÃO POR CÓDIGO'
                    leftIcon={<Icon as={Octicons} name='search' color='black' size='md'/>}
                    onPress={() => navigate('find')}
                />
            </VStack>

            {
                isLoading 
                 ? <Loading  /> 
                  : <FlatList
                    data={pools}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => 
                        <PoolCard 
                            data={item}
                            onPress={() => navigate('details', { id: item.id })}
                        />
                    }
                    px={5}
                    mb={size}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ pb: 10}}
                    ListEmptyComponent={() => <EmptyPoolList />}
                  />
            }
        </VStack>
    );
} 