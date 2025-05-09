# [Back - BugWave]

API robusta para a plataforma BugWave, focada na submissão, armazenamento e avaliação de artigos acadêmicos. Desenvolvido com Node.js, MongoDB e integração com AWS S3 para armazenamento de arquivos PDF.

## Sobre o Projeto

Este backend fornece todos os serviços necessários para alimentar a aplicação frontend do BugWave. Ele gerencia o ciclo completo de submissão de artigos por alunos, armazenamento seguro em nuvem, e oferece endpoints para que avaliadores possam acessar, comentar e avaliar os artigos.

A aplicação armazena os artigos enviados em formato PDF na AWS S3 e mantém todos os dados dos usuários, eventos, avaliações e feedbacks no banco de dados MongoDB.

**Frontend correspondente pode ser encontrado em: [https://github.com/bug-wave/front-bugwave](https://github.com/bug-wave/front-bugwave)**

**Principais Funcionalidades (Backend):**
*   **Submissão de Artigos:** Upload de arquivos PDF integrados com AWS S3.
*   **Gerenciamento de Usuários:** Alunos, avaliadores e administradores.
*   **Criação e Gestão de Eventos:** Inclusão de eventos acadêmicos para submissão de trabalhos.
*   **Sistema de Avaliação:** Avaliadores podem acessar artigos, deixar feedback e notas.
*   **Integração com Frontend:** API RESTful conectada ao frontend em Next.js.

## Tecnologias Utilizadas
*   **Linguagem:** JavaScript (Node.js)
*   **Framework:** Express
*   **Banco de Dados:** MongoDB (via Mongoose)
*   **Armazenamento de Arquivos:** AWS S3
*   **Gerenciamento de Ambiente:** dotenv

## Começando (Getting Started)

Siga as instruções abaixo para executar o backend localmente para desenvolvimento ou testes.

### Pré-requisitos

*   Node.js (versão 18.x ou superior recomendada)
*   npm (ou yarn)
*   MongoDB local ou instância MongoDB Atlas
*   Conta na AWS com acesso ao S3 (e chave de acesso configurada)

### Instalação do Backend

1.  Clone o repositório do backend:
    ```bash
    git clone https://github.com/bug-wave/back-bugwave
    ```
2.  Acesse o diretório do projeto:
    ```bash
    cd back-bugwave
    ```
3.  Instale as dependências:
    ```bash
    npm install
    # ou
    yarn install
    ```

### Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```env
PORT=5000
MONGO_URI=seu_mongodb_uri
AWS_ACCESS_KEY_ID=sua_aws_access_key
AWS_SECRET_ACCESS_KEY=sua_aws_secret_key
AWS_BUCKET_NAME=nome_do_seu_bucket
AWS_REGION=regiao_do_bucket
```

Após instalar as dependências do backend, execute o servidor de desenvolvimento.

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

