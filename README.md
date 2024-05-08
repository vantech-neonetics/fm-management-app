- [中文](./README.en.md) | [English](./README.en.md) | [日本語](./README.ja.md)

# One API

_✨ Access all the large models via standard OpenAI API format, plug and play. ✨_

[License](https://raw.githubusercontent.com/songquanpeng/one-api/main/LICENSE) ![license](https://img.shields.io/github/license/songquanpeng/one-api?color=brightgreen) [Latest Release](https://github.com/songquanpeng/one-api/releases/latest) ![release](https://img.shields.io/github/v/release/songquanpeng/one-api?color=brightgreen&include_prereleases) [Docker Pulls](https://hub.docker.com/repository/docker/justsong/one-api) ![docker pull](https://img.shields.io/docker/pulls/justsong/one-api?color=brightgreen) [Downloads](https://github.com/songquanpeng/one-api/releases/latest) ![release](https://img.shields.io/github/downloads/songquanpeng/one-api/total?color=brightgreen&include_prereleases) [GoReportCard](https://goreportcard.com/report/github.com/songquanpeng/one-api) ![GoReportCard](https://goreportcard.com/badge/github.com/songquanpeng/one-api)

[Tutorial](https://github.com/songquanpeng/one-api#deployment) · [Usage](https://github.com/songquanpeng/one-api#usage) · [Feedback](https://github.com/songquanpeng/one-api/issues) · [Screenshots](https://github.com/songquanpeng/one-api#screenshot-display) · [Online Demo](https://openai.justsong.cn/) · [FAQ](https://github.com/songquanpeng/one-api#frequently-asked-questions) · [Related Projects](https://github.com/songquanpeng/one-api#related-projects) · [Support and Appreciation](https://iamazing.cn/page/reward)> This project is an open-source project, and users must use it in compliance with OpenAI's [Terms of Use](https://openai.com/policies/terms-of-use) and **laws and regulations**, and must not be used for illegal purposes.

> In accordance with the requirements of the [Interim Measures for the Administration of Generative Artificial Intelligence Services](http://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm), please do not provide any unregistered generative artificial intelligence services to the public in China.

> [!WARNING]
> The latest image pulled using Docker may be the `alpha` version. If stability is preferred, please manually specify the version.

> [!WARNING]
> When logging in to the system for the first time as the root user, be sure to change the default password `123456`!

## Features
1. Support for various large models:
   + [x] [OpenAI ChatGPT series models](https://platform.openai.com/docs/guides/gpt/chat-completions-api) (supports [Azure OpenAI API](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference))
   + [x] [Anthropic Claude series models](https://anthropic.com) (supports AWS Claude)
   + [x] [Google PaLM2/Gemini series models](https://developers.generativeai.google)
   + [x] [Mistral series models](https://mistral.ai/)
   + [x] [Baidu Wenxin Yiyuan series models](https://cloud.baidu.com/doc/WENXINWORKSHOP/index.html)
   + [x] [Alibaba Tongyi Qianwen series models](https://help.aliyun.com/document_detail/2400395.html)
   + [x] [Xunfei Xinghuo Cognitive Large models](https://www.xfyun.cn/doc/spark/Web.html)
   + [x] [Zhipu ChatGLM series models](https://bigmodel.cn)
   + [x] [360 Brain of Intelligence](https://ai.360.cn)
   + [x] [Tencent Hunyuan Large models](https://cloud.tencent.com/document/product/1729)
   + [x] [Moonshot AI](https://platform.moonshot.cn/)
   + [x] [Baichuan Large models](https://platform.baichuan-ai.com)
   + [ ] [Byte Yunque Large models](https://www.volcengine.com/product/ark) (WIP)
   + [x] [MINIMAX](https://api.minimax.chat/)
   + [x] [Groq](https://wow.groq.com/)
   + [x] [Ollama](https://github.com/ollama/ollama)
   + [x] [Zero One Everything](https://platform.lingyiwanwu.com/)
   + [x] [Stepfun Star Jump](https://platform.stepfun.com/)
   + [x] [Coze](https://www.coze.com/)
   + [x] [Cohere](https://cohere.com/)
   + [x] [DeepSeek](https://www.deepseek.com/)
   + [x] [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/)
   + [x] [DeepL](https://www.deepl.com/)
   + [x] [together.ai](https://www.together.ai/)
2. Support for configuring images and numerous [third-party proxy services](https://iamazing.cn/page/openai-api-third-party-services).
3. Support accessing multiple channels through **load balancing**.
4. Support **stream mode**, achieving typewriter effects through streaming.
5. Support **multi-machine deployment**, [see here](#multi-machine-deployment).
6. Support **token management**, setting token expiration time, limit, allowed IP range, and permitted model access.7. Support **Exchange Code Management**, support batch generation and export of exchange codes, and can use exchange codes to recharge accounts.
8. Support **Channel Management**, batch creation of channels.
9. Support **User Groups** and **Channel Groups**, support setting different rates for different groups.
10. Support channel **model list setting**.
11. Support **viewing quota details**.
12. Support **user invitation rewards**.
13. Support displaying quotas in US dollars.
14. Support publishing announcements, setting recharge links, and setting initial quotas for new users.
15. Support model mapping, redirecting user's request models; if unnecessary, please do not set it, as setting it will cause the request body to be reconstructed rather than directly passed through, which may result in some fields that are not officially supported yet not being successfully transmitted.
16. Support automatic retry on failure.
17. Support drawing interface.
18. Support [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/providers/openai/), for the proxy part of channel settings, fill in `https://gateway.ai.cloudflare.com/v1/ACCOUNT_TAG/GATEWAY/openai`.
19. Support rich **custom** settings,
    1. Support custom system name, logo, and footer.
    2. Support custom homepage and about page, you can choose to use HTML & Markdown code for customization, or embed a separate webpage through iframe.
20. Support calling management API through system access tokens, thereby **extending and customizing** the functionality of One API without the need for secondary development, for details refer to the [API documentation](./docs/API.md) here.
21. Support Cloudflare Turnstile user verification.
22. Support user management, support **multiple user login and registration methods**:
    + Email login and registration (support registration email whitelist) and password reset via email.
    + Support authorization login using Feishu.
    + [GitHub open authorization](https://github.com/settings/applications/new).
    + WeChat official account authorization (requires additional deployment of [WeChat Server](https://github.com/songquanpeng/wechat-server)).
23. Support theme switching, set the environment variable `THEME` to `default` by default, welcome more themes through PR, for specific details refer to [here](./web/README.md).
24. In conjunction with [Message Pusher](https://github.com/songquanpeng/message-pusher), alarm information can be pushed to various apps.

## Deployment
### Deployment based on Docker
```shell
# Deployment command using SQLite:
docker run --name one-api -d --restart always -p 3000:3000 -e TZ=Asia/Shanghai -v /home/ubuntu/data/one-api:/data justsong/one-api
# Deployment command using MySQL, add `-e SQL_DSN="root:123456@tcp(localhost:3306)/oneapi"` based on the above, please modify the database connection parameters by yourself, if you are unsure how to modify, please refer to the environment variables section below.
# For example:
docker run --name one-api -d --restart always -p 3000:3000 -e SQL_DSN="root:123456@tcp(localhost:3306)/oneapi" -e TZ=Asia/Shanghai -v /home/ubuntu/data/one-api:/data justsong/one-api
```

In `-p 3000:3000`, the first `3000` is the port of the host machine, which can be modified as needed.

Data and logs will be saved in the `/home/ubuntu/data/one-api` directory on the host machine. Make sure this directory exists and has write permissions, or change it to a suitable directory.

If the startup fails, add `--privileged=true`, for more details please refer to https://github.com/songquanpeng/one-api/issues/482.

If the above image cannot be pulled, you can try using GitHub's Docker image, replace `justsong/one-api` with `ghcr.io/songquanpeng/one-api`.

If you have high concurrency, **be sure** to set `SQL_DSN`, see below for [environment variables](#environment-variables).## Update command: `docker run --rm -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower -cR`

Reference configuration for Nginx:
```
server{
   server_name openai.justsong.cn;  # Please modify your domain name according to the actual situation
   
   location / {
          client_max_body_size  64m;
          proxy_http_version 1.1;
          proxy_pass http://localhost:3000;  # Please modify your port according to the actual situation
          proxy_set_header Host $host;
          proxy_set_header X-Forwarded-For $remote_addr;
          proxy_cache_bypass $http_upgrade;
          proxy_set_header Accept-Encoding gzip;
          proxy_read_timeout 300s;  # GPT-4 requires a longer timeout, please adjust it yourself
   }
}
```

Then use Let's Encrypt certbot to configure HTTPS:
```bash
# Install certbot on Ubuntu:
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
# Generate certificate & modify Nginx configuration
sudo certbot --nginx
# Follow the instructions
# Restart Nginx
sudo service nginx restart
```

The initial account username is `root`, and the password is `123456`.

### Deployment based on Docker Compose

> Only the startup method is different, the parameter settings remain the same, please refer to the Docker deployment section

```shell
# Currently supports starting MySQL, with data stored in the ./data/mysql folder
docker-compose up -d

# Check deployment status
docker-compose ps
```

### Manual deployment
1. Download the executable file from [GitHub Releases](https://github.com/songquanpeng/one-api/releases/latest) or compile from the source code:
   ```shell
   git clone https://github.com/songquanpeng/one-api.git
   
   # Build the frontend
   cd one-api/web/default
   npm install
   npm run build
   
   # Build the backend
   cd ../..
   go mod download
   go build -ldflags "-s -w" -o one-api
   ````
2. Run:
   ```shell
   chmod u+x one-api
   ./one-api --port 3000 --log-dir ./logs
   ```
3. Access [http://localhost:3000/](http://localhost:3000/) and log in. The initial account username is `root`, and the password is `123456`.

For a more detailed deployment tutorial [see here](https://iamazing.cn/page/how-to-deploy-a-website).

### Multi-server deployment
1. Set the same value for `SESSION_SECRET` on all servers.
2. `SQL_DSN` must be set, use a MySQL database instead of SQLite, and all servers connect to the same database.
3. All slave servers must set `NODE_TYPE` to `slave`, if not set, it defaults to the master server.
4. After setting `SYNC_FREQUENCY`, servers will periodically synchronize configurations from the database. When using a remote database, it is recommended to set this item and enable Redis, regardless of master or slave.
5. Slave servers can choose to set `FRONTEND_BASE_URL` to redirect page requests to the main server.
6. Install Redis separately on slave servers and set `REDIS_CONN_STRING` to achieve zero database access when the cache has not expired, reducing latency.
7. If the main server also experiences high database access latency, enable Redis and set `SYNC_FREQUENCY` to periodically synchronize configurations from the database.- Specific usage of environment variables can be found [here](#Environment-Variables).

### Baota Deployment Tutorial

See [#175](https://github.com/songquanpeng/one-api/issues/175) for details.

If a blank page appears after deployment, refer to [#97](https://github.com/songquanpeng/one-api/issues/97) for more information.

### Deploying Third-Party Services with One API
> Welcome PR to add more examples.

#### ChatGPT Next Web
Project homepage: https://github.com/Yidadaa/ChatGPT-Next-Web

```bash
docker run --name chat-next-web -d -p 3001:3000 yidadaa/chatgpt-next-web
```

Remember to modify the port number, then set the interface address (e.g., https://openai.justsong.cn/) and API Key on the page.

#### ChatGPT Web
Project homepage: https://github.com/Chanzhaoyu/chatgpt-web

```bash
docker run --name chatgpt-web -d -p 3002:3002 -e OPENAI_API_BASE_URL=https://openai.justsong.cn -e OPENAI_API_KEY=sk-xxx chenzhaoyu94/chatgpt-web
```

Remember to modify the port number, `OPENAI_API_BASE_URL`, and `OPENAI_API_KEY`.

#### QChatGPT - QQ Bot
Project homepage: https://github.com/RockChinQ/QChatGPT

After completing the deployment according to the documentation, set the configuration item `reverse_proxy` of `openai_config` in `config.py` to the backend address of One API, set `api_key` to the key generated by One API, and set the `model` parameter in `completion_api_params` of the configuration item to the model name supported by One API.

You can install the [Switcher plugin](https://github.com/RockChinQ/Switcher) to switch the model used at runtime.

### Deployment to Third-Party Platforms

<details>
<summary><strong>Deploy to Sealos </strong></summary>
<div>

> Sealos' server is located overseas, no additional handling of network issues is required, and it supports high concurrency & dynamic scaling.

Click the button below for one-click deployment (wait 3-5 minutes if you encounter a 404 error after deployment):

[![Deploy-on-Sealos.svg](https://raw.githubusercontent.com/labring-actions/templates/main/Deploy-on-Sealos.svg)](https://cloud.sealos.io/?openapp=system-fastdeploy?templateName=one-api)

</div>
</details>

<details>
<summary><strong>Deploy to Zeabur</strong></summary>
<div>

> Zeabur's server is located overseas, automatically solves network issues, and the free quota is also sufficient for personal use.

[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/7Q0KO3)

1. First, fork a copy of the code.
2. Go to [Zeabur](https://zeabur.com?referralCode=songquanpeng), log in, and enter the console.
3. Create a new project, in Service -> Add Service, select Marketplace, choose MySQL, and make a note of the connection parameters (username, password, address, port).
4. Copy the connection parameters and run ```create database `one-api` ``` to create the database.
5. Then in Service -> Add Service, select Git (authorization is required for the first use), choose the repository you forked.
6. Deployment will start automatically, cancel it first. Go to Variable below, add a `PORT` with a value of `3000`, then add a `SQL_DSN` with a value of `<username>:<password>@tcp(<addr>:<port>)/one-api`, and save it. Note that if you do not fill in `SQL_DSN`, the data will not be persisted, and the data will be lost after redeployment.".7. Select Redeploy.
8. Go to the Domains section below and choose a suitable domain prefix, such as "my-one-api". The final domain will be "my-one-api.zeabur.app", or you can CNAME your own domain.
9. Wait for the deployment to complete and click on the generated domain to access One API.

## Deployment on Render

> Render provides free quotas, which can be further increased after card verification.

Render can directly deploy Docker images without the need to fork the repository: [https://dashboard.render.com](https://dashboard.render.com)

## Configuration
The system is ready to use out of the box.

You can configure the system by setting environment variables or command-line parameters.

Once the system has started, log in to the system as the `root` user to perform further configurations.

**Note**: If you are unsure about the meaning of a specific configuration item, you can temporarily remove the value to see further explanatory text.

## Usage
Add your API Key in the `Channels` page, then add an access token in the `Tokens` page.

You can now use your token to access One API, following the same usage as the [OpenAI API](https://platform.openai.com/docs/api-reference/introduction).

You need to set the API Base to the deployment address of your One API in all places where the OpenAI API is used, for example: `https://openai.justsong.cn`, and the API Key will be the token generated in One API.

Please note that the specific format of the API Base depends on the client you are using.

For example, in the OpenAI official library:
```bash
OPENAI_API_KEY="sk-xxxxxx"
OPENAI_API_BASE="https://<HOST>:<PORT>/v1" 
```

```mermaid
graph LR
    A(User)
    A --->|Make requests using the key distributed by One API| B(One API)
    B -->|Relay request| C(OpenAI)
    B -->|Relay request| D(Azure)
    B -->|Relay request| E(Other downstream channels compatible with OpenAI API format)
    B -->|Relay request and modify request body and response| F(Channels not compatible with OpenAI API format)
```

You can specify which channel to use for the request by appending the channel ID to the token, for example: `Authorization: Bearer ONE_API_KEY-CHANNEL_ID`.
Note that only tokens created by admin users can specify the channel ID.

If not specified, a load balancing mechanism will be used across multiple channels.

### Environment Variables
1. `REDIS_CONN_STRING`: If set, Redis will be used as a cache.
   + Example: `REDIS_CONN_STRING=redis://default:redispw@localhost:49153`
   + If database access latency is low, there is no need to enable Redis, as enabling it may cause data lag issues.
2. `SESSION_SECRET`: If set, a fixed session key will be used so that cookies for logged-in users remain valid even after the system restarts.
   + Example: `SESSION_SECRET=random_string`
3. `SQL_DSN`: If set, a specified database other than SQLite will be used. Please use MySQL or PostgreSQL.
   + Examples:
     + MySQL: `SQL_DSN=root:123456@tcp(localhost:3306)/oneapi`
     + PostgreSQL: `SQL_DSN=postgres://postgres:123456@localhost:5432/oneapi` (adapting, feedback welcome)
   + Make sure to create the database `oneapi` in advance; tables will be created automatically by the program.
   + If using a local database: add `--network="host"` to the deployment command to allow the program inside the container to access the MySQL on the host machine.
   + If using a cloud database: if the cloud server requires authentication, add `?tls=skip-verify` to the connection parameters.
   + Modify the following parameters (or keep the default values) according to your database configuration:
     + `SQL_MAX_IDLE_CONNS`: Max number of idle connections, default is `100`.
     + `SQL_MAX_OPEN_CONNS`: Max number of open connections, default is `1000`.+ If you encounter `Error 1040: Too many connections`, please reduce the value appropriately.
   + `SQL_CONN_MAX_LIFETIME`: The maximum lifetime of connections, default is `60` minutes.
4. `LOG_SQL_DSN`: After setting this, the `logs` table will use a separate database, please use MySQL or PostgreSQL.
5. `FRONTEND_BASE_URL`: After setting this, page requests will be redirected to the specified address, only accessible from the server.
   + Example: `FRONTEND_BASE_URL=https://openai.justsong.cn`
6. `MEMORY_CACHE_ENABLED`: Enable memory caching, which may introduce some delay in user quota updates, optional values are `true` and `false`, defaults to `false` if not set.
   + Example: `MEMORY_CACHE_ENABLED=true`
7. `SYNC_FREQUENCY`: The frequency of synchronizing configurations with the database when caching is enabled, in seconds, default is `600` seconds.
   + Example: `SYNC_FREQUENCY=60`
8. `NODE_TYPE`: After setting this, it specifies the node type, optional values are `master` and `slave`, defaults to `master` if not set.
   + Example: `NODE_TYPE=slave`
9. `CHANNEL_UPDATE_FREQUENCY`: After setting this, channel balances will be updated periodically, in minutes, no updates if not set.
   + Example: `CHANNEL_UPDATE_FREQUENCY=1440`
10. `CHANNEL_TEST_FREQUENCY`: After setting this, channels will be checked periodically, in minutes, no checks if not set.
   + Example: `CHANNEL_TEST_FREQUENCY=1440`
11. `POLLING_INTERVAL`: The interval between requests when bulk updating channel balances and testing availability, in seconds, no interval by default.
   + Example: `POLLING_INTERVAL=5
12. `BATCH_UPDATE_ENABLED`: Enable database bulk updates aggregation, may introduce some delay in user quota updates, optional values are `true` and `false`, defaults to `false` if not set.
   + Example: `BATCH_UPDATE_ENABLED=true`
   + If you encounter issues with excessive database connections, you can try enabling this option.
13. `BATCH_UPDATE_INTERVAL=5`: The time interval for bulk updates aggregation, in seconds, default is `5`.
   + Example: `BATCH_UPDATE_INTERVAL=5`
14. Request rate limits:
   + `GLOBAL_API_RATE_LIMIT`: Global API rate limit (excluding relay requests), maximum number of requests from a single IP within three minutes, default is `180`.
   + `GLOBAL_WEB_RATE_LIMIT`: Global Web rate limit, maximum number of requests from a single IP within three minutes, default is `60`.
15. Encoder cache settings:
   + `TIKTOKEN_CACHE_DIR`: By default, the program will download encoding data for common tokens like `gpt-3.5-turbo` when starting up. In unstable network environments or offline situations, issues may arise, configuring this directory can cache data for offline use.
   + `DATA_GYM_CACHE_DIR`: Currently this configuration serves the same purpose as `TIKTOKEN_CACHE_DIR`, but with lower priority.
16. `RELAY_TIMEOUT`: Relay timeout settings, in seconds, no timeout set by default.
17. `SQLITE_BUSY_TIMEOUT`: SQLite lock wait timeout setting, in milliseconds, default is `3000`.
18. `GEMINI_SAFETY_SETTING`: Gemini's security setting, default is `BLOCK_NONE`.
19. `GEMINI_VERSION`: The Gemini version used by the One API, default is `v1`.
20. `THEME`: System theme setting, default is `default`, specific optional values can be found [here](./web/README.md).
21. `ENABLE_METRIC`: Whether to disable channels based on request success rate, not enabled by default, optional values are `true` and `false`.
22. `METRIC_QUEUE_SIZE`: Request success rate statistics queue size, default is `10`.
23. `METRIC_SUCCESS_RATE_THRESHOLD`: Request success rate threshold, default is `0.8`.
24. `INITIAL_ROOT_TOKEN`: If set, during the first system startup, a root user token with the value of this environment variable will be created.

### Command Line Parameters1. `--port <port_number>`: Specify the port number the server listens on, default is `3000`.
   + Example: `--port 3000`
2. `--log-dir <log_dir>`: Specify the log directory, if not set, logs will be saved to the `logs` folder in the working directory.
   + Example: `--log-dir ./logs`
3. `--version`: Print the system version number and exit.
4. `--help`: View command usage help and parameter explanation.

## Demo
### Online Demo
Please note, this demo site does not provide external services:
https://openai.justsong.cn

### Screenshots
![channel](https://user-images.githubusercontent.com/39998050/233837954-ae6683aa-5c4f-429f-a949-6645a83c9490.png)
![token](https://user-images.githubusercontent.com/39998050/233837971-dab488b7-6d96-43af-b640-a168e8d1c9bf.png)

## FAQs
1. What is quota? How is it calculated? Is there an issue with One API's quota calculation?
   + Quota = Group factor * Model factor * (Prompt token count + Completion token count * Completion factor)
   + The completion factor is fixed at 1.33 for GPT3.5 and 2 for GPT4, consistent with the official settings.
   + For non-streaming mode, the official API will return the total tokens consumed, but note that prompt and completion consume tokens at different rates.
   + Note that One API's default rate is the same as the official rate, as it has been adjusted accordingly.
2. Why does it show insufficient quota when my account quota is sufficient?
   + Check if your token quota is enough as this is separate from the account quota.
   + Token quota is for setting the maximum usage amount and can be freely set by users.
3. "No available channels" prompt?
   + Check your user groups and channel group settings.
   + Also, check the channel's model settings.
4. Channel test error: `invalid character '<' looking for beginning of value`
   + This occurs when the returned value is not valid JSON but an HTML page.
   + Most likely, your deployed site's IP or proxy node has been blocked by CloudFlare.
5. ChatGPT Next Web error: `Failed to fetch`
   + Do not set `BASE_URL` during deployment.
   + Double-check your interface address and API Key for accuracy.
   + Verify if HTTPS is enabled; browsers might block HTTP requests under HTTPS domains.
6. Error: "Current group load is saturated, please try again later"
   + The upstream channel has hit 429.
7. Will my data be lost after an upgrade?
   + If using MySQL, no data will be lost.
   + If using SQLite, you need to mount the volume for persistence of the one-api.db database file according to the deployment command I provided, or else data will be lost after container restart.
8. Do I need to make changes to the database before upgrading?
   + Generally, no changes are needed as the system will automatically adjust during initialization.
   + If changes are required, I will specify in the update log and provide scripts.
9. Error after manually modifying the database: "Database consistency has been compromised, please contact the administrator"?
   + This indicates there are channel IDs in the ability table that no longer exist, likely due to deleting records from the channel table without synchronizing to clean invalid channels in the ability table.
   
## Related Projects
* [FastGPT](https://github.com/labring/FastGPT): Knowledge base question answering system based on the LLM large language model
* [ChatGPT Next Web](https://github.com/Yidadaa/ChatGPT-Next-Web): Your own cross-platform ChatGPT application with a single click

## Note

This project is open-source under the MIT license. **On this basis**, attribution must be retained at the bottom of the page with a link to this project. If you wish to remove the attribution, prior authorization must be obtained.

The same applies to derivative projects based on this project.

Under the MIT license, users are responsible for the risks and liabilities associated with using this project; the developers of this open-source project are not liable.