import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  KeyboardAvoidingView,
} from 'react-native';

import CNRichTextEditor, {
  CNToolbar,
  getInitialObject,
  getDefaultStyles,
} from 'react-native-cn-richtext-editor';

const defaultStyles = getDefaultStyles();

export default class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTag: "body",
      selectedStyles: [],
      value: [getInitialObject()],
    };

    this.editor = null;
  }

  onStyleKeyPress = toolType => {
    this.editor.applyToolbar(toolType);
  };

  onSelectedTagChanged = tag => {
    this.setState({
      selectedTag: tag,
    });
  };

  onSelectedStyleChanged = styles => {
    this.setState({
      selectedStyles: styles
    });
  };

  onValueChanged = value => {
    this.setState({
      value: value,
    });
  };
  render() {
    return (
      <View>
        <View>
          <CNToolbar
            size={28}
            bold={
              <Text style={[styles.toolbarButton, styles.boldButton]}>B</Text>
            }
            italic={
              <Text style={[styles.toolbarButton, styles.italicButton]}>I</Text>
            }
            underline={
              <Text style={[styles.toolbarButton, styles.underlineButton]}>
                U
              </Text>
            }
            lineThrough={
              <Text style={[styles.toolbarButton, styles.lineThroughButton]}>
                {' '}
                S{' '}
              </Text>
            }
            body={<Text style={styles.toolbarButton}>T</Text>}
            title={<Text style={styles.toolbarButton}>h1</Text>}
            heading={<Text style={styles.toolbarButton}>h3</Text>}
            ul={<Text style={styles.toolbarButton}>ul</Text>}
            ol={<Text style={styles.toolbarButton}>ol</Text>}
            selectedTag={this.state.selectedTag}
            selectedStyles={this.state.selectedStyles}
            onStyleKeyPress={this.onStyleKeyPress}
          />
        </View>

        <View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <CNRichTextEditor
              ref={input => (this.editor = input)}
              onSelectedTagChanged={this.onSelectedTagChanged}
              onSelectedStyleChanged={this.onSelectedStyleChanged}
              value={this.state.value}
              style={styles.editor}
              styleList={this.customStyles}
              foreColor="dimgray" // optional (will override default fore-color)
              onValueChanged={this.onValueChanged}
              onRemoveImage={this.onRemoveImage}
            />
          </TouchableWithoutFeedback>
        </View>

      </View>
    ); //End of Return method
  } // End of Render Method
} // End of React Component Class

var styles = StyleSheet.create({
  main: {
    flex: 1,
    // marginTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 1,
    // alignItems: 'stretch',
    backgroundColor: "black"
  },
  toolbarButton: {
    fontSize: 20,
    width: 28,
    height: 28,
    textAlign: "center",
  },
  italicButton: {
    fontStyle: "italic",
  },
  boldButton: {
    fontWeight: "bold",
  },
  underlineButton: {
    textDecorationLine: "underline",
  },
  lineThroughButton: {
    textDecorationLine: "line-through",
  }
});
