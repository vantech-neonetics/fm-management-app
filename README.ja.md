<p align="right">
    <a href="./README.md">Chinese</a> | <a href="./README.en.md">English</a> | <strong>Japanese</strong>
</p>

<p align="center">
  <a href="https://github.com/songquanpeng/one-api"><img src="https://raw.githubusercontent.com/songquanpeng/one-api/main/web/default/public/logo.png" width="150" height="150" alt="one-api logo"></a>
</p>

<div align="center">

# One API

_✨ Access to all LLMs through the standard OpenAI API format, easy to integrate and use ✨_

</div>

<p align="center">
  <a href="https://raw.githubusercontent.com/songquanpeng/one-api/main/LICENSE">
    <img src="https://img.shields.io/github/license/songquanpeng/one-api?color=brightgreen" alt="license">
  </a>
  <a href="https://github.com/songquanpeng/one-api/releases/latest">
    <img src="https://img.shields.io/github/v/release/songquanpeng/one-api?color=brightgreen&include_prereleases" alt="release">
  </a>
  <a href="https://hub.docker.com/repository/docker/justsong/one-api">
    <img src="https://img.shields.io/docker/pulls/justsong/one-api?color=brightgreen" alt="docker pull">
  </a>
  <a href="https://github.com/songquanpeng/one-api/releases/latest">
    <img src="https://img.shields.io/github/downloads/songquanpeng/one-api/total?color=brightgreen&include_prereleases" alt="release">
  </a>
  <a href="https://goreportcard.com/report/github.com/songquanpeng/one-api">
    <img src="https://goreportcard.com/badge/github.com/songquanpeng/one-api" alt="GoReportCard">
  </a>
</p>

<p align="center">
  <a href="#deployment">Deployment Tutorial</a>
  ·
  <a href="#usage">Usage</a>
  ·
  <a href="https://github.com/songquanpeng/one-api/issues">Feedback</a>
  ·
  <a href="#screenshots">Screenshots</a>
  ·
  <a href="https://openai.justsong.cn/">Live Demo</a>
  ·
  <a href="#faq">FAQ</a>
  ·
  <a href="#related-projects">Related Projects</a>
  ·
  <a href="https://iamazing.cn/page/reward">Donate</a>
</p>

> **Warning**: This README has been translated by ChatGPT. If you find any translation errors, feel free to submit a PR.

> **Warning**: The English version of the Docker image is `justsong/one-api-en`.> **Note**: The latest image pulled from Docker may be an `alpha` release. If stability is required, please specify the version manually.

