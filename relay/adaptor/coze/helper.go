package coze

import "github.com/vantech-neonetics/fm-management-app/relay/adaptor/coze/constant/event"

func event2StopReason(e *string) string {
	if e == nil || *e == event.Message {
		return ""
	}
	return "stop"
}
