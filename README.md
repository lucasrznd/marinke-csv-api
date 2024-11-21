<h2 align="center">Products CSV Api</h2>

<div align="center">
  
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
</div>

<h2 id="description">📙 Description</h2>

This API is responsible for reading a CSV file containing product data, sent through a request to the endpoint, and persisting the data in a database. It has tests for the endpoints and integrates with SonarQube.

<h2 id="installation">🛠️ Installation</h2>

1. Clone the repository to your local environment:

```
git clone https://github.com/lucasrznd/marinke-csv-api
```

2. Navigate to the project directory:

```
cd marinke-csv-api
```

3. Set up your database credentials on the **src/shared/config/database.ts** file:

```
const config: Options = {
  "username": "user",
  "password": "1234",
  "database": "db_csv",
  "host": "localhost",
  "dialect": "postgres"
}
```
4. Run Jest Tests Coverage:
   
```
npx jest --coverage
```

5. Set up your SonarQube configurations on **sonar-project.properties**:

```
sonar.host.url=http://localhost:9000
sonar.login=${LOGIN_TOKEN}
sonar.projectKey=${PROJECT_KEY}
```

6. Run Sonar:

```
npm run sonar
```

<h2 id="authors">👨🏻‍💻 Author</h2>

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/lucasrznd"><img src="https://avatars.githubusercontent.com/u/101664450?v=4&v=" width="115px;" alt="Lucas Rezende"/><br /><sub><b>Lucas Rezende</b></sub></a><br/><a title="code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Revored0"><img src="https://avatars.githubusercontent.com/u/107728250?v=4&v=" width="115px;" alt="João Revoredo"/><br /><sub><b>João Revoredo</b></sub></a><br/><a title="code">💻</a></td>
  </tbody>
</table>
