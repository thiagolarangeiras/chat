
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres

# Configurar o postgres para testar o projeto

## 1 Baixar o postrgres
### Docker
>❗ Baixar o docker antes de tudo  

Baixar uma imagem do postgres
```
docker pull postgres
```

Rodar a imagem
```
docker run --name postgres1 -e POSTGRES_PASSWORD=1234 -d -p 5432:5432 postgres
```
Depois disso é só conectar usando os dados usados:  
server: `localhost:5432/postgres`   
Usuario: `postgres`     
Senha: `1234`       

## 2 Entrar no postgres usando o docker
### Entrar no docker
```
docker exec -it postgres1 bash
```

### Acessar o postgres
```
psql -U postgres
```

## 3 Configurar o postgres
Após conectado e tendo acesso ao servidor sql   
### Criar a database `saluscontrolis`
```sql
CREATE DATABASE saluscontrolis;
```

### Ou apenas mudar o nome no config do java para outra database existente





# Noticias e Comentarios

## como rodar
    
    ./mvnw spring-boot:run

## CURL
[GET] noticias
``` sh 
curl --location 'http://localhost:8080/noticias' 
```

[POST] noticias
``` sh 
curl --location 'http://localhost:8080/noticias' \
--header 'Content-Type: application/json' \
--data '{
    "autor": "1",
    "titulo": "1",
    "texto": "1"
}'
```

[PUT] noticias
``` sh 
curl --location --request PUT 'http://localhost:8080/noticias/1' \
--header 'Content-Type: application/json' \
--data '{
    "autor": "",
    "titulo": "",
    "texto": "",
    "data": "2024-05-10"
}'
```

[DELETE] noticias
``` sh 
curl --location --request DELETE 'http://localhost:8080/noticias/1'
```
<br/>

---

<br/>

[GET] comentarios
``` sh 
curl --location 'http://localhost:8080/noticias/1/comentarios'
```

[POST] comentarios
``` sh 
curl --location 'http://localhost:8080/noticias/1/comentarios' \
--header 'Content-Type: application/json' \
--data '{
    "usuario": "eu",
    "texto": "texto"
}'
```

[PUT] comentarios
``` sh 
curl --location --request PUT 'http://localhost:8080/noticias/1/comentarios/2' \
--header 'Content-Type: application/json' \
--data '{
    "texto": "texto2"
}'
```

[DELETE] comentarios
``` sh 
curl --location --request DELETE 'http://localhost:8080/noticias/1/comentarios/1'
```