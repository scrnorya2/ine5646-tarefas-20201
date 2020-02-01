echo 'Botando a aplicação no ar'
cd ..
cd ms_email
node build/app.js &
cd ..
cd ms_autentica
node build/app.js &
cd ..
cd ms_mensageiro
node build/app.js &
cd ..
cd app
cd servidor
node build/app.js &
cd ..
cd ..

