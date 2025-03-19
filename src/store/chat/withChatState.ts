import { connect } from '../connect'

export const withChatState = connect((state) => state.chat)
