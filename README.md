# 30COS-Books

A books search Page.

## Preview

*storybook has been deployed using https://github.com/storybookjs/storybook-deployer*

* Storybook: [GO!](https://hsk-kr.github.io/30cos-books/)


## Skills

- React, typescript (CRA) 
- React Query
- styled-components

## Scripts

### Environments Variables

API Provider: https://developers.naver.com/

you have to set these variables before running the app.

```properties
REACT_APP_X_Naver_Client_Id=[Enter your client id]
REACT_APP_X_Naver_Client_Secret=[Enter your client secret]
```

### Run Dev
```properties
npm run start
```

### Run Dev with docker-compose
```properties
docker-compose up
```

### Run Test
```properties
npm run test
```

### Run E2E Test

Before running the command, ensure the localserver is running on http://localhost:3000

```properties
npm run test:e2e
```

or if you don't start the server

```properties
npm run start & npm run test:e2e
```

### Run Test with coverage
```properties
npm run test:coverage
```

### Run Storybook
```properties
npm run storybook
```