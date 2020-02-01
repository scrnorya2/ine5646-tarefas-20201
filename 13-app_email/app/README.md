# UFSC - CTC - INE - INE5646 Programação para Web :: App Email

## Aplicação para web

A aplicação tem por objetivo permitir que usuários cadastrados enviem mensagens para outros usuários cadastrados. Além disso o usuário cadastrado pode ver as mensagens que já enviou. O transporte dessas mensagens é feito via e-mail.

Um usuário se cadastra fornecendo seu e-mail, seu  nome e uma senha para acesso à aplicação. A aplicação então envia um e-mail para o endereço fornecido contendo um link que, quando clicado, confirmará o cadastro.

Um usuário que esqueceu sua senha pode solicitar para a aplicação que envie e-mail com instruções para cadastrar nova senha.

## Instruções

### Preparação

Esta aplicação utiliza o microserviço **ms_autentica** que faz a autenticação dos usuários. Portanto, você deve garantir que o microserviço esteja no ar.

Depois de baixar/clonar o respositório, entre no diretório **cliente** e digite

`npm install`

para instalar os pacotes JavaScript utilizados pelo lado cliente da aplicação.

Repita o comando acima dentro do diretório **servidor** para instalar os pacotes JavaScript utilizados pelo lado servidor da aplicação.

No mesmo diretório **servidor**,  crie o arquivo **.env** e adicione o seguinte conteúdo:

```bash
PORTA=3000
NATS_URL=nats://valormagico@localhost:4222
```

A variável *PORTA* indica que o servidor da aplicação para web utilizará a porta 3000 para receber requisições HTTP.

A variável **NATS_URL** indica: a) qual é o token de autenticação, no exemplo *valormagico*,  que deve ser usado pelo servidor web para acessar um microserviço; b) onde o sevidor NATS está rodando, no exemplo *localhost*; c) qual a porta usada pelo servidor NATS, no exemplo 4222.

### Durante o desenvolvimento

O desenvolvimento da aplicação envolve duas frentes de trabalho: a programação necessária para o lado cliente e a programação necessária para o lado servidor.

#### Lado Cliente

Para iniciar o desenvolvimento do lado cliente entre no diretório **cliente** e digite

`npm start`

Cada vez que um arquivo no lado cliente for alterado o *webpack* será acionado para gerar uma nova versão dos arquivos usados no lado
cliente. Estes arquivos são armazenados no diretório **publico** dentro do diretório **servidor**.

#### Lado Servidor

Para iniciar o desenvolvimento do lado servidor entre no diretório **servidor** e digite

`npm start`

A partir de então a aplicação estará disponível na porta 3000 (ou na porta que você definiu no arquivo **.env**). Para acessar, use o navegador e digite o endereço `https://localhost:3000`

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

## Executando a aplicação em produção

Para executar a aplicação em modo produção entre no diretório **servidor** e digite

`node build\app.js`
