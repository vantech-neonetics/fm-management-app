export const CHANNEL_OPTIONS = [
  { key: 1, text: 'OpenAI', value: 1, color: 'green' },
  { key: 14, text: 'Anthropic Claude', value: 14, color: 'black' },
  { key: 3, text: 'Azure OpenAI', value: 3, color: 'olive' },
  { key: 11, text: 'Google PaLM2', value: 11, color: 'orange' },
  { key: 24, text: 'Google Gemini', value: 24, color: 'orange' },
  { key: 28, text: 'Mistral AI', value: 28, color: 'orange' },
  { key: 15, text: 'Baidu Wenzin Qianfan', value: 15, color: 'blue' },
  { key: 17, text: 'Ali Tongyi Qianwen', value: 17, color: 'orange' },
  { key: 18, text: 'Xunfei Xinghuo Renci', value: 18, color: 'blue' },
  { key: 16, text: 'Zhipu ChatGLM', value: 16, color: 'violet' },
  { key: 19, text: '360 ZhiNao', value: 19, color: 'blue' },
  { key: 25, text: 'Moonshot AI', value: 25, color: 'black' },
  { key: 23, text: 'Tencent Hunyuan', value: 23, color: 'teal' },
  { key: 26, text: 'Baichuan DaModel', value: 26, color: 'orange' },
  { key: 27, text: 'MiniMax', value: 27, color: 'red' },
  { key: 29, text: 'Groq', value: 29, color: 'orange' },
  { key: 30, text: 'Ollama', value: 30, color: 'black' },
  { key: 31, text: 'Zero One Everything', value: 31, color: 'green' },
  { key: 8, text: 'Custom Channel', value: 8, color: 'pink' },
  { key: 22, text: 'Knowledge Base: FastGPT', value: 22, color: 'blue' },
  { key: 21, text: 'Knowledge Base: AI Proxy', value: 21, color: 'purple' },
  { key: 20, text: 'Proxy: OpenRouter', value: 20, color: 'black' },
  { key: 2, text: 'Proxy: API2D', value: 2, color: 'blue' },
  { key: 5, text: 'Proxy: OpenAI-SB', value: 5, color: 'brown' },
  { key: 7, text: 'Proxy: OhMyGPT', value: 7, color: 'purple' },
  { key: 10, text: 'Proxy: AI Proxy', value: 10, color: 'purple' },
  { key: 4, text: 'Proxy: CloseAI', value: 4, color: 'teal' },
  { key: 6, text: 'Proxy: OpenAI Max', value: 6, color: 'violet' },
  { key: 9, text: 'Proxy: AI.LS', value: 9, color: 'yellow' },
  { key: 12, text: 'Proxy: API2GPT', value: 12, color: 'blue' },
  { key: 13, text: 'Proxy: AIGC2D', value: 13, color: 'purple' }
];

for (let i = 0; i < CHANNEL_OPTIONS.length; i++) {
  CHANNEL_OPTIONS[i].label = CHANNEL_OPTIONS[i].text;
}