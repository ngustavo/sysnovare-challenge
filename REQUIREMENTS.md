## Criação de um sistema de homebanking.

**Requisitos FrontEnd**

Funcionalidades obrigatórias:

- Página de Login
- Lista de Movimentos
- Depositar Fundos
- Retirar Fundos

Tecnologias obrigatórias:

- [https://angular.io/](https://angular.io/)
- [https://material.angular.io/](https://material.angular.io/)

**Requisitos BackEnd**

- Desenvolvimento das interfaces necessárias para um sistema de homebanking, incluindo uma API REST.
- Possibilidade de um utilizador subscrever um serviço usando email e password.
- Deve fazer login para poder usar as rotas privadas.
- Não deve ser usada base de dados para guardar dados, mas sim um sistema de ficheiros para guardar a informação.

**Stack Tecnológica:**

- Uso obrigatório de Framework Hapi ([https://hapi.dev/](https://hapi.dev/))
- Implementação de rotas seguras com JWT.

**Rotas obrigatórias:**

- POST /subscribe - rota pública que permite criar conta de utilizador (utilizador é identificado pelo email e password)
- POST /login - rota pública para obter token jwt para acesso a rotas privadas.
- GET /funds - rota privada que permite ao utilizador logado saber o seu saldo.
- PUT /funds - rota privada que permite ao utilizador adicionar fundos a sua conta.
- DELETE /funds - rota privada que permite ao utilizador retirar fundos da conta.

**Pontos a avaliar:**

- Comentários, Organização de Código
- Clareza e documentação, Formatação e Boas Práticas
- Componentes, Plugins usados, Plugins Adicionais (Logs, Segurança, Documentação, ...)
- Rotas adicionais que implementam funcionalidades que imaginem que valorizam a solução final.
- Usabilidade e Experiência de utilização (O angular material tem uma série de guias de como desenhar as interfaces)
- Funcionalidades adicionais

O código deve ser armazenado num repositório github e enviado o link do mesmo, **no máximo dentro de uma semana**.
