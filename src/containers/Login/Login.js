import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from '../../redux/modules/auth';
import styles from './Login.scss';
import { LoadingSpinner } from '../../components';

@connect(
  state => ({
    user: state.auth.user,
    loggingIn: state.auth.loggingIn,
    loginError: state.auth.loginError
  }),
  authActions)
export default class Login extends Component {
  static propTypes = {
    login: PropTypes.func,
    loggingIn: PropTypes.bool,
    loginError: PropTypes.object
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    this.props.login(username, password);
  };

  render() {
    const { loggingIn, loginError } = this.props;
    const usernameError = loginError && (loginError.errorField === 'username');
    const passwordError = loginError && (loginError.errorField === 'password');
    const errorMessage = (usernameError || passwordError) ? loginError.errorReason : '.';
    return (
      <main className={styles.loginPage}>
        <Helmet title="Login"/>
        <section className={loggingIn ? styles.hiddenAbove : ''}>
          <form onSubmit={this.handleSubmit}>
            <h1>Sign in</h1>
            <input type="text" ref="username" placeholder="Username" className={usernameError ? styles.inputError : ''}/>
            <p className={(usernameError || passwordError) ? styles.showError : ''}>{errorMessage}</p>
            <input type="password" ref="password" placeholder="Password" className={passwordError ? styles.inputError : ''}/>
            <input type="checkbox" ref="rememberme" id="rememberme"/>
            <label htmlFor="rememberme">Remember me</label>
            <button onClick={this.handleSubmit}>Submit</button>
          </form>
        </section>
        <section className={loggingIn ? styles.hiddenBellow : ''}>
          <div>
            <LoadingSpinner />
            <span>Signing in</span>
          </div>
        </section>
      </main>
    );
  }
}
