package relay

import (
	"github.com/vantech-neonetics/fm-management-app/relay/adaptor"
	"github.com/vantech-neonetics/fm-management-app/relay/adaptor/aiproxy"
	"github.com/vantech-neonetics/fm-management-app/relay/adaptor/ali"
	"github.com/vantech-neonetics/fm-management-app/relay/adaptor/anthropic"
	"github.com/vantech-neonetics/fm-management-app/relay/adaptor/aws"
	"github.com/vantech-neonetics/fm-management-app/relay/adaptor/baidu"
	"github.com/vantech-neonetics/fm-management-app/relay/adaptor/cloudflare"
	"github.com/vantech-neonetics/fm-management-app/relay/adaptor/cohere"
	"github.com/vantech-neonetics/fm-management-app/relay/adaptor/coze"
	"github.com/vantech-neonetics/fm-management-app/relay/adaptor/deepl"
	"github.com/vantech-neonetics/fm-management-app/relay/adaptor/gemini"
	"github.com/vantech-neonetics/fm-management-app/relay/adaptor/ollama"
	"github.com/vantech-neonetics/fm-management-app/relay/adaptor/openai"
	"github.com/vantech-neonetics/fm-management-app/relay/adaptor/palm"
	"github.com/vantech-neonetics/fm-management-app/relay/adaptor/tencent"
	"github.com/vantech-neonetics/fm-management-app/relay/adaptor/xunfei"
	"github.com/vantech-neonetics/fm-management-app/relay/adaptor/zhipu"
	"github.com/vantech-neonetics/fm-management-app/relay/apitype"
)

func GetAdaptor(apiType int) adaptor.Adaptor {
	switch apiType {
	case apitype.AIProxyLibrary:
		return &aiproxy.Adaptor{}
	case apitype.Anthropic:
		return &anthropic.Adaptor{}
	case apitype.AwsClaude:
		return &aws.Adaptor{}
	case apitype.Gemini:
		return &gemini.Adaptor{}
	case apitype.OpenAI:
		return &openai.Adaptor{}
	case apitype.PaLM:
		return &palm.Adaptor{}
	case apitype.Tencent:
		return &tencent.Adaptor{}
	case apitype.Ollama:
		return &ollama.Adaptor{}
	case apitype.Cohere:
		return &cohere.Adaptor{}
	case apitype.Cloudflare:
		return &cloudflare.Adaptor{}
	case apitype.DeepL:
		return &deepl.Adaptor{}
	}
	return nil
}
