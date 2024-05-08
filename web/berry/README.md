# One API Frontend Interface

This project is the frontend interface of One API, developed based on [Berry Free React Admin Template](https://github.com/codedthemes/berry-free-react-admin-template).

## Open Source Projects Used

The following open source projects are used as part of our project:

- [Berry Free React Admin Template](https://github.com/codedthemes/berry-free-react-admin-template)
- [minimal-ui-kit](minimal-ui-kit)

## Development Instructions

When adding a new channel, you need to make modifications in the following places:

1. `web/berry/src/constants/ChannelConstants.js`

Add a new channel in the `CHANNEL_OPTIONS` in this file

```js
export const CHANNEL_OPTIONS = {
  //key is the channel ID
  1: {
    key: 1, // Channel ID
    text: "OpenAI", // Channel name
    value: 1, // Channel ID
    color: "primary", // Color displayed for the channel in the list
  },
};
```

2. `web/berry/src/views/Channel/type/Config.js`

Add new channel configurations in `typeConfig` in this file. If no configuration is needed, you can omit it

```js
const typeConfig = {
  // key is the channel ID
  3: {
    inputLabel: {
      // Input field names configuration
      // Corresponding field name
      base_url: "AZURE_OPENAI_ENDPOINT",
      other: "Default API Version",
    },
    prompt: {
      // Input field prompts configuration
      // Corresponding field name
      base_url: "Please fill in AZURE_OPENAI_ENDPOINT",

      // Note: the presence of a value for `other` determines whether the `other` input field needs to be displayed. By default, it is empty
      other: "Please enter the default API version, for example: 2024-03-01-preview",
    },
    modelGroup: "openai", // Model group name, this value is used for the "Fill in the supported models by the channel" button. The button will retrieve the model group based on this value, default is openai if not specified
  },
};
```

## License

The code used in this project follows the MIT License.