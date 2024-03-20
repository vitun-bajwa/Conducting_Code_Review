import { Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Adapter } from './ckEditorAdapter'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass']
})
export class EditorComponent {
  @Input() config: any;
  @ViewChild('myCkeditor') myCkeditor: any
  group!: FormGroup;
  test: any
  public Editor = ClassicEditor;
  ckconfig: any;
  retrieveddata!: string;

  ngOnInit(){}

  onReady(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return new Adapter(loader, editor.config);
    };
  }

  ngAfterViewInit() {
    if(this.config.disabled) this.group.controls[this.config.name].disable();
  }


}
