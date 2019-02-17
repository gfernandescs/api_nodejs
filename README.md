# api_nodejs
API RESTFul em NodeJS, utilizando ExpressJS e MongoDB


<b>Desafio:</b>

Criar uma api RESTFul em NodeJS, utilizando ExpressJS e MongoDB, na qual é possível inserir, atualizar, listar e deletar usuários, observando as melhores práticas de programação.

As rotas das urls da api devem ser protegidas através do uso de JSON Web Token (JWT). Logo, cada usuário cadastrado deve estar apto a ser autenticado/autorizado pelo sistema.

Os tipos de perfis permitidos para os usuários são:

- admin (usuários que tem permissão total a todas as rotas);

- user (usuários que tem permissão somente para listar os usuários cadastrados e edição apenas de seus dados);
