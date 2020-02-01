# UFSC - CTC - INE - INE5646 Programação para Web :: App email -- Microserviço Email

Programa que implementa um microserviço utilizando a biblioteca [Moleculer](https://moleculer.services/). O microserviço faz parte da aplicação **app_email** e disponibiliza
os seguintes serviços:

## Serviço email.enviaEmail

Serviço que envia um e-mail usando os seguintes parâmetros:

* `para: string` = e-mail do destinatário da mensagem
* `assunto: string` = assunto da mensagem
* `texto: string` = a mensagem

O serviço retorna:

* `{ok: true}` caso tenha sido possível enviar o e-mail.
* `{ok: false, motivo: string}` caso não tenha sido possível enviar o e-mail.

## Serviço email.validaEmail

Serviço que verifica se um e-mail realmente existe usando os seguintes parâmetros:

* `email: string`= e-mail a ser validado

O serviço retorna:

* `{ok: true}` caso o e-mail seja válido
* `{ok: false, motivo: string}` caso o e-mail não seja válido

## Instruções

### Preparação

Tenha certeza que o servidor NATS está rodando.

### Configuração

#### Do Serviço de envio e-mail

Os emails são enviados via uma conta Google. Para isso tome as seguintes providências:

1. Crie uma conta de e-mail no Gmail. Não utilize a sua conta pessoal!

1. Entre na conta criada.

1. Clique em *Google Account* (canto superior direito da tela).

1. Clique em *Security*.

1. Habilite a opção *Less secure app access*.

O serviço usa a biblioteca [nodemailer](https://nodemailer.com/about/) para enviar e-mails.
Dentro do seu código, configure o *transport* conforme definido a seguir:

```javascript
const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
})
```

As variáveis **EMAIL** e **EMAIL_PASSWORD** são, respectivamente, a conta criada e a senha.

#### Do Serviço de validação de e-mail

O microserviço também permite que seja feita uma análise que verifica a validade do e-mail com o objetivo
de tentar garantir que o e-mail realmente existe.

A empresa [IPQUALITYSCORE](https://www.ipqualityscore.com/documentation/email-validation/overview)
fornece um serviço que verifica a validade de um e-mail. Crie uma conta e será informado o valor da API_KEY (a chave é enviada por email) necessária para acessar este serviço.

### Variáveis de ambiente

O arquivo *.env* localizado dentro do diretório *ms_email* deve conter:

```bash
NATS_URL=nats://valormagico@localhost:4222

EMAIL=conta.criada.por.voce@gmail.com
EMAIL_PASSWORD=senha_da_conta_criada_por_voce

IPQUALITYSCORE_API_KEY=MiE2oGCMde7kkkaaacccJ7oB1hWKXdNF
```

### Durante o desenvolvimento

Para iniciar o desenvolvimento digite

`npm start`

A partir de então o microserviço estará disponível para receber mensagens via **NATS**.

Sempre que um arquivo for alterado e salvo o microserviço irá reiniciar automaticamente (graças ao pacote **nodemon**).

### Em produção

Depois que o código do microserviço está pronto é preciso gerar as versões otimizadas (em termos de tamanho e velocidade de execução) dos arquivos.

`npm run build`

### Executando o microserviço em produção

Para executar o microserviço em modo produção entre no diretório e digite

`node build/app.js`
