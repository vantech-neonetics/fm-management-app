# MAGIC Foundational Model and Prompt Management

Manage open-source and vendors FM 

[Deployment Tutorial](#deployment) · [Usage](#usage) · [Feedback](https://github.com/songquanpeng/one-api/issues) · [Screenshots](#screenshots) · [Live Demo](https://openai.justsong.cn/) · [FAQ](#faq) · [Related Projects](#related-projects) · [Donate](https://iamazing.cn/page/reward) 

## Features
1. Support for multiple foundational models for chatbot applications:
   + [x] OpenAI ChatGPT Series Models
   + [x] Anthropic Claude Series Models
   + [x] Google PaLM2 Gemini Series Models
   + [x] Thousands of HuggingFace models using TGI
2. Supports access to multiple channels through **load balancing**.
3. Supports **stream mode** that enables typewriter-like effect through stream transmission.
4. Supports **multi-machine deployment**. [See here](#multi-machine-deployment) for more details.
5. Supports **token management** that allows setting token expiration time and usage count.
6. Supports **voucher management** that enables batch generation and export of vouchers. Vouchers can be used for account balance replenishment.
7. Supports **channel management** that allows bulk creation of channels.
8. Supports **user grouping** and **channel grouping** for setting different rates for different groups.
9. Supports channel **model list configuration**.
10. Supports **quota details checking**.
11. Supports **user invite rewards**.
12. Allows display of balance in USD.
13. Supports announcement publishing, recharge link setting, and initial balance setting for new users.
14. Offers rich **customization** options:
    1. Supports customization of system name, logo, and footer.
    2. Supports customization of homepage and about page using HTML & Markdown code, or embedding a standalone webpage through iframe.
15. Supports management API access through system access tokens.
16. Supports Cloudflare Turnstile user verification.
17. Supports user management and multiple user login/registration methods:
    + Email login/registration and password reset via email.
18. Immediate support and encapsulation of other major model APIs as they become available.

## Deployment
### Docker Deployment
Deployment command: `docker run --name one-api -d --restart always -p 3000:3000 -e TZ=Asia/Shanghai -v /home/ubuntu/data/one-api:/data justsong/one-api-en`

Update command: `docker run --rm -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower -cR`

The first `3000` in `-p 3000:3000` is the port of the host, which can be modified as needed.

Data will be saved in the `/home/ubuntu/data/one-api` directory on the host. Ensure that the directory exists and has write permissions, or change it to a suitable directory.

Nginx reference configuration:
```
server{
   server_name openai.justsong.cn;  # Modify your domain name accordingly
   
   location / {
          client_max_body_size  64m;
          proxy_http_version 1.1;
          proxy_pass http://localhost:3000;  # Modify your port accordingly
          proxy_set_header Host $host;
          proxy_set_header X-Forwarded-For $remote_addr;
          proxy_cache_bypass $http_upgrade;
          proxy_set_header Accept-Encoding gzip;
   }
}
```

Next, configure HTTPS with Let's Encrypt certbot:
```bash
# Install certbot on Ubuntu:
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
# Generate certificates & modify Nginx configuration
sudo certbot --nginx
# Follow the prompts
# Restart Nginx".sudo service nginx restart

### Manual Deployment
1. Download the executable file from [GitHub Releases](https://github.com/songquanpeng/one-api/releases/latest) or compile from source:
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
   ```
2. Run:
   ```shell
   chmod u+x one-api
   ./one-api --port 3000 --log-dir ./logs
   ```
3. Access [http://localhost:3000/](http://localhost:3000/) and log in. The initial account username is `root` and password is `123456`.

For more detailed deployment tutorials, please refer to [this page](https://iamazing.cn/page/how-to-deploy-a-website).

### Multi-machine Deployment
1. Set the same `SESSION_SECRET` for all servers.
2. Set `SQL_DSN` and use MySQL instead of SQLite. All servers should connect to the same database.
3. Set the `NODE_TYPE` for all non-master nodes to `slave`.
4. Set `SYNC_FREQUENCY` for servers to periodically sync configurations from the database.
5. Non-master nodes can optionally set `FRONTEND_BASE_URL` to redirect page requests to the master server.
6. Install Redis separately on non-master nodes, and configure `REDIS_CONN_STRING` so that the database can be accessed with zero latency when the cache has not expired.
7. If the main server also has high latency accessing the database, Redis must be enabled and `SYNC_FREQUENCY` must be set to periodically sync configurations from the database.

Please refer to the [environment variables](#environment-variables) section for details on using environment variables.

## Usage
Add your API Key on the `Channels` page, and then add an access token on the `Tokens` page.

You can then use your access token to access One API. The usage is consistent with the [OpenAI API](https://platform.openai.com/docs/api-reference/introduction).

In places where the OpenAI API is used, remember to set the API Base to your One API deployment address, for example: `https://openai.justsong.cn`. The API Key should be the token generated in One API.

Note that the specific API Base format depends on the client you are using.

```mermaid
graph LR
    A(User)
    A --->|Request| B(MAGIC FM and Prompt Management)
    B -->|Relay Request| C(Third-party)
    B -->|Relay Request| D(HuggingFace)
    B -->|Relay Request| E(Other downstream channels)
```

To specify which channel to use for the current request, you can add the channel ID after the token, for example: `Authorization: Bearer ONE_API_KEY-CHANNEL_ID`.
Note that the token needs to be created by an administrator to specify the channel ID.

If the channel ID is not provided, load balancing will be used to distribute the requests to multiple channels.

### Environment Variables
1. `REDIS_CONN_STRING`: When set, Redis will be used as the storage for request rate limiting instead of memory.
    + Example: `REDIS_CONN_STRING=redis://default:redispw@localhost:49153`
2. `SESSION_SECRET`: When set, a fixed session key will be used to ensure that cookies of logged-in users are still valid after the system restarts.
    + Example: `SESSION_SECRET=random_string`
3. `SQL_DSN`: When set, the specified database will be used instead of SQLite. Please use MySQL version 8.0.
    + Example: `SQL_DSN=root:123456@tcp(localhost:3306)/oneapi`".## Configuration Options

4. `LOG_SQL_DSN`: When set, a separate database will be used for the `logs` table; please use MySQL or PostgreSQL.
    + Example: `LOG_SQL_DSN=root:123456@tcp(localhost:3306)/oneapi-logs`
5. `FRONTEND_BASE_URL`: When set, the specified frontend address will be used instead of the backend address.
    + Example: `FRONTEND_BASE_URL=https://openai.justsong.cn`
6. `SYNC_FREQUENCY`: When set, the system will periodically sync configurations from the database, with the unit in seconds. If not set, no sync will happen.
    + Example: `SYNC_FREQUENCY=60`
7. `NODE_TYPE`: When set, specifies the node type. Valid values are `master` and `slave`. If not set, it defaults to `master`.
    + Example: `NODE_TYPE=slave`
8. `CHANNEL_UPDATE_FREQUENCY`: When set, it periodically updates the channel balances, with the unit in minutes. If not set, no update will happen.
    + Example: `CHANNEL_UPDATE_FREQUENCY=1440`
9. `CHANNEL_TEST_FREQUENCY`: When set, it periodically tests the channels, with the unit in minutes. If not set, no test will happen.
    + Example: `CHANNEL_TEST_FREQUENCY=1440`
10. `POLLING_INTERVAL`: The time interval (in seconds) between requests when updating channel balances and testing channel availability. Default is no interval.
    + Example: `POLLING_INTERVAL=5`

### Command Line Parameters

1. `--port <port_number>`: Specifies the port number on which the server listens. Defaults to `3000`.
    + Example: `--port 3000`
2. `--log-dir <log_dir>`: Specifies the log directory. If not set, the logs will not be saved.
    + Example: `--log-dir ./logs`
3. `--version`: Prints the system version number and exits.
4. `--help`: Displays the command usage help and parameter descriptions.

## FAQ

1. What is quota? How is it calculated? Does One API have quota calculation issues?+ Quota = Group multiplier * Model multiplier * (number of prompt tokens + number of completion tokens * completion multiplier)
    + The completion multiplier is fixed at 1.33 for GPT3.5 and 2 for GPT4, consistent with the official definition.
    + If it is not a stream mode, the official API will return the total number of tokens consumed. However, please note that the consumption multipliers for prompts and completions are different.
2. Why does it prompt "insufficient quota" even though my account balance is sufficient?
    + Please check if your token quota is sufficient. It is separate from the account balance.
    + The token quota is used to set the maximum usage and can be freely set by the user.
3. It says "No available channels" when trying to use a channel. What should I do?
    + Please check the user and channel group settings.
    + Also check the channel model settings.
4. Channel testing reports an error: "invalid character '<' looking for beginning of value"
    + This error occurs when the returned value is not valid JSON but an HTML page.
    + Most likely, the IP of your deployment site or the node of the proxy has been blocked by CloudFlare.
5. ChatGPT Next Web reports an error: "Failed to fetch"
    + Do not set `BASE_URL` during deployment.
    + Double-check that your interface address and API Key are correct.

## Related Projects
[FastGPT](https://github.com/labring/FastGPT): Knowledge question answering system based on the LLM

## Note
This project is an open-source project. Please use it in compliance with OpenAI's [Terms of Use](https://openai.com/policies/terms-of-use) and **applicable laws and regulations**. It must not be used for illegal purposes.

If you do not wish to include attribution, prior authorization must be obtained. According to the MIT license, users should bear the risk and responsibility of using this project, and the developer of this open-source project is not responsible for this.
