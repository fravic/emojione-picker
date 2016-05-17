var React = require("react");
var emojione = require("emojione");

function replaceEmojiUrls(messageHTML) {
  // Chrome packaged app CSP directive img-src disables external image loading
  // Load emoji locally instead
  return messageHTML.replace(
    '//cdn.jsdelivr.net/emojione/assets/png/',
    '/img/emoji/'
  )
}

var Emoji = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    // avoid rerendering the Emoji component if the shortname hasnt changed
    return nextProps.shortname != this.props.shortname;
  },

  createMarkup: function() {
    let imageHTML = replaceEmojiUrls(emojione.shortnameToImage(this.props.shortname))
    return {__html: imageHTML};
  },

  render: function() {
    return <div {...this.props} onClick={this.props.onClick} tabIndex="0" className="emoji"
                title={this.props.name}
                dangerouslySetInnerHTML={this.createMarkup()}>
    </div>
  }
});

module.exports = Emoji;
