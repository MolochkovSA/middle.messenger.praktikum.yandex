import { connect } from '../connect'

export const withUserState = connect((state) => state.user)
