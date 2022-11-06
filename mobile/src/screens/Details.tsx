import { VStack, useToast, HStack, useTheme } from "native-base";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Header } from "../components/Header";
import { Share } from "react-native";
import { useFocusEffect, useRoute, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { api } from "../services/api";
import { Loading } from "../components/Loading";
import { PoolCardProps } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { Option } from "../components/Option";
import { Guesses } from "../components/Guesses";

interface RouteParams{
    id: string;
}

export function Details(){

    const{ navigate } = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [option, setOption] = useState(true);
    const [poolDetails, setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps);

    const { sizes } = useTheme();

    const size = sizes[22];
    
    const route = useRoute();
    const toast = useToast();
    const { id } = route.params as RouteParams;

    async function fetchPool(){
        try {
            setIsLoading(true);
            const poolResponse = await api.get(`pools/${id}`);
            setPoolDetails(poolResponse.data.pool);
        } catch(e) {
            console.log(e);

            toast.show({
                title: 'Não foi possível carregar os detalhes do bolão.',
                placement: 'top',
                bgColor: 'red.500'
            });
        } finally {
            setIsLoading(false);
        }
    }

    async function handleCodeShare(){
        await Share.share({
            message: poolDetails.code
        });
    }

    useFocusEffect(useCallback(() => {
        fetchPool();
    }, [id]));
    
    if(isLoading)
        return <Loading />

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header onShare={handleCodeShare} title={poolDetails.title} showBackButton showShareButton/>

                <VStack px={5} flex={1} mb={size}>
                    <PoolHeader data={poolDetails} />

                    <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                        <Option onPress={() => setOption(!option)} title="Seus palpites" isSelected={option} />
                        <Option onPress={() => setOption(!option)} title="Ranking do grupo" isSelected={!option} />
                    </HStack>
                    {
                        poolDetails._count?.participants > 0 ?
                            <Guesses poolId={poolDetails.id} />
                            : <EmptyMyPoolList code={poolDetails.code}/>
                    }
                </VStack>

        </VStack> 

        
    );
}