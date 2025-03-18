import { connect } from '../connect'

export const withUserAvatarState = connect((state) => ({ avatar: state.user.user?.avatar }))
