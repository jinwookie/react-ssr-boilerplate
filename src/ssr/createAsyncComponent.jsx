const Loader = () => <div className="loader" />;

const createAsyncComponent = ({ loader, Placeholder }) => {
  let Component;

  return class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        Component,
      };

      this.updateState = this.updateState.bind(this);

      if (!Component) {
        AsyncComponent.load().then(this.updateState);
      }
    }

    static defaultProps = {
      Placeholder: Loader
    }

    static load() {
      return loader().then(ResolvedComponent => {
        Component = ResolvedComponent.default || ResolvedComponent;
        return Component;
      });
    }

    updateState = () => {
      const { Component: ComponentFromState } = this.state;

      if (ComponentFromState !== Component) {
        this.setState({
          Component,
        });
      }
    }

    render() {
      const { Component: ComponentFromState } = this.state;
      if (ComponentFromState) {
        return <ComponentFromState {...this.props} />;
      }
      if (Placeholder) {
        return <Placeholder {...this.props} />;
      }
      return null;
    }
  }
};

export default createAsyncComponent;
