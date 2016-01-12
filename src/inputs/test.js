import React from 'react';

export default React.createClass({
    getValue() {
        return this.refs.child.getValue();
    },
    render() {
        const { children, ...props } = this.props;
        console.log(children);


        return <div>
            {React.cloneElement(
                React.Children.only(children),
                { ref: 'child', ...props }
            )}
        </div>;
    }
});
