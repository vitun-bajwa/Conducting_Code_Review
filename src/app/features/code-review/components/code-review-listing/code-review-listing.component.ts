import { Component } from '@angular/core';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
// import { Essentials } from '@ckeditor/ckeditor5-essentials';
// import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
// import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
// import { Image } from '@ckeditor/ckeditor5-image';
// import { List } from '@ckeditor/ckeditor5-list';
// import { Autoformat } from '@ckeditor/ckeditor5-autoformat';

// import { Comments } from '@ckeditor/ckeditor5-comments';

@Component({
  selector: 'app-code-review-listing',
  templateUrl: './code-review-listing.component.html',
  styleUrls: ['./code-review-listing.component.sass']
})
export class CodeReviewListingComponent        {
  public Editor = ClassicEditor;

  // public htmlData:any = "<p>Hello, world!</p>";
  // public Editor = ClassicEditor;
  // public config = {
  //   toolbar: [ 'heading', '|',
  //     'fontfamily','fontsize', '|',
  //     'Comments', '|',
  //     'alignment',
  //     'fontColor','fontBackgroundColor', '|',
  //     'bold', 'italic', 'custombutton', 'strikethrough','underline','subscript','superscript','|',
  //     'link','|',
  //     'outdent','indent','|',
  //     'bulletedList','numberedList','|',
  //     'code','codeBlock','|',
  //     'insertTable','|',
  //     'imageUpload','blockQuote','|',
  //     'undo','redo','|',
  //     'youtube',
  //     'mediaEmbed'
  //   ]
  // }

  ngOnInit() {
    // this.Editor.builtinPlugins = [ Essentials, Paragraph, Bold, Italic, Image, Comments, List ];

    // // The editor configuration.
    // this.Editor.defaultConfig = {
    //     language: 'en',
    //     // Provide the configuration for the comments feature.
    //     comments: {
    //         editorConfig: {
    //             // The list of plugins that will be included in the comments editors.
    //             extraPlugins: [ Bold, Italic, List, Autoformat ]
    //         }
    //   }
    // }
    
  }


}
