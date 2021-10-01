# url-shortener

A tiny utility to short long URLs

## Installation

**Requirements**

-   Node.js (min. LTS)
-   npm
-   Git

### Installation

We only provide a Docker image for installation. Make sure you are familiar with Docker.

**Docker**

When you already have an existing Database, you can use the Dockerfile/Image to create a new container.

You can pull the prebuild image from Docker Hub

```bash
docker pull ledbrain/url-shortener
```

**Docker Compose**

To use the compose file, clone the repo, configure the `docker-compose.yml` and then do:

```bash
docker-compose up -d
```

To stop it, use

```bash
docker-compose down
```

## API Documentation

See in [API.md](API.md)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/naton0"><img src="https://avatars.githubusercontent.com/u/33197199?v=4?s=100" width="100px;" alt=""/><br /><sub><b>naton</b></sub></a><br /><a href="#platform-naton0" title="Packaging/porting to new platform">📦</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
