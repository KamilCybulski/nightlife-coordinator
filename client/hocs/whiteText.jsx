import React from 'react';

const style = {
  color: '#fff',
};

/**
 * whiteText
 * @param {Component} WrappedComponent React Component to be enhanced
 * Renders a WrappedComponent with a white text
 * @returns {Component} Enhanced React Component
 */
export default function whiteText(WrappedComponent) {
  /**
   * @WhiteText
   * @param {object} props Props to pass to WrappedComponent
   * @returns {Component} React Component
   */
  function WhiteText(props) {
    return <WrappedComponent {...props} style={style} />;
  }

  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  WhiteText.displayName = `whiteText(${wrappedComponentName})`;
  return WhiteText;
}
