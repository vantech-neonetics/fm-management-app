const defaultConfig = {
  input: {
    name: "",
    type: 1,
    key: "",
    base_url: "",
    other: "",
    model_mapping: "",
    models: [],
    groups: ["default"],
  },
  inputLabel: {
    name: "Channel Name",
    type: "Channel Type",
    base_url: "Channel API URL",
    key: "Key",
    other: "Other Parameters",
    models: "Models",
    model_mapping: "Model Mapping",
    groups: "User Groups",
  },
  prompt: {
    type: "Please select Channel Type",
    name: "Please name the channel",
    base_url: "Optional, please enter the intermediary API address, for example, through cloudflare",
    key: "Please enter the authentication key for the channel",
    other: "",
    models: "Please select the models supported by this channel",
    model_mapping:
      'Please enter the modified model mapping relationship in the format: API request model ID: model ID actually forwarded to the channel, using a JSON array representation, for example: {"gpt-3.5": "gpt-35"}',
    groups: "Please select the user groups supported by this channel",
  },
  modelGroup: "openai",
};

const typeConfig = {
  3: {
    inputLabel: {
      base_url: "AZURE_OPENAI_ENDPOINT",
      other: "Default API Version",
    },
    prompt: {
      base_url: "Please fill in AZURE_OPENAI_ENDPOINT",
      other: "Please enter the default API version, for example: 2024-03-01-preview",
    },
  },
  11: {
    input: {
      models: ["PaLM-2"],
    },
    modelGroup: "google palm",
  },
  14: {
    input: {
      models: ["claude-instant-1", "claude-2", "claude-2.0", "claude-2.1"],
    },
    modelGroup: "anthropic",
  },
  15: {
    input: {
      models: ["ERNIE-Bot", "ERNIE-Bot-turbo", "ERNIE-Bot-4", "Embedding-V1"],
    },
    prompt: {
      key: "Enter in the following format: APIKey | SecretKey",
    },
    modelGroup: "baidu",
  },
  16: {
    input: {
      models: ["glm-4", "glm-4v", "glm-3-turbo", "chatglm_turbo", "chatglm_pro", "chatglm_std", "chatglm_lite"],
    },
    modelGroup: "zhipu",
  },
  17: {
    inputLabel: {
      other: "Plugin Parameters",
    },
    input: {
      models: [
        "qwen-turbo",
        "qwen-plus",
        "qwen-max",
        "qwen-max-longcontext",
        "text-embedding-v1",
      ],
    },
    prompt: {
      other: "Please enter plugin parameters, the value of the X-DashScope-Plugin request header",
    },
    modelGroup: "ali",
  },
  18: {
    inputLabel: {
      other: "Version Number",
    },
    input: {
      models: [
          "SparkDesk",
        'SparkDesk-v1.1',
        'SparkDesk-v2.1',
        'SparkDesk-v3.1',
      ],
    },
  },
};```javascript
"'SparkDesk-v3.5'
      ],
    },
    prompt: {
      key: "Enter in the following format: APPID|APISecret|APIKey",
      other: "Please enter the version number, for example: v3.1",
    },
    modelGroup: "xunfei",
  },
  19: {
    input: {
      models: [
        "360GPT_S2_V9",
        "embedding-bert-512-v1",
        "embedding_s1_v1",
        "semantic_similarity_s1_v1",
      ],
    },
    modelGroup: "360",
  },
  22: {
    prompt: {
      key: "Enter in the following format: APIKey-AppId, for example: fastgpt-0sp2gtvfdgyi4k30jwlgwf1i-64f335d84283f05518e9e041",
    },
  },
  23: {
    input: {
      models: ["hunyuan"],
    },
    prompt: {
      key: "Enter in the following format: AppId|SecretId|SecretKey",
    },
    modelGroup: "tencent",
  },
  24: {
    inputLabel: {
      other: "Version number",
    },
    input: {
      models: ["gemini-pro"],
    },
    prompt: {
      other: "Please enter the version number, for example: v1",
    },
    modelGroup: "google gemini",
  },
  25: {
    input: {
      models: ['moonshot-v1-8k', 'moonshot-v1-32k', 'moonshot-v1-128k'],
    },
    modelGroup: "moonshot",
  },
  26: {
    input: {
      models: ['Baichuan2-Turbo', 'Baichuan2-Turbo-192k', 'Baichuan-Text-Embedding'],
    },
    modelGroup: "baichuan",
  },
  27: {
    input: {
      models: ['abab5.5s-chat', 'abab5.5-chat', 'abab6-chat'],
    },
    modelGroup: "minimax",
  },
  29: {
    modelGroup: "groq",
  },
  30: {
    modelGroup: "ollama",
  },
  31: {
    modelGroup: "lingyiwanwu",
  },
};

export { defaultConfig, typeConfig };"
```