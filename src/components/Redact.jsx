import React from 'react';
import { Editor } from '@tinymce/tinymce-react'; 
class Redact extends React.Component {
  handleEditorChange = (e) => {
    console.log(
      'Content was updated:',
      e.target.getContent()
    );
  }

  render() {
    return (
      <Editor
        apiKey= ""
        initialValue="<p>Initial content</p>"
        init={{
          selector: "textarea",
          height: 500,
          menubar: "insert",
          plugins: [
            'advlist autolink lists link image', 
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help | image',
          image_description: true,
          image_title: true,
          image_caption: true,
        }}
        onChange={this.handleEditorChange}
      />
    );
  }
}

export default Redact;

