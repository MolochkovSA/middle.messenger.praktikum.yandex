import { connect } from '../connect'

export const withIsLoading = connect((state) => ({
  isLoading: state.user.isLoading,
}))
