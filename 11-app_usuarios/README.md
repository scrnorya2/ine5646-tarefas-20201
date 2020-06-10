# UFSC - CTC - INE - INE5646 Programação para Web :: Exercício App Usuários

A aplicação permite o gerenciamento de usuários de uma aplicação usando o framework [Firebase](https://firebase.google.com/).

## Objetivo do Exercício

Mostrar como usar o Firebase para gerenciar usuários via Firebase.

## Instruções

Depois de baixar/clonar o respositório, entre no diretório **cliente** e digite

`npm install`

para instalar os pacotes JavaScript utilizados pelo lado cliente da aplicação.

Repita o comando acima dentro do diretório **servidor** para instalar os pacotes JavaScript utilizados pelo lado servidor da aplicação.

No mesmo diretório **servidor**,  crie o arquivo **.env** e adicione o seguinte conteúdo

```bash
PORTA=3000
```

### Criação e Configuração no Firebase

Acesse o [console do Firebase](https://console.firebase.google.com) e proceda conforme as instruções a seguir.

### Criar novo projeto

1. Adicione novo projeto e forneça um nome para o projeto.

2. Desative o Google Analytics (não é necessário para o exercício)

3. Clique no botão "Criar Projeto"

### Criar arquivo firebase-adminskd.json

Com o projeto criado,

1. Clique no botão (ícone roda-dentada) ao lado de "Visão geral do projeto" e selecione a opção "Configurações do Projeto"

2. Selecione a aba "Settings/Contas de Serviço"

3. Na aba "SDK Admin do Firebase", clique em "Gerar nova chave primária" e depois em "Gerar chave". Será gerado um arquivo JSON. Salve este arquivo dentro do diretório *servidor* da aplicação usando como nome do arquivo **firebase-adminsdk.json**.

O conteúdo do arquivo será um objeto JSON com os seguintes atributos (no lugar de *...* aparecerão os dados específicos do seu projeto):

```bash
{
  "type": "service_account",
  "project_id": "...",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "...",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```  

### Criar arquivo firebase-config.json

1. Selecione a aba "Settings/Geral".

2. Na seção "Seus aplicativos" (que deverá mostrar a mensagem *Não há apps no seu projeto*) clique no terceiro botão (à direita do botão android), que mostra o símbolo **</>**.

3. Registre o app, preenchendo o campo *Apelido do app*. Coloque qualquer nome, por exemplo, *app-usuarios*.

4. Clique no botão "Registrar app".

5. Clique no botão "Continuar no console".

6. Agora na seção "Seus aplicativos" aparece o nome que você colocou na etapa 3 acima (no exemplo, *app-usuarios*). Na seção "Firebase SDK snippet", selecione a opção "Configuração" (está selecinada a opção "CDN").

7. Copie o valor da constante *firebaseConfig*, que é um objeto JavaScript com vários atributos (apiKey, authDomain, etc).

8. No diretório *servidor*, crie o arquivo **firebase-config.json** (que ficará ao lado do arquivo *firebase-adminsdk.json*) e cole o objeto copiado na etapa 7. Coloque todos os atributos entre aspas (uma vez que é um objeto JSON). O conteúdo do arquivo será (no lugar de *...* devem estar os valores da sua aplicação):

```bash
{
  "apiKey": "...",
  "authDomain": "....firebaseapp.com",
  "databaseURL": "https://....firebaseio.com",
  "projectId": "...",
  "storageBucket": "",
  "messagingSenderId": "...",
  "appId": "..."
}
```

## Habilitar serviço de autenticação de usuários

O Firebase fornece diversos servidos (hospedagem, autenticação, base de dados, etc). No exercício utiliza-se apenas o serviço de autenticação de usuários.

1. Clique na opção "Desenvolver/Authentication".

2. Na aba "Users", clique no botão "Configurar método de login".

3. Selecione a opção "E-mail/senha" e clique no primeiro botão "Ativar" ("Permite que os usuários se inscrevam usando o endereço de e-mail e a senha deles").

4. Clique no botão "Salvar". O provedor "E-mail/senha" agora tem status "Ativado".

5. Clique na aba "Users" e em seguida no botão "Adicionar usuário".

6. Digite um e-mail válido que você tenha acesso (para ler e-mails que o Firebase irá lhe enviar) e uma senha (esta senha é exclusiva para este exercício, não é a senha do e-mail informado). Este e-mail será o administrador no exercício app-usuarios. Clique no botão "Adicionar usuário".

## Cadastrar administrador da aplicação

No exercício o e-mail cadastrado na etapa 6 acima tem a capacidade de cadastrar novos usuários (identifiados por seus respectivos e-mails). Para que isso seja possível:

1. Abra um terminal e entre no diretório *servidor*.

2. Digite **npm run build**.

3. Cadastre o administrador digitando `node build/scripts/cria_admin.js e-mail-do-administrador`.

### Durante o desenvolvimento

O desenvolvimento da aplicação envolve duas frentes de trabalho: a programação necessária para o lado cliente e a programação necessária para o lado servidor.

#### Lado Cliente

Para iniciar o desenvolvimento do lado cliente entre no diretório **cliente** e digite

`npm start`

Cada vez que um arquivo no lado cliente for alterado o webpack será acionado para gerar uma nova versão do arquivo bundle.js.

#### Lado Servidor

Para iniciar o desenvolvimento do lado servidor entre no diretório **servidor** e digite

`npm start`

A partir de então a aplicação estará disponível na porta 3000 (ou na porta que você definiu no arquivo **.env**). Para acessar, use o navegador e digite o endereço `https://localhost:3000`.

Sempre que um arquivo for salvo a aplicação irá reiniciar automaticamente (graças ao pacote **nodemon**).

### Em produção

Depois que o código da aplicação está pronto é preciso gerar as versões otimizadas (em termos de tamanho e velocidade de execução) dos arquivos do lado cliente e do lado servidor.

#### No Lado Cliente

Para gerar a versão em produção do lado cliente entre no diretório **cliente** e digite

`npm run build`

Observe que o tamanho do arquivo *bundle.js* diminui drasticamente de tamanho.

#### No Lado Servidor

Para gerar a versão em produção do lado servidor entre no diretório **servidor** e digite

`npm run build`

Para executar a aplicação em modo produção entre no diretório **servidor** e digite

`node build/app.js`