## Features
1. Supports multiple large models:
   + [x] [OpenAI ChatGPT series models](https://platform.openai.com/docs/guides/gpt/chat-completions-api) (supports [Azure OpenAI API](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference))
   + [x] [Anthropic Claude series models](https://anthropic.com)
   + [x] [Google PaLM2/Gemini series models](https://developers.generativeai.google)
   + [x] [Baidu Wenxin Yiyuan series models](https://cloud.baidu.com/doc/WENXINWORKSHOP/index.html)
   + [x] [Alibaba Tongyi Qianwen series models](https://help.aliyun.com/document_detail/2400395.html)
   + [x] [Zhipu ChatGLM series models](https://bigmodel.cn)
2. Supports access to multiple channels through **load balancing**.
3. Compatible with **stream mode** enabling typewriter-like effects through stream transmission.
4. Supports **multi-machine deployment**. Refer to [details here](#multi-machine-deployment).
5. Supports **token management** allowing setting expiration and usage limits for tokens.
6. Supports **voucher management** allowing bulk generation and export of vouchers which can be used to refill account balance.
7. Supports **channel management** enabling bulk creation of channels.
8. Supports **user groups** and **channel groups** for setting different rates per group.
9. Supports channel **model list settings**.
10. Supports **detailed quota checks**.
11. Supports **user invitation rewards**.
12. Ability to display balance in US dollars.
13. Supports announcements for new users, recharge link settings, and initial balance settings.
14. Offers extensive **customization** options:
    1. Customization of system name, logo, and footer.
    2. Supports customization of homepage and about page using HTML and Markdown code, or embedding standalone web pages via iframes.
15. Supports management API access via system access tokens.
16. Compatible with user authentication via Cloudflare Turnstile.
17. Supports user management and multiple user login/registration methods:
    + Login/registration and password reset via email.
    + [GitHub OAuth](https://github.com/settings/applications/new).
    + Authentication through WeChat official account (requires additional installation of [WeChat Server](https://github.com/songquanpeng/wechat-server)).
18. Will promptly support and encapsulate other major model APIs when they become available.

## Deployment
### Docker Deployment
Deployment command: `docker run --name one-api -d --restart always -p 3000:3000 -e TZ=Asia/Shanghai -v /home/ubuntu/data/one-api:/data justsong/one-api-en`.

Update command: `docker run --rm -v /var/run/docker.sock:/var/run/docker.sock containrr/watchtower -cR`.

The first `3000` in `-p 3000:3000` is the host port and can be changed as needed.Data will be saved in the `/home/ubuntu/data/one-api` directory on the host. Make sure this directory exists with write permissions, or change it to an appropriate directory.

Nginx Reference Configuration:
```
server {
    server_name openai.justsong.cn;  # Change the domain name as needed

    location / {
        client_max_body_size 64m;
        proxy_http_version 1.1;
        proxy_pass http://localhost:3000;  # Change the port accordingly
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header Accept-Encoding gzip;
        proxy_read_timeout 300s;  # GPT-4 requires longer timeouts
    }
}
```

Next, set up HTTPS using Let's Encrypt certbot:
```bash
# Install certbot on Ubuntu:
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
# Generate certificate and update Nginx configuration
sudo certbot --nginx
# Follow the prompts
# Restart Nginx
sudo service nginx restart
```

The initial account username is `root` and the password is `123456`.

### Manual Deployment
1. Download the executable from [GitHub Releases](https://github.com/songquanpeng/one-api/releases/latest) or compile from the source:
   ```shell
   git clone https://github.com/songquanpeng/one-api.git

   # Frontend build
   cd one-api/web/default
   npm install
   npm run build

   # Backend build
   cd ../..
   go mod download
   go build -ldflags "-s -w" -o one-api
   ```
2. Execute:
   ```shell
   chmod u+x one-api
   ./one-api --port 3000 --log-dir ./logs
   ```
3. Access [http://localhost:3000/](http://localhost:3000/) and login. The initial account username is `root` and the password is `123456`.

For a more detailed deployment tutorial, please refer to [this page](https://iamazing.cn/page/how-to-deploy-a-website).

### Multi-Machine Deployment
1. Set the same `SESSION_SECRET` on all servers.
2. Configure `SQL_DSN` to use MySQL instead of SQLite. All servers will connect to the same database.
3. Set `NODE_TYPE` to `slave` on nodes other than the master node.
4. Configure `SYNC_FREQUENCY` on the server syncing settings periodically from the database.
5. Optionally, set `FRONTEND_BASE_URL` on non-master nodes to redirect page requests to the master server.
6. Install Redis on non-master nodes separately and set `REDIS_CONN_STRING` to enable zero-latency access to the database when cache expires.7. If the access to the database becomes high latency even on the main server, enable Redis and set `SYNC_FREQUENCY` to periodically synchronize settings from the database.

Please refer to the [environment variables](#environment-variables) section for details on using environment variables.

### Deployment to the control panel (e.g. Baota)
For detailed steps, please refer to [#175](https://github.com/songquanpeng/one-api/issues/175).

If a blank page appears after deployment, please refer to [#97](https://github.com/songquanpeng/one-api/issues/97).

### Deployment to third-party platforms
<details>
<summary><strong>Deploying to Sealos</strong></summary>
<div>

> Sealos supports high concurrency, dynamic scaling, and stable operation for millions of users.

> Click the button below to deploy with a single click. 👇

[![](https://raw.githubusercontent.com/labring-actions/templates/main/Deploy-on-Sealos.svg)](https://cloud.sealos.io/?openapp=system-fastdeploy?templateName=one-api)

</div>
</details>

<details>
<summary><strong>Deploying to Zeabur</strong></summary>
<div>

> As Zeabur's servers are located overseas, network issues are automatically resolved.

[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/7Q0KO3)

1. Fork the code first.
2. Access [Zeabur](https://zeabur.com?referralCode=songquanpeng), log in, and enter the console.
3. Create a new project. Select Marketplace under Service -> Add Service, choose MySQL, and make note of connection parameters (username, password, address, port).
4. Copy the connection parameters and execute ```create database `one-api` ``` to create the database.
5. Next, select Git under Service -> Add Service (authentication is required for the first use) and choose the forked repository.
6. Automatic deployment will start, but please cancel it. Add `PORT` as `3000` and `SQL_DSN` as `<username>:<password>@tcp(<addr>:<port>)/one-api` in the Variable tab. Save changes. Be aware that if `SQL_DSN` is not set, data will not persist and will be lost after redeployment.
7. Choose redeploy.
8. In the Domains tab, select a suitable prefix for the domain name, such as "my-one-api." The final domain name will be "my-one-api.zeabur.app". You can also CNAME your own domain name.
9. Wait for deployment to complete, click on the generated domain name, and access One API.

</div>
</details>

## Configuration
The system is ready to use right out of the box.

By setting environment variables and command-line parameters, you can configure the system.

After starting the system, log in as the `root` user and further configure the system.

## Instructions
Add an API Key on the `Channels` page and add an access token on the `Tokens` page.Access to the One API can be made using an access token. The usage is the same as the [OpenAI API](https://platform.openai.com/docs/api-reference/introduction).

In places where the OpenAI API is used, do not forget to set the deployment address of the One API to the API Base (e.g., `https://openai.justsong.cn`). The API Key must be a token generated in the One API.

Please note that the specific format of the API Base depends on the client being used.

```mermaid
graph LR
    A(User)
    A --->|Request| B(One API)
    B -->|Relay Request| C(OpenAI)
    B -->|Relay Request| D(Azure)
    B -->|Relay Request| E(Other downstream channels)
```

To specify which channel to use for the current request, add the channel ID after the token: for example, `Authorization: Bearer ONE_API_KEY-CHANNEL_ID`.
Please note that the token must be created by an administrator to specify the channel ID.

If no channel ID is specified, the request will be distributed to multiple channels through load balancing.

### Environment Variables
1. `REDIS_CONN_STRING`: When set, Redis is used for rate-limiting storage instead of memory.
    + Example: `REDIS_CONN_STRING=redis://default:redispw@localhost:49153`
2. `SESSION_SECRET`: When set, a fixed session key is used to ensure that login user cookies remain valid even after system restart.
    + Example: `SESSION_SECRET=random_string`
3. `SQL_DSN`: When set, a specified database is used instead of SQLite. Please use MySQL version 8.0.
    + Example: `SQL_DSN=root:123456@tcp(localhost:3306)/oneapi`
4. `LOG_SQL_DSN`: When set, a separate database is used for the `logs` table. Please use MySQL or PostgreSQL.
5. `FRONTEND_BASE_URL`: When set, the specified frontend address is used instead of the backend address.
    + Example: `FRONTEND_BASE_URL=https://openai.justsong.cn`
6. `SYNC_FREQUENCY`: When set, the system synchronizes the configuration from the database periodically in seconds. If not set, synchronization does not occur.
    + Example: `SYNC_FREQUENCY=60`
7. `NODE_TYPE`: When set, specifies the node type as `master` or `slave`. If not set, the default is `master`.
    + Example: `NODE_TYPE=slave`
8. `CHANNEL_UPDATE_FREQUENCY`: When set, periodically updates the channel balance in minutes. If not set, no updates are made.
    + Example: `CHANNEL_UPDATE_FREQUENCY=1440`
9. `CHANNEL_TEST_FREQUENCY`: When set, periodically tests the channel. If not set, no tests are performed.
    + Example: `CHANNEL_TEST_FREQUENCY=1440`
10. `POLLING_INTERVAL`: Time interval (in seconds) between requests when updating channel balance and testing channel availability. Default is no interval.
    + Example: `POLLING_INTERVAL=5`

### Command Line Parameters
1. `--port <port_number>`: Specifies the port number on which the server listens. Default is `3000`.
    + Example: `--port 3000`## Instructions
2. `--log-dir <log_dir>`: Specify the log directory. If not set, logs will not be saved.
    + Example: `--log-dir ./logs`
3. `--version`: Display the version number of the system and exit.
4. `--help`: Display usage help for the command and explain parameters.

## Screenshots
![channel](https://user-images.githubusercontent.com/39998050/233837954-ae6683aa-5c4f-429f-a949-6645a83c9490.png)
![token](https://user-images.githubusercontent.com/39998050/233837971-dab488b7-6d96-43af-b640-a168e8d1c9bf.png)

## FAQ
1. What is quota? How is it calculated? Are there any quota calculation issues in One API?
    + Quota = Group Multiplier * Model Multiplier * (Prompt Token Count + Complete Token Count * Completion Multiplier)
    + The completion multiplier is fixed at 1.33 for GPT3.5 and 2 for GPT4 to match the official definition.
    + In non-streaming mode, the official API returns the total number of tokens consumed. However, be aware that prompt and complete consumption multipliers are different.
2. Despite having sufficient account balance, why does it show "insufficient quota"?
    + Please check if the token quota is sufficient. Token quota is separate from the account balance.
    + Token quota is for setting maximum usage and can be freely adjusted by the user.
3. When trying to use a channel, it shows "No available channels". What should I do?
    + Please verify the settings of the user and channel groups.
    + Also check the channel model settings.
4. Channel test reports error: "invalid character '<' looking for beginning of value"
    + This error occurs when the returned value is not valid JSON but an HTML page.
    + In most cases, the IP of the deployment site or proxy node is being blocked by CloudFlare.
5. Error on ChatGPT Next Web: "Failed to fetch"
    + Do not forget to set `BASE_URL` during deployment.
    + Double-check if the interface address and API Key are correct.

## Related Projects
[FastGPT](https://github.com/labring/FastGPT): Knowledge question answering system based on LLM

## Note
This project is an open-source project. Please comply with OpenAI's [terms of use](https://openai.com/policies/terms-of-use) and **applicable laws**. Kindly refrain from using it for illegal purposes.

This project is published under the MIT license. Accordingly, attribution and a link to this project must be included at the bottom of the page.

The same applies to derivative projects based on this project.

If you do not wish to include attribution, you must obtain permission in advance.

As per the MIT license, the risk and responsibility of using this project fall on the user, and the developers of this open-source project are not liable.