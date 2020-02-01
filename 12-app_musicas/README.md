# UFSC - CTC - INE - INE5646 Programação para Web :: Exercício App Músicas

A aplicação mostra quais são cantores que estão entre os 10 primeiros colocados segundo o site [LastFM](https://www.last.fm/). São mostrados, para cada cantor, o seu nome, uma fotografia e um link para um site com mais informações.

## Objetivo do Exercício

Mostrar uma aplicação do tipo PWA (**Progressive Web Application**) que funciona mesmo quando não há conexão com a Internet. A aplicação utiliza a biblioteca [workbox](https://developers.google.com/web/tools/workbox/) para gerenciar os conteúdos offline. A aplicação também utiliza o conceito de *hooks* para modelar os componentes React. Assim todos os componentes React são modelados como funções e não como classes.

## Instruções

Depois de baixar/clonar o respositório, entre no diretório **cliente** e digite

`npm install`

para instalar os pacotes JavaScript utilizados pelo lado cliente da aplicação.

Repita o comando acima dentro do diretório **servidor** para instalar os pacotes JavaScript utilizados pelo lado servidor da aplicação.

No mesmo diretório **servidor**,  crie o arquivo **.env** (o nome do arquivo é *.env*) e adicione o seguinte conteúdo

```bash
PORTA=3099
LASTFM_API_KEY='...'
FANART_TV_API_KEY='...'
```

O valor da variável *LASTFM_API_KEY* é obtido no endereço [https://www.last.fm/api](https://www.last.fm/api). Isso permitirá que sua aplicação acesse o webservice do Last.fm para consultar os artistas top 10.

O valor da variável *FANART_TV_API_KEY* é obtido no endereço [https://fanart.tv/get-an-api-key/](https://fanart.tv/get-an-api-key/). Isso permitirá que sua aplicação acesse imagens dos artistas indicados pelo site Last.FM.

Obs: A identificação dos artistas é feita por meio do identificador [MBID](https://musicbrainz.org/).

### Durante o desenvolvimento

O desenvolvimento da aplicação envolve duas frentes de trabalho: a programação necessária para o lado cliente e a programação necessária para o lado servidor.

#### Lado Cliente

Para iniciar o desenvolvimento do lado cliente entre no diretório **cliente** e digite

`npm start`

Cada vez que um arquivo no lado cliente for alterado o webpack será acionado para uma nova versão de todos os arquivos (*index.html* e *arquivos JavaScript*) necessários para a execução do lado cliente da aplicação.

#### Lado Servidor

Para iniciar o desenvolvimento do lado servidor entre no diretório **servidor** e digite

`npm start`

A partir de então a aplicação estará disponível na porta 3099 (ou na porta que você definiu no arquivo **.env**). Para acessar, use o navegador e digite o endereço `https://localhost:3099`.

Sempre que um arquivo for salvo a aplicação irá reiniciar automaticamente (graças ao pacote **nodemon**).

### Em produção

Depois que o código da aplicação está pronto é preciso gerar as versões otimizadas (em termos de tamanho e velocidade de execução) dos arquivos do lado cliente e do lado servidor.

#### No Lado Cliente

Para gerar a versão em produção do lado cliente entre no diretório **cliente** e digite

`npm run build`

Observe que o tamanho do arquivo *bundle.js* diminui drasticamente de tamanho.

#### Mo Lado Servidor

Para gerar a versão em produção do lado servidor entre no diretório **servidor** e digite

`npm run build`

### Executando a aplicação em produção

Para executar a aplicação em modo produção entre no diretório **servidor** e digite

`node build/app.js`

## Executando offline

Depois que a aplicação foi executada a primeira vez, seja no modo desenvolvimento ou no modo em produção, é possível continuar usando mesmo que o servidor Node.js esteja desligado e que não haja conexão com a Internet.

Para testar, encerre o Node.js (se estiver sendo executado), desative a conexão com a Internet do seu dispositivo
e feche o Navegador. Carregue o navegador e digite `https://localhost:3099` (ou a porta que você definiu no arquivo .env) e a aplicação funcionará normalmente.
