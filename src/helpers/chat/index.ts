import Handlebars from 'handlebars'

import { MessageType } from '@/pages/chat/types'

Handlebars.registerHelper('isOutgoingMessage', function (value) {
  return value === MessageType.Outgoing
})
