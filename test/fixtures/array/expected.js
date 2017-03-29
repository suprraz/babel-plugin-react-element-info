React.createClass({
  render: function () {
    return <MyJSXElementContainer data-someweirdPrefix-node="MyJSXElementContainer" data-someweirdPrefix-file="actual">
        Element contents
      </MyJSXElementContainer>;
  }
});
