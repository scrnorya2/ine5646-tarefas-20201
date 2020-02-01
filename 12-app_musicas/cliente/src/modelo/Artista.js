export class Artista {
  constructor(nome, url, imagem) {
    this.__nome = nome
    this.__imagem = imagem
    this.__url = url
  }

  get nome() {
    return this.__nome
  }

  get imagem() {
    return this.__imagem
  }

  get url() {
    return this.__url
  }
}