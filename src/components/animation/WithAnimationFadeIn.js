import React from "react";
import ScrollAnimation from 'react-animate-on-scroll';

function WithAnimationFadeIn(WrappedComponent) {

    class HOC extends React.Component {
        render() {
            return <ScrollAnimation duration={2} animateIn="fadeIn">
                <WrappedComponent {...this.props} />
            </ScrollAnimation>
        }
    }

    return HOC;
}

export default WithAnimationFadeIn;