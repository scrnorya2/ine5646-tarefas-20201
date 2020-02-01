# UFSC - CTC - INE - INE5646 Programação para Web

## Aplicação App_email - Servidor NATS

Para colocar o servidor NATS no ar é preciso definir um valor para a variável de ambiente **NATS_AUTH_TOKEN**. Por exemplo:

```bash
export NATS_AUTH_TOKEN='valormagico'  // versão Linux/Mac
set NATS_AUTH_TOKEN='valormagico'     // versão Windows
```

Uma vez definida a variável, basta executar o comando:

```bash
nats-server --tls --tlscert=./cert.pem --tlskey=./key.pem --auth $NATS_AUTH_TOKEN
```

em um terminal.
