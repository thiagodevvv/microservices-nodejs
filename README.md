# microservices-nodejs
Projeto de microservices com NodeJS utilizando fila!

Nesse Projeto de Fila em NodeJS foram resolvidos alguns problemas básicos de CPU do NODEJS exemplo:

1. Se nosso servidor receber uma requisição que pode demorar para ser resolvida(endpoint "/nuke"), outros endpoints do servidor não funcionavam/respondiam enquanto essa requisição não finalizasse.

Resolução:
  1. Separar a função  ("bigProcess") que executa no endpoint "/nuke" em outro arquivo chamado "sub-process.js" 
  2. Utilizar a função  "spawn" do modulo "child_process"
  3. Foi criado a função "runBigProcess" para chamar o "sub-process.js" separado e que retorna uma promise, pois a interface de retorno do modulo "child_process" é uma stream. 
  5. Agora mesmo executando a função bigProcess no endpoint "/nuke", nosso servidor pode responder outra requisiçao em outro endpoint.
  
2. Imagine que agora tenhamos varias requisições no mesmo endpoint "/nuke", para nosso servidor não quebrar/cair/nao responder vamos utilizar uma simples fila... Mas o que é uma fila? É uma fila igual de uma loterica por exemplo, as pessoas que estão na fila só podem ser atendidas SE haver caixas de atendimento disponiveis.

Resolução:
  1. Foi criado duas variaveis: runningProcs []  (armazena os processos que estão em executação ) AND maxParallelProcs = 2 (max de process executando em paralelo)
  2. Foi criada outra função chamada "runBigProcessInQueue"
     2.1. Essa função tem a responsabilidade de colocar os processos em fila para serem executados.
     2.2. Primeiro ela confere se runningProcs.length >= maxParallelProcs, caso verdade, ela espera até que o primeiro processo seja resolvido, utilizando recursividade.



