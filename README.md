# Bit Bot Service

- Query para buscar dados de um candles de um determinado JOB

```
SELECT
jobs.name,
currencys.currency_pair,
schedules_jobs.frequency,
candles.open,
candles.low,
candles.high,
candles.close
FROM jobs
JOIN candles on jobs.id = candles.job_id
JOIN currencys on jobs.currency_id = currencys.id
JOIN schedules_jobs on jobs.schedule_job_id = schedules_jobs.id
WHERE job_id=:job_id
```