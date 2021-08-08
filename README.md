# microservices-nodejs
Projeto de microservices com NodeJS utilizando fila!

Nesse Projeto de Fila em NodeJS foram resolvidos alguns problemas básicos de CPU do NODEJS exemplo:

1. Se nosso servidor receber uma requisição (endpoint "/nuke") que pode demorar para ser resolvida, outros endpoints do servidor não funcionavam/respondiam enquanto essa requisição não finalizasse.
Resolução:
  1. Separar a função  ("bigProcess") que executa no endpoint "/nuke" em outro arquivo chamado "sub-process.js" 
  2. Utilizar a função  "spawn" do modulo "child_process"
  3. Foi criado a função "runBigProcess" para chamar o "sub-process.js" separado e que retorna uma promise, pois a interface de retorno do modulo "child_process" é uma stream. 
  

