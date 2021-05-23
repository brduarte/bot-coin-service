# 🤖 Bot Coin Service 

## ⚒️ Ferramentas Utilizadas 
  - Node.js
  - Express
  - TypeOrm 
  - Mysql

## ✔️ Pré-requisitos 
  - Docker 
  - Docker Composer 

## 🐳  Executando com Docker

1. Rode o comando `docker-compose up --build` e aguarde a inicialização do projeto.
```
$ docker-compose up --build
```
2. Depois que os container terminarem de subir basta acessar http://localhost:3333
![image](https://user-images.githubusercontent.com/29002558/118587645-5a5b7f80-b773-11eb-8d93-42a41e4c7546.png)


## 👨‍💻 Executando Manualmente

1. Clone seu repositório e instale as dependências  

```console
$ git clone https://github.com/brduarte/bot-coin-service.git 
$ cd bot-coin-service
$ yarn install
```

2. Renome o arquivo .env.example para `.env`
```console
$ cp -v .env.example .env
```

3. Execute o banco de dados. Você pode instanciar o banco de dados onde preferir, mas eu deixei uma configuração do **Docker Compose** para subir um banco de dados para você utilizando os parâmetros configurado no arquivo **.env**, basta você executar o comando abaixo.
         
         ⚠️ OBS: Certifique-se que você tenha o Docker e o Docker Compose instalado em seu computador, caso o contrário você pode encontrar o guia de instalação no índice de documentação.

```console
$ docker-compose up server-mysql
```

4. Rode as migrations para construir a estrutura do banco de dados.
```console
$ yarn typeorm migration:run
```

4. Execute o projeto.
```console
$ yarn start 
```

5. Sua API deve estar sendo executada em [http://localhost:3333](http://localhost:3333/).

        ⚠️ OBS: A API será executada na porta parametrizada na variável `APP_PORT` do projeto. 

![image](https://user-images.githubusercontent.com/29002558/118587645-5a5b7f80-b773-11eb-8d93-42a41e4c7546.png)

## 👨🏽‍🏫 Como Utilizar o Projeto
O projeto foi desenvolvido para monitorar e gerar dados do candles da criptomoeda que você cadastrar no sistema.
       
        ⚠️ O exempo mostrado aqui é para gerar um candles de 1 minuto

1. Cadastre um job para a moeda que você deseja monitorar. 
   - Parametros
        - **name**: Nome do JOB
        - **currencyPair**: Par de moeda para monitoramento. É permitido apenas moedas listadas na página da [API Poloniex](https://docs.poloniex.com/#currency-pair-ids)
        - **frequency**: Periodicidade para gerar os dados do candles. Essa informação é setada com valor em minutos

```sh
curl --location -g --request POST '{{URL}}/jobs' \
--data-raw '{
    "name": "JOB_BNB-BTC 1M",
    "currencyPair": "BTC_BTS",
    "frequency":1
}'
```
Assim que os sistema começar a gerar os dados, ele mostrará logs de processamento no terminal
![image](https://user-images.githubusercontent.com/29002558/118678327-4cd5e200-b7d3-11eb-98c8-4f033bfcd8a9.png)

2. Depois que o cadastro for feito e os primeiros dados forem gerados, você pode obter os dados do `candles` através da endpoint abaixo.
```sh
curl --location -g --request GET '{{URL}}/candles?currencyPair=BTC_BTS&frequency=1'
```

3. Caso você queira fazer a consulta através do banco de dados, basta você rodar a query abaixo passando o id do job cadastrado.
```sql
SELECT
jobs.id as job_id,
jobs.name,
currencys.currency_pair,
schedules_jobs.frequency,
candles.open,
candles.low,
candles.high,
candles.close,
candles.created_at
FROM jobs
JOIN candles on jobs.id = candles.job_id
JOIN currencys on jobs.currency_id = currencys.id
JOIN schedules_jobs on jobs.schedule_job_id = schedules_jobs.id
WHERE job_id=:job_id
ORDER BY candles.created_at DESC
```

Você pode ver mais sobre os endpoints na [Documentação da API](https://documenter.getpostman.com/view/5528641/TzRYbPov)

## 🗄️ Diagrama do Banco de Dados

![image](https://user-images.githubusercontent.com/29002558/118680273-f9649380-b7d4-11eb-8f69-3e948810e7a3.png)

## 👨🏿‍🔬 Melhorias 
- [ ] [Paginar Dados do Candles](https://github.com/brduarte/bot-coin-service/issues/5)
- [ ] [Melhorar Gerenciamento de JOBS de Monitoramento de Moedas](https://github.com/brduarte/bot-coin-service/issues/4)
- [ ] [Construir Conexão de WebSocket para Envio de Informações do Candles](https://github.com/brduarte/bot-coin-service/issues/3)
- [ ] [Padronizar Respostas de Erros](https://github.com/brduarte/bot-coin-service/issues/2)

## 📝 Documentação 
- [Documentação da API](https://documenter.getpostman.com/view/5528641/TzRYbPov)
- [Como Instalar o Docker/Docker Compose](https://docs.docker.com/engine/install/)
- [Mysql](https://www.mysql.com/)
- [Node.js](https://nodejs.org/en/docs/)
- [TypeOrm](https://typeorm.io/)
- [Express](https://expressjs.com/pt-br/)

