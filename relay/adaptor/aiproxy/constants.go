package aiproxy

import "github.com/vantech-neonetics/fm-management-app/relay/adaptor/openai"

var ModelList = []string{""}

func init() {
	ModelList = openai.ModelList
}
