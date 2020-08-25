# Bom dia Raiana

*Por favor veja aqui (https://github.com/segodimo/tstaccenture/blob/master/README.md#bom-dia-raiana) este texto formatado no markdown.*

Eu ja consegui fazer várias coisas como uso de senha criptografada, JWT como token, trabalhei todo usando TDD com Jest

Aqui está meu projeto no github ( https://github.com/segodimo/tstaccenture ) 

Vocês podem rodar os testes usando (npm run secure-mode), e vão ver que praticamente tudo está funcionando com maioria dos problemas na prova. 

Aqui está o link do heroku ( https://tstaccenture.herokuapp.com ) e os endpoints são:

## SIGN-UP:
O endpoint do signup é https://tstaccenture.herokuapp.com/auth/signup 

## SIGN-IN :
O endpoint do signin é https://tstaccenture.herokuapp.com/auth/signin 

## BUSCAR USUÁRIO:
O endpoint para buscar o usuario é https://tstaccenture.herokuapp.com/api/users/<token_do_usuario>


Eu peço para vocês rodar o projeto e revisar os testes, assim poderão ver que está rodando praticamente todas as funcionalidades.


Aqui un screenshot do primeiro teste e uns exemplos do uso de API

![Image](https://github.com/segodimo/tstaccenture/blob/master/img_test_sing_up.png?raw=true)

##  SIGN-UP
O endpoint do signup é https://tstaccenture.herokuapp.com/auth/signup 

### Exemplo servidor:

curl -H "Content-Type: application/json" \
-X POST --data '{"nome": "aanome", "email": "aa@email.com", "senha": "123456", "telefones": {"numero": "123456789", "ddd": "12"}}' \
https://tstaccenture.herokuapp.com/auth/signup 

### Exemplo localhost:

curl -H "Content-Type: application/json" \
-X POST --data '{"nome": "aanome", "email": "aa@email.com", "senha": "123456", "telefones": {"numero": "123456789", "ddd": "12"}}' \
http://localhost:3001/auth/signup 

##  Exemplo RESPOSTA
{"_id":"5f449b87a8b70c79148f7510","nome":"aanome","data_criacao":"2020-08-25T05:03:03.599Z","data_atualizacao":"2020-08-25T05:03:03.599Z","ultimo_login":"2020-08-25T05:03:03.599Z","email":"aa@email.com","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJub21lIjoiYWFub21lIiwiZW1haWwiOiJhYUBlbWFpbC5jb20iLCJzZW5oYSI6IjEyMzQ1NiJ9.bXK07h72wpOl2uC_7Seec8Z2pUHMpHRjtjFI4vp1rgM"}




##  SIGN-IN 
O endpoint do signin é https://tstaccenture.herokuapp.com/auth/signin 

### Exemplo servidor:

curl -H "Content-Type: application/json" -X POST --data '{"email": "aa@email.com", "senha": "123456" }' \
https://tstaccenture.herokuapp.com/auth/signin 

### Exemplo localhost:

curl -H "Content-Type: application/json" -X POST --data '{"email": "aa@email.com", "senha": "123456" }' \
http://localhost:3001/auth/signin 



## BUSCAR USUÁRIO
O endpoint para buscar o usuario é https://tstaccenture.herokuapp.com/api/users/<token_do_usuario>

### Exemplo servidor:

curl -H "Authorization: bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJub21lIjoiYWFub21lIiwiZW1haWwiOiJhYUBlbWFpbC5jb20iLCJzZW5oYSI6IjEyMzQ1NiJ9.bXK07h72wpOl2uC_7Seec8Z2pUHMpHRjtjFI4vp1rgM" \
https://tstaccenture.herokuapp.com/api/users/5f44e935d8a76a00044f094d

### Exemplo localhost:

curl -H "Authorization: bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJub21lIjoiYWFub21lIiwiZW1haWwiOiJhYUBlbWFpbC5jb20iLCJzZW5oYSI6IjEyMzQ1NiJ9.bXK07h72wpOl2uC_7Seec8Z2pUHMpHRjtjFI4vp1rgM" \
http://localhost:3001/api/users/5f44e7987907ef943cdac8c9


Novamente muito obrigado pela oportunidade, porque realmente foi muito interessante ter feito esse teste para poder praticar e continuar aprendendo. 

Atte: Sebastian
