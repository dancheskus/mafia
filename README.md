# Веб приложение для ведущего игры `МАФИЯ`
> Это бесплатный софт, для ведущего интеллектуальной (спортивной) мафии, написанный на React.

### В программе есть возможность
- Раздавать места (номерки) за столом
- Назначать роли автоматически и вручную
- Управлять музыкой во время ночной фазы
- Выставлять игроков на голосование
- Проводить голосования и переголосовки
- Регестрировать ночные выстрелы
- Выставлять фолы за нарушения в любой момент игры

### Поддерживаемые языки
- Русский
- Английский

**Адрес проекта** [mafia.dandev.online](https://mafia.dandev.online/)

---

# Web application for the host of the `MAFIA` game
> This is a free software for the host of the game "MAFIA", written in React

### In this app you have options to
- Deal player placement number in the table
- Add player roles manually or deal them randomly
- Controll music during the night phase
- Add players to voting lists
- Conduct voting and re-voting
- Register night shots
- Issue fouls for violations at any time during the game

### Supported languages
- English
- Russian

**Project address** [mafia.dandev.online](https://mafia.dandev.online/)

---
# Setup

## Development
### Option 1 (harder version but recomended)
> `docker` and `docker-compose` should be installed
>
> you have to register URL that can be verified with ACME challenge and is pointing to `localhost`

- `git pull https://github.com/dancheskus/traefik`
- Read how to setup and start `traefik` container in `README.md`
- `git clone https://github.com/dancheskus/mafia.git`
- Rename `.env_example` to `.env` and replace `REACT_APP_DOMAIN` with your URL that is pointing to `localhost`
- Add some mp3 music files to music folder
- `yarn` or `npm i` to install all dependencies
- `yarn start` or `npm start`
> This will start start 2 containers. NGINX container for music server and mafia contaier.
- Open your URL
> Now you can modify local files and changes will be displayed in the browser

### Option 2 (easy version. without docker, music and ssl)
- `git clone https://github.com/dancheskus/mafia.git`
- `yarn` or `npm i` to install all dependencies
- `yarn start:react` or `npm start:react`
- open [http://localhost:3000](http://localhost:3000)

## Production
> `docker` and `docker-compose` should be installed
>
> you have to register URL that can be verified with ACME challenge and is pointing to your server

- `git pull https://github.com/dancheskus/traefik`
- Read how to setup and start `traefik` container in `README.md`
- `git clone https://github.com/dancheskus/mafia.git`
- Rename `.env_example` to `.env` and replace `REACT_APP_DOMAIN` with your URL that is pointing to `localhost`
- Add some mp3 music files to music folder
- `./docker-scripts.sh prod:build` - to rebuild container
- `./docker-scripts.sh prod` - to start container
- `./docker-scripts.sh stop` - to stop container


## Author

**Daniel Shleifman** - [Mafia](https://github.com/dancheskus)