# UFSC - CTC - INE - INE5646 Programação para Web :: App email -- Microserviço Autentica

Programa que implementa um microserviço utilizando a biblioteca [Moleculer](https://moleculer.services/). O microserviço faz parte da aplicação **app_email** e disponibiliza
os seguintes serviços:

## Serviço autentica.alteraSenha

O serviço altera a senha do usuário armazenando-a criptografada no banco de dados. Necessita dos seguintes parâmetros:

* `token: string` = token UUID gerado pela aplicação.
* `senha: string` = a nova senha.

O serviço retorna:

* `{ok: true}` caso a alteração tenha sido realizada.
* `{ok: false, motivo: string}` caso não tenha sido possível alterar. Motivos típicos: token fornecido inválido; banco de dados inacessível.

## Serviço autentica.cadastra

Serviço que cadastra um novo usuário no banco de dados. Necessita dos seguintes parâmetros:

* `origin: string` = host onde a aplicação app_email está rodando
* `nomeApp: string` = nome da aplicação
* `email: string` = e-mail do usuário
* `nome: string` = nome do usuário
* `senha: string` = senha criada pelo usuário

O serviço retorna:

* `{ok: true}` caso tenha sido possível cadastrar o usuário. O serviço envia um
  e-mail para que o usuário confirme o cadastro.
* `{ok: false, motivo: string}` caso não tenha sido possível cadastrar o usuário. Motivos típicos: e-mail fornecido não existe ou já foi cadastrado; senha muito pequena (menos de 3 caracteres), banco de dados inacessível.

## Serviço autentica.confirma

Serviço que confirma o cadastro do usuário. Com esta ação o usuário confirma que foi ele mesmo quem fez o cadastro.
Necessita dos seguintes parâmetros:

* `token: string` = token UUID gerado pela aplicação.

O serviço retorna:

* `{ok: true}` caso a confirmação tenha sido realizada com sucesso.
* `{ok: false, motivo: string}` caso não tenha sido possível confirmar. Motivos típicos: a confirmação já foi feita,
o token não foi gerado pela aplicação, não foi possível acessar o banco de dados.

## Serviço autentica.confirmaTokenRedefinicao

Serviço que permite ao usuáRio que ele confirme o interesse em redefinir a sua senha. Necessita dos seguintes parâmetros:

* `token: string` = token UUID gerado pela aplicação.

O seviço retorna:

* `{ok: true, token: string}` caso o token fornecido seja válido. O token UUID retornado será usado para garantir a validade do pedido para armazenar a nova senha.
* `{ok: false, motivo: string}` caso não tenha sido possível confirmar. Motivos típicos: o token fornecido não foi gerado pela aplicação; banco de dados inacessível.

## Serviço autentica.fazLogin

Serviço que permite que o usuário faça login na aplicação. Necessita dos seguintes parâmetros:

* `email: string` = e-mail do usuário
* `senha: string` = senha do usuário

O serviço retorna:

* `{ok: true, token: string}` caso o login seja realizado com sucesso. O token é um JSON Web Token que contém os seguintes dados: {nome, email, iat, exp} que armazenam o nome do usuário, seu e-mail, quando foi gerado (*iat*) e quando expira (*exp*). O prazo de validade do token é definido em *process.env.JWT_DURATION*.

* `{ok: false, motivo: string}` caso não tenha sido possível fazer o login. Motivos típicos: e-mail não cadastrado ou
ainda não confirmado; senha incorreta; banco de dados inacessível.

## Serviço autentica.pesquisaUsuario

Serviço que pesquisa por um usuário. Necessita dos seguintes parâmetros:

* `token: string` = token JWT
* `email: string` = e-mail do usuário desejado

O serviço retorna:

* `{ok: true, nome: string}` caso o token seja válido e haja um usuário com o e-mail fornecido. O atributo *nome* contém o nome do usuário.
* `{ok: false, motivo: string}` caso o token seja inválido (tipicamente já expirou), ou não haja usuário com o e-mail informado.

## Serviço autentica.recuperaSenha

Serviço que permite ao usuário recuperar a sua senha. Será solicitado, via e-mail, que o usuário confirme o desejo de alterar a sua senha. Necessita dos seguintes parâmetros:

* `origin: string` = host onde a aplicação app_email está rodando
* `nomeApp: string` = nome da aplicação
* `email: string` = e-mail do usuário

O serviço retorna:

* `{ok: true}` caso a recuperação possa ser realizada. Nesse caso o serviço envia e-mail ao usuário com as instruções para que ele cadastre uma nova senha.
* `{ok: false, motivo: string}` caso não tenha sido possível confirmar. Motivos típicos: e-mail não cadastrado; banco de dados inacessível.

## Serviço autentica.remove

Serviço que remove um usuário da aplicação. Necessita dos seguintes parâmetros:

* `token: string` = token JWT gerado pela aplicação.

O serviço retorna:

* `{ok: true}` caso a remoção tenha sido realizada.
* `{ok: false, motivo: string}` caso não tenha sido possível remover. Motivos típicos: token JWT é falso ou já expirou; banco de dados inacessível.

## Serviço autentica.renovaToken

Serviço que gera um novo token JWT a partir do token JWT enviado. Motivação típica: renovar a duração de um token que já foi emitido. Se o token enviado ainda não expirou então retorna um novo token contendo as mesmas informações do token enviado mas com prazo de expiração extendido pelo tempo definido em *process.env.JWT_DURATION*. Necessita do seguinte parâmetro:

* `token: string` = um token JWT

O serviço retorna:

* `string` = uma string representando um token JWT quando o token enviado ainda não expirou.
* `null`  = quando o token enviado já havia expirado

## Instruções

### Preparação

Tenha certeza que o servidor NATS está rodando.

### Variáveis de ambiente

O arquivo *.env* localizado dentro do diretório *ms_autentica* deve conter:

```bash
NATS_URL=nats://valormagico@localhost:4222

URL_BANCO=mongodb://...

CRIPTO_SALT=um codigo bem aleatorio

JWT_PASSWORD=uma senha bem secreta
JWT_DURATION=15m
```

A variável *NATS* indica onde está localizado o servidor NATS.

A variável *URL_BANCO* indica qual a URL que permite ao microserviço acessar o banco de dados que armazenará os dados dos usuários.

A variável *CRIPTO_SALT* deve ser um valor completamente aleatório. Este valor é usado para criptografar a senha informada pelo usuário. Assim, no banco de dados apenas a senha criptografada ficará armazenada.

A variável *JWT_PASSWORD* deve ser um valor completamente aleatório. Este valor é usado para assinar os tokens JWT. É combase neste valor que o serviço consegue decidir se um token JWT é legítimo (foi gerado pelo microserviço).

A variável *JWT_DURATION* define o prazo de validade do token JWT. No exemplo, o prazo é de 15 minutos.

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
