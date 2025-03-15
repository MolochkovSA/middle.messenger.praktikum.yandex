import { connect } from '../connect'

export const withAuthState = connect((state) => state.auth)
