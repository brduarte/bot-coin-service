# Bot Coin Service 🤖

## ⚒️ Ferramentas Utilizadas 
  
  - Node.js
  - Express
  - TypeOrm 
  - Mysql

## Executando Com Docker 

## 👨‍💻 Executando Manualmente

Assegure-se de ter [Node.js](http://nodejs.org/) instalado

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

4. Rode as migrations para construir a estrutura do banco de dados
```console
$ yarn typeorm migration:run
```

4. Execute o projeto.
```console
$ yarn start 
```

5. Sua API deve estar sendo executada em [http://localhost:3333](http://localhost:3333/).

        ⚠️ OBS: A API será executada na porta parametrizada na variável `APP_PORT` do projeto. 

![image](https://user-images.githubusercontent.com/29002558/112572587-3873fb00-8dc9-11eb-9312-18d29fc82591.png)

## 📝 Documentação 
- [Documentação da API](https://documenter.getpostman.com/view/5528641/TzCHAqDw)
- [Como Instalar o Docker/Docker Compose](https://docs.docker.com/engine/install/)
- [Mocha](https://mochajs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/en/docs/)
- [Express](https://expressjs.com/pt-br/)

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
