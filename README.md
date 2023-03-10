## Login - Authentication

TDD (Test Driven Development)

Happy Path

### Use Cases

  [x] 1. Email exists and password match
  [x] 2. With a token 
  [x] 3. Token with a valid secret key
  [x] 4. With a valid token (user exists on payload)
  [x] 5. Existing user accessing others endpoints with fake token


Unhappy Path
  
  ### Use Cases
  
  [x]  1. No email and/or password
  [x]  2. No email but with password
  [x]  3. With email but with no password
  [x]  4. With email and password, but email does not exists
  [x]  5. With a valid email, but password does not match
  [x]  6. With no token
  [x]  7. With a token expired
  [x]  8. Token with a invalid secret key
  [x]  9. With an invalid token (user does not exist on payload)
  [x]  10. No existing user accessing others endpoints with fake token
  

## Deployment (fly.io)

### MONGODB

1. Adicionar o IP global no mongoDB Atlas
   1. Após se logar no no site mongodb.com
   2. Com o Cluster aberto, clique no lado esquerdo em "Network Access"
   3. Com o "Network Access" aberto, clique no botão + ADD IP ADDRESS
   4. No campo "Access List Entry", adicione o IP: 0.0.0.0/0
   5. Não precisa de comentário no campo "Comments"
   6. Clique no botão "Confirm"

### ALTERAÇÕES LOCAIS
  
  Importate: Não esquecer de estar na branch master ou main


   1. Alterar o arquivo package.json
      1. Clonar o script start para dev, como abaixo
         1. "dev": "nodemon src/server.js"
      2. Alterar o script start removendo nodemon e adicionando node, como abaixo
         1. "start": "node src/server.js",
   2. Se ainda não tiver criado, com base no arquivo .env.sample, criar um arquivo .env com as seguintes variáves
      1. MONGODB_URL = "mongodb+srv://<username>:<password>@cluster0.phugsom.mongodb.net/<dbName>?retryWrites=true&w=majority"
      2. SECRET_KEY = "imagineSchool"
      3. PORT=8080
      ### IMPORTANTE: Não esquecer de colocar o username, password e dbName na variável MONGODB_URL de acordo com o seu DB
   3. Alterar o arquivo server.js
      1. Onde é declarada a const port, mudar a linha conforme abaixo
         1. const port = process.env.PORT || 8080
   
### FLY.IO - LOGIN/INSTALAÇÃO

  REFERÊNCIA: https://fly.io/docs/hands-on/install-flyctl/

  1. Logar-se no github
  2. Logar-se no site fly.io utilizando a autenticação social do github
  3. Instalar localmente
  4. No seu terminal, seguindo as instruções conforme link de referência
     

 

### FLY.IO - LAUNCH/DEPLOYMENT

  REFERÊNCIA: 
https://fly.io/docs/languages-and-frameworks/node/#launch-the-app-on-fly
  Utilizando como referência o documento acima, a partir do passo "Launch the App on Fly", executar os passos abaixo

  1. Mantenha-se na branch master ou main
  2. Execute o comando: flyctl launch
     1. Ele detectará o NodeJs
     2. Em "Choose an app name", adicione o nome da aplicação
        1. Sugestão: imagineshop ou imagineshop-api
     3. Em "Choose a region for deployment", escolha
        1. Rio de Janeiro OU
        2. São Paulo
     4. Em "Would you like to set up a Postgresql database now?", escolha N
     5. Em "Would you like to set up an Upstash Redis database now?", escolha N
     6. Tudo dando certo, é para mostrar uma mensagem parecida como a abaixo

     
      "Your Node app is prepared for deployment.  Be sure to set your listen port
      to 8080 using code similar to the following:

        const port = process.env.PORT || "8080";

      If you need custom packages installed, or have problems with your deployment
      build, you may need to edit the Dockerfile for app-specific changes. If you
      need help, please post on https://community.fly.io.

      Now: run 'fly deploy' to deploy your Node app."
  3. Execute o comando flyctl deploy ou fly deploy para realizar o deployment da aplicação.
     1. Aguarde alguns minutos.
     2. Caso tudo dê certo, algo como abaixo deve ser mostrado na tela
   
        1 desired, 1 placed, 1 healthy, 0 unhealthy [health checks: 1 total, 1 passing]
        --> v0 deployed successfully

  4. Após finalizar o passo anterior, verifique o status com o comando flyctl status
     1. O status esperado é "running"
  5. Para executar a API e saber qual a URL da mesma, execute o comando flyctl open
     1. Espere alguns instantes
     2. A API deve ser aberta no browser com sucesso mostrando a mensagem "IMAGINE SHOP"
     3. Caso ela não abra no Chrome
        1. Limpe o cache, feche e abra o navegador novamente OU
        2. tente abrir no Firefox ou no Edge
     4. Tente abrir no Insomnia também
     5. Lembre-se de utilizar https principalmente no Insomnia, para cada endpoint
        
        IMPORTANTE: Embora o fly mostre http, no browser ele redireciona para https
     