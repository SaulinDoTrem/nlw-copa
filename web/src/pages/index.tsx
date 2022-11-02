import appPreviewImg from '../assets/app-nlw-copa-preview.png';
import Image from 'next/image';
import logoImg from '../assets/logo.svg';
import usersAvatarExampleImg from '../assets/users-avatar-example.png';
import iconCheck from '../assets/icon-check.svg';
import { api } from '../lib/axios';
import { FormEvent, useState } from 'react';

interface HomeProps {
  poolCount: number;
  userCount: number;
  guessCount: number;
}

export default function Home(props: HomeProps) {

  const [poolTitle, setPoolTitle] = useState('');

  async function createPool(event: FormEvent) {
    event.preventDefault();

    try{
      const response = await api.post('pools', {
        title: poolTitle
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);

      setPoolTitle('');

      alert('Bolão foi criado com sucesso, o código foi copiado para sua área de transferência!'); //XLNNXZ
    }
    catch(e){
      console.log(e);
      alert('Falha ao criar o bolão, tente novamente!');
    }

  }

  return (
    <main className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28'>
      <section>
        <figure className='mb-14'>
          <Image
            src={logoImg}
            alt="Logo Nlw Copa"
            quality={100}
          />
        </figure>

          <div className='mb-10'>
            <h1 className='text-white font-bold text-5xl leading-tight mb-10'>
              Crie seu próprio bolão da copa e compartilhe entre amigos!
            </h1>

            <figure className='flex gap-2 items-center'>
              <Image
                src={usersAvatarExampleImg}
                alt="Soma examples of user's avatars"
                quality={100}
              />

              <figcaption>
                <strong className='text-gray-100 font-bold text-xl'>
                  <span className='text-ignite-500'>+{props.userCount}</span> pessoas já estão usando
                </strong>
              </figcaption>
            </figure>
          </div>

          <form onSubmit={createPool} className='flex gap-2 mb-4'>
            <input 
              className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100' 
              type="text" 
              required 
              placeholder="Qual nome do seu bolão?"
              onChange={event => setPoolTitle(event.target.value)}
              value={poolTitle}
            />

            <button 
              className='bg-yellow-500 rounded px-6 uppercase text-gray-950 font-bold text-base hover:bg-yellow-700 transition' 
              type='submit'
            >
              criar meu bolão
            </button>
          </form>

          <p className='text-gray-500 mb-10 leading-relaxed'>
            Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
          </p>

          <div className='flex justify-between pt-10 border-t border-gray-600'>
            <figure className='flex gap-x-6'>
              <Image
                src={iconCheck}
                alt="Check Icon"
                quality={100}
                className="m-0"
              />

              <figcaption>
                <h2 className="text-white font-bold text-2xl">
                  +{props.poolCount}
                </h2>

                <p className='text-zinc-200 text-base'>
                  Bolões criados 
                </p>
              </figcaption>
            </figure>

            <div className='w-px h-14 bg-gray-600'></div>

            <figure className='flex gap-x-6'>
              <Image
                src={iconCheck}
                alt="Check Icon"
                quality={100}
                className="m-0"
              />

              <figcaption>
                <h2 className="text-white font-bold text-2xl">
                  +{props.guessCount}
                </h2>

                <p className='text-zinc-200 text-base'>
                  Palpites enviados
                </p>
              </figcaption>
            </figure>
          </div>
      </section>


      <figure>
        <Image
          src={appPreviewImg}
          alt="Two cellphones with the preview image from the mobile app"
          quality={100}
        />
      </figure>
    </main>
  );
}

export const getServerSideProps = async () => {
  const [
    poolCountResponse, 
    userCountResponse, 
    guessCountResponse
  ] = await Promise.all([
    api.get('pools/count'),
    api.get('users/count'),
    api.get('guesses/count')
  ]);

  console.log(poolCountResponse);

  return {
    props: {
       poolCount: poolCountResponse.data.count,
       userCount: userCountResponse.data.count,
       guessCount: guessCountResponse.data.count
    }
  };
};