# Sistema Dindin

## Sobre:

RESTful API para gestão de despesas e receitas, com operações CRUD (Create, Read, Update e Delete). A linguagem utilizada para desenvolver a API foi JavaScript com Node.js utilizando o framework Express.js, e os pacotes bcrypt para criptografar a senha, dotenv para criar variáveis de ambiente, jsonwebtoken para criar e validar um token de autenticação e o pg para fazer a conexão entre o PostgreSQL (Banco de Dados) e o Node.js (Aplicação).

## Funcionalidades:

🔹 Cadastrar Usuário </br>
🔹 Fazer Login </br>
🔹 Detalhar Perfil do Usuário Logado </br>
🔹 Editar Perfil do Usuário Logado </br>
🔹 Listar categorias </br>
🔹 Listar transações </br>
🔹 Detalhar transação </br>
🔹 Cadastrar transação </br>
🔹 Editar transação </br>
🔹 Remover transação </br>
🔹 Obter extrato de transações </br>
🔹 Filtrar transações por categoria </br>

## Como executar:

1. Faça o fork do projeto e em seguida clone para sua máquina.
2. Abra o VSCode na pasta clonada e digite este comando no terminal:
```bash
npm install
```
  Em seguida, todos os pacotes listados como dependências serão instalados e estarão na pasta node_modules.
  
3. Depois de instalado os pacotes, iremos digitar:
```bash
npm run dev
```
Com isso, teremos o servidor inicializado e para testar os endpoints utilize o Postman, Insomnia ou outros de sua escolha.

# Endpoints:

## Cadastrar Usuário
http://localhost:3000/usuario

![]()

## Fazer Login
http://localhost:3000/login

![]()

## Detalhar Perfil do Usuário Logado
http://localhost:3000/usuario

![]()

## Editar Perfil do Usuário Logado
http://localhost:3000/usuario

![]()

## Listar categorias
http://localhost:3000/categorias

![]()

## Listar transações
http://localhost:3000/transacao

![]()

## Detalhar transação
http://localhost:3000/transacao/:id

![]()

## Cadastrar transação
http://localhost:3000/transacao

![]()

## Editar transação
http://localhost:3000/transacao/:id

![]()

## Remover transação
http://localhost:3000/transacao/:id

![]()

## Obter extrato de transações
http://localhost:3000/transacao/extrato

![]()

## Filtrar transações por categoria
http://localhost:3000/transacao?filtro=nome-da-categoria

![]()

## Tecnologias utilizadas:

<div style="display: inline_block"></br>
  <div style="display: inline_block">
  <img align="center" alt="Js" height="50" width="60" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg">
  <img align="center" alt="nodejs" height="50" width="60" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
  <img align="center" alt="express" height="50" width="50" src="https://github.com/bush1D3v/solid_rest_api/assets/133554156/ba645c20-1f19-4914-8ad0-de6c7f83ba2e" />
  <img align="center" alt="postman" height="55" width="55" src="https://seeklogo.com/images/P/postman-logo-0087CA0D15-seeklogo.com.png">
  <img align="center" alt="postgresql" height="55" width="55" src="https://seeklogo.com/images/P/postgresql-logo-5309879B58-seeklogo.com.png">
  <img align="center" alt="jwt" height="55" width="55" src="https://seeklogo.com/images/J/json-web-tokens-jwt-io-logo-C003DEC47A-seeklogo.com.png">
  <img align="center" alt="nodemon" height="55" width="50" src="https://seeklogo.com/images/N/nodemon-logo-9F66F45AB1-seeklogo.com.png">
  <img align="center" alt="dotenv" height="50" width="50" src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.png">
</div>
