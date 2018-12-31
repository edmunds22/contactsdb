import React from 'react';

export const LocaleContext = React.createContext();

class LocaleProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locale: 'en',
      changeLocale: this.changeLocale,
      authenticated: (this.props.authed ? this.props.authed : false)
    };

  }

  componentWillReceiveProps(nextProps) {

    this.setState(state => {
      const authenticated = nextProps.authed;
      return {
        authenticated: authenticated
      };
    });

  }

  render() {
    return (
      <LocaleContext.Provider value={this.state}>
        {this.props.children}
      </LocaleContext.Provider>
    );
  }
}

export default LocaleProvider;