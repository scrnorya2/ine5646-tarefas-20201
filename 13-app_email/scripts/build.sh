echo 'Gerando builds'
cd ..
cd ms_email
npm run build &
cd ..
cd ms_autentica
npm run build &
cd ..
cd ms_mensageiro
npm run build &
cd ..
cd app
cd cliente
npm run build &
cd ..
cd servidor
npm run build &
cd ..
cd ..
echo 'Aguarde todas as tarefas serem concluídas'

