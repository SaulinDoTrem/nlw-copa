# nlw-copa

## Observações / Comments
### Português
#### Problema de tradução
Bolão em inglês se chama poll na verdade e em todo o código está escrito pool(piscina), ainda devo mudar isso mais pra frente.  

#### Porta do servidor
Pra rodar o servidor web tem que comentar a parte do "host: '0.0.0.0'" e pra rodar o mobile só descomentar
### Inglês
#### Translate problem
I thought the right word to 'Bolão' in portuguese was pool, but it's not so all my it's written wrong something i'll change soon.

#### Server port
If you wanna run server on web you need to comment "host: '0.0.0.0'" but on mobile you need to uncomment
## Comandos/Commands:
Para usar todos os comandos é necessário estar na pasta do respectivo projeto que você quer rodar
## web - server - mobile                    
You need to be localized in the folder of the respective project you want to run

### Na web/On web
#### Roda o projeto/Runs project
'npm run dev'


### No servidor(back-end)/On server(back-end)
#### Roda o banco de dados/Runs database
'npm run dev'


#### Mostra o banco no navegador/Shows database on navigator
'npx prisma studio'


#### Criar um seed(adiciona alguns dado fictícios para teste)/Create a seed(add some fictitious data for testing)
'npx prisma seed'

### No mobile/On mobile

#### Roda o app/ Runs app
'npx expo start'