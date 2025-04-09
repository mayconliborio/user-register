# Cadastro de Usuários

Uma aplicação de cadastro de usuários desenvolvida com **Vue 3**, **TypeScript**, **Vue Router**, **Pinia** e **TailwindCSS**, com o
objetivo de demonstrar boas práticas no uso dessas tecnologias através de uma interface simples e funcional.

---

## 🛠️ Requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

- **Node.js** (`>= 16.x.x`) [Baixe aqui](https://nodejs.org/)
- **NPM** (gerenciador de pacotes que já vem incluso no Node.js)

---

## 📦 Instalação

Siga os passos abaixo para configurar o ambiente e rodar o projeto localmente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/mayconliborio/user-register.git
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd user-register
   ```
3. Instale as dependências do projeto:
   ```bash
   npm install
   ```
4. Execute o ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```

Agora, acesse o projeto no navegador pelo endereço [http://localhost:5173](http://localhost:5173).

---

## 🧪 Executando os Testes

Para garantir a qualidade e o bom funcionamento da aplicação, foram implementados testes utilizando o **Vitest**. Siga o
passo abaixo para executar os testes:

1. Certifique-se de estar no diretório raiz do projeto (`user-register`).
2. Execute o seguinte comando no seu terminal:
   ```bash
   npm run test

---

## 🚀 Executando a Build de Produção

Para executar a build de produção e testar o resultado, siga os passos abaixo:

1. Certifique-se de estar no diretório raiz do projeto (`user-register`).
2. Execute o seguinte comando no seu terminal:  
   ```bash
   npm run build
   ```
3. Inicie um servidor local para servir os arquivos da pasta dist. Você pode usar o serve do NPM:
   ```bash
   npm install -g serve
   serve dist
   ```
4. Acesse o projeto no navegador pelo endereço exibido no terminal (`geralmente http://localhost:3000`).
---

## ✨ Solução Utilizada

- **Vue 3**: Framework JavaScript para construção de interfaces de usuário.
- **TypeScript**: Para aumentar a robustez e segurança do código. Permite definir tipos para variáveis, funções e componentes, facilitando a detecção de erros durante o desenvolvimento e melhorando a manutenção do projeto.
- **Vue Router**: Gerenciador de rotas para navegação entre as páginas.
- **Pinia**: Biblioteca para gerenciar estados globais de forma simples e eficiente.
- **TailwindCSS**: Framework CSS para estilização e layout responsivo.
- **Maska**: Biblioteca para formatação de campos de formulário.
- Ferramentas auxiliares como **Vite** para build e **Vitest** para testes.

A aplicação permite realizar o cadastro de usuários com validações em campos como **CPF**, **e-mail** e **telefone**,
exibindo mensagens amigáveis em caso de erros.

---

## 📝 Licença

Este projeto está licenciado sob a licença **MIT**. Consulte o arquivo [LICENSE](./LICENSE) para obter mais informações.
