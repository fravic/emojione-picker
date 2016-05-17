var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react");
var emojione = require("emojione");

function replaceEmojiUrls(messageHTML) {
  // Chrome packaged app CSP directive img-src disables external image loading
  // Load emoji locally instead
  return messageHTML.replace('//cdn.jsdelivr.net/emojione/assets/png/', '/img/emoji/');
}

var Emoji = React.createClass({
  displayName: "Emoji",

  propTypes: {
    onClick: React.PropTypes.func
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    // avoid rerendering the Emoji component if the shortname hasnt changed
    return nextProps.shortname != this.props.shortname;
  },

  createMarkup: function () {
    let imageHTML = replaceEmojiUrls(emojione.shortnameToImage(this.props.shortname));
    return { __html: imageHTML };
  },

  render: function () {
    return React.createElement("div", _extends({}, this.props, { onClick: this.props.onClick, tabIndex: "0", className: "emoji",
      title: this.props.name,
      dangerouslySetInnerHTML: this.createMarkup() }));
  }
});

module.exports = Emoji;