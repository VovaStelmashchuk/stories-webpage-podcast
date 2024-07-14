# The web application for AndroidStory podcast

Visit our website at [https://androidstory.dev](https://androidstory.dev)

## Features

- Main page with all episodes and links to Patreon posts
- Episode page with audio player and show notes

#### Admin features

- Add new episodes
- Manage time codes and links with beatufil UX
- Generate show notes based on time codes and links
- Generate RSS

The admin panel is available for auth users at [https://androidstory.dev/login](https://androidstory.dev/login). The
panel was developed for the AndroidStory podcast and may not be suitable for other projects. As an admin you
can add time codes and mention links. The show notes will be generated automatically based on the time codes and links.

Also, the service adds the default link to our Patreon page. (Hand code into codebase)

## Run/Development

The project uses vue and nuxt. Both client and server parts of Nuxt application. The project uses MongoDB and Minio storage. All needed npm commands can be found in the package.json file.

The default app port is 3000. The project uses the .env file for configuration. The .env file should be created in the project's root
directory. The .env file should contain the following variables:

```dotenv
NUXT_DB_URL=
NUXT_MINIO_END_POINT=
NUXT_MINIO_PORT=
NUXT_MINIO_ACCESS_KEY=
NUXT_MINIO_SECRET_KEY=
NUXT_ADMIN_TOKEN=
```

Our CI/CD pipeline is based on GitHub actions. The pipeline is triggered by push to the master branch. The pipeline
builds the docker image and pushes it to the docker hub. The docker image can be found
at [https://hub.docker.com/repository/docker/vovochkastelmashchuk/story-podcast-app](https://hub.docker.com/repository/docker/vovochkastelmashchuk/story-podcast-app)