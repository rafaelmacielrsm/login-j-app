# jus-project
## Requerimentos
- `nodejs` - `Necessário`
- Plugin para contonar as restrições dos navegarores em relação a *Cross-Origin Resource Sharing* - CORS - `Necessário`
    * Firefox - CORS - Everywhere ( [link](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/) )
    * Chrome - CORS - Toogle ( [link](https://chrome.google.com/webstore/detail/cors-toggle/jioikioepegflmdnbocfhgmpmopmjkim?hl=en) )
    >    Esse plugin é necessário pois a API não implementa os protocolos da negociação do *preflight* do CORS \([detalhes](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Preflighted_requests)\) , dessa forma as requisições retornarão 'opacas', não permitindo que scripts da página tenham controle efetivo.
* Plugin `React Dev Tools` 
    > Não é necessário, mas ajuda a observar as mutações que estão acontecendo no ReduxStore e o estado da aplicação.

## Executando no Dev Mode

```shell
## Clone o Repositorio
$ git clone https://rafaelsmaciel@bitbucket.org/rafaelsmaciel/jus-project.git
## ou
$ git clone git@bitbucket.org:rafaelsmaciel/jus-project.git

## Acesse o diretorio
$ cd jus-project

## Instale as dependências
$ npm install

## Lance o dev server
$ npm run dev

## Visite a pagina
http://localhost:3000/
```

## Executando no Production Mode

```shell
## Clone o Repositorio
$ git clone https://rafaelsmaciel@bitbucket.org/rafaelsmaciel/jus-project.git
## ou
$ git clone git@bitbucket.org:rafaelsmaciel/jus-project.git

## Acesse o diretorio
$ cd jus-project

## Instale as dependências
$ npm install

## Execute o script de build
$ npm run build

## Inicie o server com a build de produção
$ npm run start

## Visite a pagina
http://localhost:3000/
```



