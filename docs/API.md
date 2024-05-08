# Using API to Control & Extend One API
> Welcome to submit PR to put your extension project here.

For example, although One API itself does not directly support payments, you can implement payment functionality through the extended API of the system.

Or if you want to customize channel management strategies, you can also enable or disable channels through the API.

## Authorization
One API supports two types of authorization methods: Cookie and Token. For Token, refer to the following figure to obtain:

![image](https://github.com/songquanpeng/songquanpeng.github.io/assets/39998050/c15281a7-83ed-47cb-a1f6-913cb6bf4a7c)

Then, use the obtained Token as the value of the Authorization field in the request header. For example, using Token to call the API of a test channel:
![image](https://github.com/songquanpeng/songquanpeng.github.io/assets/39998050/1273b7ae-cb60-4c0d-93a6-b1cbc039c4f8)

## Request Format and Response Format
One API uses JSON format for requests and responses.

For the response body, the general format is as follows:
```json
{
  "message": "Request Information",
  "success": true,
  "data": {}
}
```

## API List
> The current API list is not comprehensive. Please crawl the frontend requests by yourself.

If the existing APIs cannot meet your needs, feel free to submit an issue for discussion.

### Get Information of the Currently Logged-in User
**GET** `/api/user/self`

### Top Up Quota for a Given User
**POST** `/api/topup`
```json
{
  "user_id": 1,
  "quota": 100000,
  "remark": "Top up quota by 100000"
}
```

## Others
### Additional Parameters on Top-up Links
When a user clicks the top-up button, One API will attach the user's information and top-up information to the link, for example:
`https://example.com?username=root&user_id=1&transaction_id=4b3eed80-55d5-443f-bd44-fb18c648c837`

You can parse the parameters on the link to obtain user information and top-up details, and then call the API to top up for the user.

Note that not all themes support this feature, welcome PR to complete it.