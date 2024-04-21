1. Склонируйте репозиторий

```
git clone https://github.com/LorezV/hack-0423.git
```

2. Перейдите на develop
```
git checkout develop
```

3. Установите node 20.5.0
```
nvm install 20.5.0
```

4. Установите зависимости
```
npm i
```
5. Сделайте миграцию
```
npx prisma migrate dev
```

6. Запускайте
```
npm run dev
```