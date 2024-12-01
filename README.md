# Desbravador Search

![Desbravador Search](https://i.postimg.cc/L8R6Wrv7/image.png)

Este projeto é uma aplicação React + TypeScript utilizando Vite, que permite buscar usuários e repositórios do GitHub. A aplicação inclui páginas para buscar usuários, visualizar detalhes dos usuários e detalhes dos repositórios.

## **Destaques**

- **Testes Unitários**: Cobertura completa de todos os componentes, páginas e utils.
- **Bootstrap**: Foi utilizado o bootstrap para a criação das classes e responsividade
- **Axios**: Requisições utilizando o axios, sendo chamadas pelo services/api. Cada chamada tem seu devido tratamento em caso de erro.

## **Páginas**

### Home
Página inicial onde o usuário pode efetuar uma busca de um usuário do GitHub.

### User
Página listando detalhes do usuário que foi pesquisado no GitHub.

### Repo
Página listando detalhes do repositório que foi clicado na página User.

## **Componentes**

### Header
Componente Header da aplicação, com um ícone simulando a logo e um botão de voltar que fica visível somente nas páginas User e Repo.

### Loading
Componente de Loading que é utilizado enquanto as requisições estão sendo carregadas.

### RepoDetails
Componente responsável por listar os detalhes do repositório.

### RepoList
Componente responsável por exibir a lista de repositórios.

### UserDetails
Componente responsável por exibir detalhes do usuário.

### UserSearch
Componente responsável por exibir o formulário e efetuar a busca de um usuário.

## **Utils**

### getErrorMessage
Função responsável por tratar a mensagem de erro nas requisições da API.

### gitHubValidation
Função responsável por validar se o padrão do usuário digitado é válido.

## **Services**

### api
Serviço com cada rota de requisição separada.

## **Inicialização do Projeto**

Para inicializar o projeto, siga os passos abaixo:

1. **Clone o repositório:**
```git clone https://github.com/wendellchrys/desbravador-search.git
```

2. **Navegue até o diretório do projeto:**
``` cd desbravador-search
```

3. **Instale as dependências:**
``` pnpm install
```

4. **Inicie o servidor de desenvolvimento:**
``` pnpm dev
```