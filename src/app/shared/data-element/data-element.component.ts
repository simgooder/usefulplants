import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data-element.component.html',
  styleUrls: ['./data-element.component.scss']
})
export class DataElementComponent implements OnInit {

    @Input() public meta;
    @Input() public label;
    @Input() public title;
    @Input() public content;
    @Input() public images;
    @Input() public truncate;

    public hasImages = false;

    public isContentArray = false;
    public contentArray = [];

    constructor() { }

    ngOnInit() {

        if (this.content !== undefined && typeof(this.content) === "object") {
            this.isContentArray = true;
            this.contentArray = this.content;
        }

        if (this.images !== undefined && this.images.length > 0) {
            this.hasImages = true;
        }

    }

}
